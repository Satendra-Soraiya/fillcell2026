const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove all existing CSS targeting 'header#mainHeader nav'
const regex = /\[data-theme="light"\] header#mainHeader nav[^{]*\{[^}]+\}/g;
html = html.replace(regex, '');

const regex2 = /header#mainHeader nav[^{]*\{[^}]+\}/g;
html = html.replace(regex2, '');

// 2. The Premium Liquid Glass CSS
const liquidGlassCSS = `
/* =========================================
   PREMIUM LIQUID GLASS NAVIGATION (GLOBAL)
   ========================================= */

/* The parent container adjustment */
header#mainHeader .hidden.lg\\:block.border-t {
    border-top: none !important;
    padding-top: 8px !important;
    padding-bottom: 12px !important;
    display: flex !important;
    justify-content: center !important;
}

/* The Nav Pill itself - Shared Structure */
header#mainHeader nav {
    border-radius: 9999px !important; 
    padding: 6px 8px !important;
    width: fit-content !important;
    margin: 0 auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 4px !important;
    transition: all 0.4s cubic-bezier(0.2, 0, 0, 1) !important;
    position: relative !important;
    /* Apple Liquid Glass characteristics */
    backdrop-filter: blur(28px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
}

/* Base Nav Links - Shared Structure */
header#mainHeader nav a {
    position: relative !important;
    background: transparent !important;
    border: 1px solid transparent !important;
    box-shadow: none !important;
    font-weight: 600 !important;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
    padding: 6px 14px !important;
    border-radius: 9999px !important;
    -webkit-text-fill-color: initial !important; 
    z-index: 1 !important;
}

/* ================== DARK MODE (LIQUID GLASS) ================== */
html[data-theme="dark"] header#mainHeader nav,
html:not([data-theme="light"]) header#mainHeader nav {
    background: rgba(15, 17, 21, 0.45) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.15) !important; /* top specular highlight */
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important; /* lower darker edge */
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.1),
        inset 0 -10px 20px rgba(0, 0, 0, 0.2),
        0 12px 30px rgba(0, 0, 0, 0.3) !important;
}

/* Dark Mode Links */
html[data-theme="dark"] header#mainHeader nav a,
html:not([data-theme="light"]) header#mainHeader nav a {
    color: #E2E8F0 !important; /* slate-200 */
}

/* Dark Mode Hover */
html[data-theme="dark"] header#mainHeader nav a:hover,
html:not([data-theme="light"]) header#mainHeader nav a:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #FFFFFF !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
}

/* Dark Mode Active (Home) */
html[data-theme="dark"] header#mainHeader nav a[href="#home"],
html:not([data-theme="light"]) header#mainHeader nav a[href="#home"] {
    background: rgba(245, 130, 32, 0.15) !important; /* Subtle translucent orange */
    border: 1px solid rgba(245, 150, 20, 0.3) !important;
    border-top: 1px solid rgba(255, 200, 100, 0.3) !important;
    box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.1),
        0 4px 12px rgba(245, 130, 32, 0.1) !important;
    color: #F58220 !important;
}

/* ================== LIGHT MODE (LIQUID GLASS) ================== */
[data-theme="light"] header#mainHeader nav {
    background: rgba(255, 255, 255, 0.35) !important; /* highly translucent milky surface */
    border: 1px solid rgba(255, 255, 255, 0.4) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.8) !important; /* strong white top highlight */
    border-bottom: 1px solid rgba(200, 200, 210, 0.2) !important; /* subtle dark bottom */
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.9),
        inset 0 -10px 20px rgba(255, 255, 255, 0.1),
        0 12px 35px rgba(20, 30, 40, 0.08) !important;
}

/* Light Mode Links */
[data-theme="light"] header#mainHeader nav a {
    color: #1E293B !important; /* slate-800 */
}

/* Light Mode Hover */
[data-theme="light"] header#mainHeader nav a:hover {
    background: rgba(255, 255, 255, 0.5) !important; /* translucent capsule */
    color: #D97706 !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03) !important;
}

/* Light Mode Active (Home) */
[data-theme="light"] header#mainHeader nav a[href="#home"] {
    background: rgba(245, 130, 32, 0.12) !important; /* Subtle translucent orange */
    border: 1px solid rgba(245, 150, 20, 0.25) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.6) !important;
    box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.5),
        0 4px 12px rgba(245, 130, 32, 0.08) !important;
    color: #D97706 !important;
}
`;

// Inject before closing </style>
if (html.includes('</style>')) {
    html = html.replace('</style>', liquidGlassCSS + '\n</style>');
} else {
    // If somehow missing, append it
    html += '<style>' + liquidGlassCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Upgraded nav to Liquid Glass.');
