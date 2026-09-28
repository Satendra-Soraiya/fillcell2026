const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const pullTextCSS = `
    /* Pull logo text closer to the logo image */
    a.group.shrink-0 > div.hidden.sm\\:flex.flex-col {
        margin-left: -30px !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', pullTextCSS + '\n</style>');
} else {
    html += '<style>' + pullTextCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Pulled text closer to logo.');
