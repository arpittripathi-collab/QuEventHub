import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Common Chrome/Chromium paths on Windows
const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.CHROME_PATH,
    process.env.CHROMIUM_PATH
].filter(Boolean);

// Find the first existing Chrome executable
let chromeExecutablePath = null;
for (const path of chromePaths) {
    if (path && existsSync(path)) {
        chromeExecutablePath = path;
        break;
    }
}

// Puppeteer configuration
const puppeteerConfig = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
    ]
};

// Only set executablePath if we found Chrome
if (chromeExecutablePath) {
    puppeteerConfig.executablePath = chromeExecutablePath;
    console.log(`[WhatsApp] Using Chrome at: ${chromeExecutablePath}`);
} else {
    console.warn('[WhatsApp] Chrome executable not found. Puppeteer will try to use bundled Chromium.');
    console.warn('[WhatsApp] If this fails, install Chrome or set CHROME_PATH environment variable.');
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerConfig
});

client.on('qr', (qr) => {
    console.log('\n[WhatsApp] Scan this QR code with your WhatsApp to log in:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ [WhatsApp] Client is Ready!');
});

client.on('authenticated', () => {
    console.log('✅ [WhatsApp] Authentication successful!');
});

client.on('auth_failure', (msg) => {
    console.error('❌ [WhatsApp] Authentication failed:', msg);
});

client.on('disconnected', (reason) => {
    console.log('⚠️ [WhatsApp] Client disconnected:', reason);
});

// Initialize with error handling
try {
    client.initialize().catch((error) => {
        console.error('❌ [WhatsApp] Failed to initialize:', error.message);
        console.error('[WhatsApp] This might be due to:');
        console.error('  1. Chrome/Chromium not installed');
        console.error('  2. Missing dependencies');
        console.error('  3. Network issues');
        console.error('[WhatsApp] WhatsApp features will be disabled until this is resolved.');
    });
} catch (error) {
    console.error('❌ [WhatsApp] Error during initialization:', error.message);
}

export default client;