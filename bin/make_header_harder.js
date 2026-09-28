const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove existing header-scrolled rules for light mode
const regex = /\[data-theme="light"\] header#mainHeader\.header-scrolled\s*\{[^}]+\}/g;
html = html.replace(regex, '');

// Also remove generic ones that might have been injected
const regex2 = /header#mainHeader\.header-scrolled\s*\{[^}]+\}/g;
html = html.replace(regex2, '');

// Inject the new "hard" frosted glass for scrolled header
const hardScrolledCSS = `
    /* =========================================
       HARD SCROLLED HEADER (LIGHT MODE)
       ========================================= */
    [data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.92) !important; /* Hard, nearly opaque white */
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05) !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', hardScrolledCSS + '\n</style>');
} else {
    html += '<style>' + hardScrolledCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Made scrolled header harder in light mode.');
