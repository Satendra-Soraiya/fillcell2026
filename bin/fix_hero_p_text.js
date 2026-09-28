const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fixHeroTextCSS = `
    /* Fix hero description text visibility in Light Mode */
    [data-theme="light"] section#home p.text-slate-300 {
        color: #111827 !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4) !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', fixHeroTextCSS + '\n</style>');
} else {
    html += '<style>' + fixHeroTextCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed hero paragraph text visibility in light mode.');
