const socket = io();

// DOM Elements
const urlInput = document.getElementById('urlInput');
const rpsInput = document.getElementById('rpsInput');
const proxyInput = document.getElementById('proxyInput');
const savedProjectsSelect = document.getElementById('savedProjects');
const saveProjectBtn = document.getElementById('saveProjectBtn');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

const reqSentVal = document.getElementById('reqSentVal');
const viewsVal = document.getElementById('viewsVal');
const errorsVal = document.getElementById('errorsVal');
const activeBrowsersVal = document.getElementById('activeBrowsersVal');
const statusText = document.getElementById('statusText');

// State
let isRunning = false;
const STORAGE_KEY = 'saved_traffic_projects';

// Load saved projects
function loadSavedProjects() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    savedProjectsSelect.innerHTML = '<option value="">-- Select a saved project or enter new below --</option>';
    
    saved.forEach(proj => {
        const option = document.createElement('option');
        option.value = proj;
        option.textContent = proj;
        savedProjectsSelect.appendChild(option);
    });
}

// Save a new project
saveProjectBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) return alert('Please enter a valid URL to save.');
    
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!saved.includes(url)) {
        saved.push(url);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        loadSavedProjects();
        savedProjectsSelect.value = url;
        alert('Project saved successfully!');
    } else {
        alert('This project is already saved.');
    }
});

// Select saved project
savedProjectsSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        urlInput.value = e.target.value;
    }
});

// Start Traffic
startBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    const rps = parseFloat(rpsInput.value) || 1;
    const proxies = proxyInput.value.trim();

    if (!url) return alert('Target URL is required.');

    try {
        const res = await fetch('/api/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, rps, proxies })
        });
        const data = await res.json();
        
        if (data.success) {
            updateUIState(true);
        } else {
            alert(data.error || 'Failed to start traffic.');
        }
    } catch (err) {
        alert('Error starting traffic.');
    }
});

// Stop Traffic
stopBtn.addEventListener('click', async () => {
    try {
        const res = await fetch('/api/stop', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            updateUIState(false);
        }
    } catch (err) {
        alert('Error stopping traffic.');
    }
});

function updateUIState(running) {
    isRunning = running;
    if (running) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        urlInput.disabled = true;
        rpsInput.disabled = true;
        proxyInput.disabled = true;
        statusText.textContent = 'Online & Sending Traffic';
        statusText.className = 'online';
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        urlInput.disabled = false;
        rpsInput.disabled = false;
        proxyInput.disabled = false;
        statusText.textContent = 'Offline';
        statusText.className = 'offline';
    }
}

// Fetch initial status on load
async function checkStatus() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();
        updateUIState(data.isRunning);
        if (data.isRunning) {
            urlInput.value = data.targetUrl;
            // Converting RPM back to RPS for UI if needed, but here we just update state
            rpsInput.value = data.speedRpm / 60;
        }
    } catch (e) {
        console.error('Cannot fetch status', e);
    }
}

// Real-time Metrics
socket.on('metrics', (data) => {
    reqSentVal.textContent = data.requestsSent.toLocaleString();
    viewsVal.textContent = data.successfulViews.toLocaleString();
    errorsVal.textContent = data.errors.toLocaleString();
    activeBrowsersVal.textContent = data.activeBrowsers.toLocaleString();
});

// Initialize
loadSavedProjects();
checkStatus();
