const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const s1 = `/* 1. Transparent Glass Top Header */
    [data-theme="light"] header#mainHeader {
        background: rgba(255, 255, 255, 0.18) !important;
        backdrop-filter: blur(14px) saturate(130%) !important;
        -webkit-backdrop-filter: blur(14px) saturate(130%) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.22) !important;
        box-shadow: none !important;
    }`;

const s2 = `/* 1. Transparent Glass Top Header */
    [data-theme="light"] header#mainHeader {
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
    }`;

html = html.replace(s1, s2);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed header translucent background.');
