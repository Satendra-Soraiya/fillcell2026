const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldScrolled = `    [data-theme="light"] header#mainHeader.header-scrolled {
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
    }`;

const newScrolled = `    [data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.75) !important;
        backdrop-filter: blur(24px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(150%) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.45) !important;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08) !important;
    }`;

if (html.includes(oldScrolled)) {
    html = html.replace(oldScrolled, newScrolled);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Restored translucent scrolled header.');
} else {
    console.log('Could not find old scrolled block.');
}
