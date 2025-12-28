import fs from 'fs';
const key = 're_aRiTXKtG_KNbimJr29AQHo1cNVejf2odg';
try {
    let content = fs.readFileSync('.env.local', 'utf8');
    if (content.includes('RESEND_API_KEY=')) {
        content = content.replace(/RESEND_API_KEY=.*/, `RESEND_API_KEY=${key}`);
    } else {
        content += `\nRESEND_API_KEY=${key}\n`;
    }
    fs.writeFileSync('.env.local', content);
    console.log('Updated .env.local with RESEND_API_KEY');
} catch (e) {
    console.error(e);
}
