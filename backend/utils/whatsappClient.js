import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';


const client = new Client({
    authStrategy: new LocalAuth(), 
    puppeteer: {
        headless: true, 
        args: ['--no-sandbox'] 
    }
});


client.on('qr', (qr) => {
    console.log('\nScan this QR code with your WhatsApp to log in:');
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('✅ WhatsApp Client is Ready!');
});


client.initialize();

export default client;