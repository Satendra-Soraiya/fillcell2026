const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The block to remove starts with "/* Universal Premium Liquid Glass (Matches Light Mode style for consistency) */"
// and ends before "/* Apply same Liquid Glass to Hero Components */" or similar.
const removeRegex = /\/\* Universal Premium Liquid Glass \([\s\S]*?(?=\/\* 1\. Explore 1,200\+ Locations)/g;
html = html.replace(removeRegex, '');

// Also clean up any other instances just in case
const regex2 = /header#mainHeader nav\s*\{[^}]+\}/g;
html = html.replace(regex2, '');
const regex3 = /header#mainHeader nav a\s*\{[^}]+\}/g;
html = html.replace(regex3, '');
const regex4 = /header#mainHeader nav a:hover\s*\{[^}]+\}/g;
html = html.replace(regex4, '');
const regex5 = /header#mainHeader nav a\.active-pill\s*\{[^}]+\}/g;
html = html.replace(regex5, '');
const regex6 = /\[data-theme="light"\] header#mainHeader nav[^{]*\{[^}]+\}/g;
html = html.replace(regex6, '');
const regex7 = /html:not\(\[data-theme="light"\]\) header#mainHeader nav[^{]*\{[^}]+\}/g;
html = html.replace(regex7, '');
const regex8 = /html\[data-theme="dark"\] header#mainHeader nav[^{]*\{[^}]+\}/g;
html = html.replace(regex8, '');


const properNavGlassCSS = `
/* ==============================================
   PROPER DAY/NIGHT LIQUID GLASS NAVIGATION
   ============================================== */

/* BASE STRUCTURE (Applied to both modes) */
header#mainHeader nav {
    backdrop-filter: blur(28px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
    padding: 6px 8px !important;
    gap: 4px !important;
    border-radius: 9999px !important;
}

/* DARK MODE - Cinematic Dark Glass */
html:not([data-theme="light"]) header#mainHeader nav {
    background: rgba(15, 17, 21, 0.25) !important; 
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.15) !important; /* Subtle top specular highlight */
    border-bottom: 1px solid rgba(0, 0, 0, 0.4) !important; /* Grounded bottom edge */
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.05),
        inset 0 -10px 20px rgba(0, 0, 0, 0.2),
        0 12px 35px rgba(0, 0, 0, 0.25) !important; /* Deep ambient shadow */
}
html:not([data-theme="light"]) header#mainHeader nav a {
    color: #F8FAFC !important; /* Light crisp text */
}
html:not([data-theme="light"]) header#mainHeader nav a:hover {
    background: rgba(255, 255, 255, 0.08) !important; /* Soft light hover capsule */
    color: #F58220 !important;
}
html:not([data-theme="light"]) header#mainHeader nav a.active-pill {
    background: rgba(245, 130, 32, 0.15) !important; /* Orange glass capsule */
    border: 1px solid rgba(245, 150, 20, 0.3) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.2) !important; /* Inner highlight */
    box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.1),
        0 4px 12px rgba(245, 130, 32, 0.15) !important; /* Soft orange glow */
    color: #F58220 !important;
}

/* LIGHT MODE - Frosted Clear Glass */
[data-theme="light"] header#mainHeader nav {
    background: rgba(255, 255, 255, 0.15) !important; 
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.7) !important; /* Strong top specular highlight */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.8),
        inset 0 -10px 20px rgba(255, 255, 255, 0.1),
        0 12px 35px rgba(0, 0, 0, 0.12) !important; /* Soft ambient shadow */
}
[data-theme="light"] header#mainHeader nav a {
    color: #000000 !important; /* Dark bold text */
    font-weight: 700 !important;
}
[data-theme="light"] header#mainHeader nav a:hover {
    background: rgba(255, 255, 255, 0.5) !important; /* Milky white hover capsule */
    color: #D97706 !important;
}
[data-theme="light"] header#mainHeader nav a.active-pill {
    background: rgba(245, 130, 32, 0.15) !important; 
    border: 1px solid rgba(245, 150, 20, 0.3) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.7) !important;
    box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.6),
        0 4px 12px rgba(245, 130, 32, 0.1) !important;
    color: #D97706 !important;
}
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', properNavGlassCSS + '\n</style>');
} else {
    html += '<style>' + properNavGlassCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed navigation bar glass themes for both modes.');
