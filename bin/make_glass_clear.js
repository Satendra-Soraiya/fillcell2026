const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update Dark Mode Glass
const oldDark = `html[data-theme="dark"] header#mainHeader nav,
html:not([data-theme="light"]) header#mainHeader nav {
    background: rgba(15, 17, 21, 0.45) !important;`;
const newDark = `html[data-theme="dark"] header#mainHeader nav,
html:not([data-theme="light"]) header#mainHeader nav {
    background: rgba(15, 17, 21, 0.18) !important; /* MUCH more transparent */`;
    
html = html.replace(oldDark, newDark);

// Update Light Mode Glass
const oldLight = `[data-theme="light"] header#mainHeader nav {
    background: rgba(255, 255, 255, 0.35) !important; /* highly translucent milky surface */`;
const newLight = `[data-theme="light"] header#mainHeader nav {
    background: rgba(255, 255, 255, 0.12) !important; /* Extremely clear glass */`;

html = html.replace(oldLight, newLight);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Made glass more clear.');
