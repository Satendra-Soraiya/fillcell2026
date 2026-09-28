const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fixPillCSS = `
    /* Restore pill shape to navigation links and active bubbles */
    header#mainHeader nav a {
        border-radius: 9999px !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', fixPillCSS + '\n</style>');
} else {
    html += '<style>' + fixPillCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Restored pill shape to navigation bubbles.');
