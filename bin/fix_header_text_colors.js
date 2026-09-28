const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newCSS = `
    /* =========================================
       TRUE BLACK TEXT FOR LIGHT MODE HEADER
       ========================================= */
    [data-theme="light"] header#mainHeader .text-white,
    [data-theme="light"] header#mainHeader .text-slate-300,
    [data-theme="light"] header#mainHeader .text-slate-400,
    [data-theme="light"] header#mainHeader .text-slate-200 {
        color: #000000 !important;
        font-weight: 700 !important;
    }
    
    [data-theme="light"] header#mainHeader nav a {
        color: #000000 !important; 
        font-weight: 700 !important;
    }
    
    [data-theme="light"] #logo-subtext {
        color: #000000 !important;
        font-weight: 800 !important;
    }
    
    [data-theme="light"] header#mainHeader .bg-white\\/\\[0\\.03\\] {
        color: #000000 !important;
    }
    
    [data-theme="light"] header#mainHeader .theme-toggle-btn {
        color: #000000 !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', newCSS + '\n</style>');
} else {
    html += '<style>' + newCSS + '</style>';
}

// Remove old slate-400 overrides just to be safe
const regex = /\[data-theme="light"\] header#mainHeader \.text-slate-[0-9]+\s*\{[^}]+\}/g;
html = html.replace(regex, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed header text colors to true black in light mode.');
