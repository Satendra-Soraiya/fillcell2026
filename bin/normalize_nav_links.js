const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Strip all messy tailwind classes from the nav links to prevent transition/hover conflicts
html = html.replace(/<a class="[^"]+" href="([^"]+)">([^<]+)<\/a>/g, (match, href, text) => {
    // Only target links inside the nav
    if (['#home', '#why-mp', '#locations', '#how-it-works', '#dashboard', '#policy', '#films', '#ecosystem', '#cell-members', '#faqs'].includes(href)) {
        return '<a class="nav-pill-link" href="' + href + '">' + text + '</a>';
    }
    return match;
});

// 2. Add proper CSS with explicit transitions for the links
const properTransitionsCSS = `
    /* Normalize Nav Links Base State */
    header#mainHeader nav a.nav-pill-link {
        padding: 6px 12px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        letter-spacing: 0.025em !important;
        white-space: nowrap !important;
        border-radius: 9999px !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        background: transparent !important;
        border: 1px solid transparent !important;
        box-shadow: none !important;
        cursor: pointer !important;
        text-decoration: none !important;
    }

    /* Dark Mode Links */
    html:not([data-theme="light"]) header#mainHeader nav a.nav-pill-link {
        color: #F8FAFC !important;
    }
    html:not([data-theme="light"]) header#mainHeader nav a.nav-pill-link:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #F58220 !important;
        border-color: rgba(255, 255, 255, 0.05) !important;
    }
    html:not([data-theme="light"]) header#mainHeader nav a.nav-pill-link.active-pill {
        background: rgba(245, 130, 32, 0.15) !important;
        border-color: rgba(245, 150, 20, 0.3) !important;
        border-top-color: rgba(255, 255, 255, 0.2) !important;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(245, 130, 32, 0.15) !important;
        color: #F58220 !important;
    }

    /* Light Mode Links */
    [data-theme="light"] header#mainHeader nav a.nav-pill-link {
        color: #0F172A !important;
    }
    [data-theme="light"] header#mainHeader nav a.nav-pill-link:hover {
        background: rgba(255, 255, 255, 0.5) !important;
        color: #D97706 !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
    }
    [data-theme="light"] header#mainHeader nav a.nav-pill-link.active-pill {
        background: rgba(245, 130, 32, 0.15) !important;
        border-color: rgba(245, 150, 20, 0.3) !important;
        border-top-color: rgba(255, 255, 255, 0.7) !important;
        box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 4px 12px rgba(245, 130, 32, 0.1) !important;
        color: #D97706 !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', properTransitionsCSS + '\n</style>');
} else {
    html += '<style>' + properTransitionsCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Normalized nav links for consistent hover transitions.');
