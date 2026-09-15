const express = require('express');
const http = require('http');
const https = require('https');
const { Server } = require('socket.io');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const randomUseragent = require('random-useragent');
const path = require('path');

puppeteer.use(StealthPlugin());

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204).end());

let isRunning = false;
let targetUrl = '';
let speedRpm = 60;
let proxiesList = []; 

let metrics = {
    requestsSent: 0,
    successfulViews: 0,
    errors: 0,
    activeBrowsers: 0
};

setInterval(() => {
    io.emit('metrics', metrics);
}, 1000);

async function scrapeProxies() {
    return new Promise((resolve) => {
        https.get('https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=5000&country=all&ssl=all&anonymity=all', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const proxies = data.split('\n').map(p => p.trim()).filter(p => p);
                console.log(`Scraped ${proxies.length} free proxies! (Note: Free proxies often fail or timeout)`);
                resolve(proxies.map(p => p.includes('http') ? p : `http://${p}`));
            });
        }).on('error', (err) => {
            console.error("Proxy scrape failed", err);
            resolve([]);
        });
    });
}

async function checkWebsiteStatus(url, proxy) {
    let browser = null;
    try {
        metrics.requestsSent++;
        metrics.activeBrowsers++;
        
        let args = [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--no-first-run',
            '--no-zygote',
            '--single-process'
        ];

        // Safely apply proxy at the browser level (100% reliable compared to page-proxy)
        if (proxy) {
            args.push(`--proxy-server=${proxy}`);
        }

        browser = await puppeteer.launch({ 
            headless: 'new',
            args: args
        });
        
        const page = await browser.newPage();
        
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
        
        // Block heavy resources
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        const status = response ? response.status() : 'Unknown';
        
        if (status === 200 || status === 304 || status === 201) {
            metrics.successfulViews++;
        } else {
            metrics.errors++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
    } catch (e) {
        metrics.errors++;
    } finally {
        if (browser) await browser.close().catch(() => {});
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
    
    // Fire and forget
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
    
    trafficLoop();
}

function stopTraffic() {
    if (!isRunning) return;
    isRunning = false;
    console.log(`Stopped traffic.`);
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
        proxiesList = [];
    }

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