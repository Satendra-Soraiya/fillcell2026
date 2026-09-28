const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchInputFixCSS = `
    /* Force completely borderless input to override any Tailwind Forms resets */
    [data-theme="light"] section#locations input {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        background: transparent !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
    [data-theme="light"] section#locations input:focus {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }
    /* Clean up the dropdown select as well just in case */
    [data-theme="light"] section#locations select {
        outline: none !important;
    }
    [data-theme="light"] section#locations select:focus {
        box-shadow: 0 0 0 2px rgba(245, 130, 32, 0.2) !important;
        border-color: #F58220 !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', searchInputFixCSS + '\n</style>');
} else {
    html += '<style>' + searchInputFixCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed search input ugly border.');
