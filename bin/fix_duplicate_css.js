const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace all occurrences of header#mainHeader that have a blur or rgba background with transparent ones.
const regex = /\[data-theme="light"\] header#mainHeader\s*\{[^}]+\}/g;

html = html.replace(regex, `[data-theme="light"] header#mainHeader {
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
    }`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed duplicate CSS blocks for mainHeader.');
