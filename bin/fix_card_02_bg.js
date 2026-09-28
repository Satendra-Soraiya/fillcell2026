const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fixCard2CSS = `
    /* Fix Card 02 (Deputy Chairman) background in Light Mode */
    [data-theme="light"] section#cell-members .bg-gradient-to-br.from-\\[\\#1c1410\\] {
        background: #FFFDF8 !important;
        border-color: #E3D8C8 !important;
        box-shadow: 0 12px 35px rgba(60, 45, 20, 0.07) !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', fixCard2CSS + '\n</style>');
} else {
    html += '<style>' + fixCard2CSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed card 02 background in light mode.');
