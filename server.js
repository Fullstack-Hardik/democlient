const express = require('express');
const http = require('http');
const https = require('https');
const { Server } = require('socket.io');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const useProxy = require('puppeteer-page-proxy');
const randomUseragent = require('random-useragent');
const path = require('path');

puppeteer.use(StealthPlugin());

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ignore favicon requests to prevent 404 errors in browser console
app.get('/favicon.ico', (req, res) => res.status(204).end());

// State
let isRunning = false;
let targetUrl = '';
let speedRpm = 60; // Requests per minute
let proxiesList = []; 
let globalBrowser = null;

let metrics = {
    requestsSent: 0,
    successfulViews: 0,
    errors: 0,
    activeBrowsers: 0
};

// Broadcast metrics every second
setInterval(() => {
    io.emit('metrics', metrics);
}, 1000);

async function initBrowser() {
    if (!globalBrowser) {
        globalBrowser = await puppeteer.launch({ 
            headless: 'new',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--single-process'
            ]
        });
    }
}

async function scrapeProxies() {
    return new Promise((resolve) => {
        https.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const proxies = data.split('\n').map(p => p.trim()).filter(p => p);
                console.log(`Scraped ${proxies.length} free proxies!`);
                
                // Format for puppeteer-page-proxy
                resolve(proxies.map(p => p.includes('http') ? p : `http://${p}`));
            });
        }).on('error', (err) => {
            console.error("Proxy scrape failed", err);
            resolve([]);
        });
    });
}

async function checkWebsiteStatus(url, proxy) {
    let context = null;
    let page = null;
    try {
        metrics.requestsSent++;
        metrics.activeBrowsers++;
        
        await initBrowser();
        
        // Create an incognito context for a clean session per request
        context = await globalBrowser.createBrowserContext();
        page = await context.newPage();
        
        // --- RANDOMIZE FINGERPRINT ---
        const userAgent = randomUseragent.getRandom(ua => ['Chrome', 'Firefox', 'Safari'].includes(ua.browserName)) || 
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        await page.setUserAgent(userAgent);
        
        const width = Math.floor(Math.random() * (1920 - 375 + 1)) + 375;
        const height = Math.floor(Math.random() * (1080 - 667 + 1)) + 667;
        await page.setViewport({ width, height });

        const langs = ['en-US', 'en-GB', 'fr-FR', 'es-ES', 'de-DE', 'it-IT', 'ja-JP'];
        const randomLang = langs[Math.floor(Math.random() * langs.length)];
        await page.setExtraHTTPHeaders({
            'Accept-Language': `${randomLang},en;q=0.9`
        });
        // ------------------------------
        
        // Block heavy resources to drastically reduce memory/bandwidth and apply proxy
        await page.setRequestInterception(true);
        page.on('request', async (req) => {
            if(['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                if (proxy) {
                    try {
                        await useProxy(req, proxy);
                    } catch (e) {
                        req.abort(); // if proxy fails
                    }
                } else {
                    req.continue();
                }
            }
        });

        // Fast timeout because free proxies can be extremely slow
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const status = response ? response.status() : 'Unknown';
        
        if (status === 200 || status === 304 || status === 201) {
            metrics.successfulViews++;
        } else {
            metrics.errors++;
        }
        
        // Short wait to simulate real user engagement
        await new Promise(resolve => setTimeout(resolve, 2000));
        
    } catch (e) {
        // Suppress massive error spam from dead free proxies
        metrics.errors++;
    } finally {
        if (page) await page.close().catch(() => {});
        if (context) await context.close().catch(() => {});
        metrics.activeBrowsers--;
    }
}

async function trafficLoop() {
    if (!isRunning) return;
    
    const delayBetweenRequests = (60000 / speedRpm) || 1000;
    
    let proxyToUse = null;
    if (proxiesList.length > 0) {
        proxyToUse = proxiesList[Math.floor(Math.random() * proxiesList.length)];
    }
    
    // Do not await, fire and forget to maintain RPM
    checkWebsiteStatus(targetUrl, proxyToUse);
    
    setTimeout(trafficLoop, delayBetweenRequests);
}

async function startTraffic() {
    if (isRunning) return;
    isRunning = true;
    metrics = { requestsSent: 0, successfulViews: 0, errors: 0, activeBrowsers: 0 };
    
    const intervalMs = (60000 / speedRpm) || 1000;
    console.log(`Starting traffic to ${targetUrl} at ${speedRpm} RPM (~${intervalMs}ms interval)`);
    
    if (proxiesList.length === 0) {
        console.log("No proxies provided, auto-scraping free global proxies...");
        proxiesList = await scrapeProxies();
    }
    
    await initBrowser();
    trafficLoop();
}

function stopTraffic() {
    if (!isRunning) return;
    isRunning = false;
    console.log(`Stopped traffic.`);
    if (globalBrowser) {
        globalBrowser.close().then(() => {
            globalBrowser = null;
        }).catch(() => {});
    }
}

app.post('/api/start', async (req, res) => {
    const { url, rps, proxies } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });
    
    targetUrl = url;
    speedRpm = rps * 60; 
    if (speedRpm <= 0) speedRpm = 60;
    
    if (proxies && typeof proxies === 'string') {
        proxiesList = proxies.split('\n').map(p => p.trim()).filter(p => p);
    } else {
        proxiesList = []; // Will trigger auto-scrape in startTraffic
    }

    // Call async startTraffic without blocking UI
    startTraffic();
    res.json({ success: true, message: 'Traffic started' });
});

app.post('/api/stop', (req, res) => {
    stopTraffic();
    res.json({ success: true, message: 'Traffic stopped' });
});

app.get('/api/status', (req, res) => {
    res.json({ isRunning, targetUrl, speedRpm, proxyCount: proxiesList.length });
});

io.on('connection', (socket) => {
    socket.emit('metrics', metrics);
});

server.listen(PORT, () => {
    console.log(`Web UI Server is running on http://localhost:${PORT}`);
});