const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace Dark Mode Hover
const oldDarkHover = `html:not([data-theme="light"]) header#mainHeader nav a.nav-pill-link:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #F58220 !important;
        border-color: rgba(255, 255, 255, 0.05) !important;
    }`;

const newDarkHover = `html:not([data-theme="light"]) header#mainHeader nav a.nav-pill-link:hover {
        background: rgba(245, 130, 32, 0.12) !important;
        color: #F58220 !important;
        border-color: rgba(245, 130, 32, 0.4) !important;
        box-shadow: 0 0 16px rgba(245, 130, 32, 0.25), inset 0 0 8px rgba(245, 130, 32, 0.1) !important;
        text-shadow: 0 0 8px rgba(245, 130, 32, 0.6) !important;
    }`;

// Replace Light Mode Hover
const oldLightHoverRegex = /\[data-theme="light"\] header#mainHeader nav a\.nav-pill-link:hover\s*{[^}]+}/;

const newLightHover = `[data-theme="light"] header#mainHeader nav a.nav-pill-link:hover {
        background: rgba(245, 130, 32, 0.1) !important;
        color: #EA580C !important;
        border-color: rgba(234, 88, 12, 0.4) !important;
        box-shadow: 0 0 16px rgba(234, 88, 12, 0.15), inset 0 0 8px rgba(234, 88, 12, 0.05) !important;
        text-shadow: 0 0 1px rgba(234, 88, 12, 0.3) !important;
    }`;

html = html.replace(oldDarkHover, newDarkHover);
html = html.replace(oldLightHoverRegex, newLightHover);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Hover styles updated!');
