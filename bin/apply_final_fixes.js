const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const additionalFixesCSS = `
    /* Fix 1: Restore Light Mode Scrolled Header Visibility */
    body[data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.92) !important;
        backdrop-filter: blur(30px) saturate(200%) !important;
        -webkit-backdrop-filter: blur(30px) saturate(200%) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05) !important;
    }

    /* Fix 2: Match shape of secondary CTA and Badge to the primary CTA (12px / rounded-xl) */
    .hero-cta-glass, .hero-badge-glass {
        border-radius: 12px !important; 
    }

    /* Fix 3: Hide the old horizontal scroll progress bar */
    #scrollProgressBar {
        display: none !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', additionalFixesCSS + '\n</style>');
} else {
    html += '<style>' + additionalFixesCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Applied scroll header fix, shape consistency, and removed progress bar.');
