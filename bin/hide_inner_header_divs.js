const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const fixCSS = `
    /* HIDE THE INTERNAL DARK MODE BACKGROUND DIVS IN LIGHT MODE */
    [data-theme="light"] header#mainHeader > div.absolute.inset-0.pointer-events-none.-z-10 {
        display: none !important;
        opacity: 0 !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
    }
`;

if (html.includes('/* 1. Transparent Glass Top Header */')) {
    html = html.replace('/* 1. Transparent Glass Top Header */', fixCSS + '\n    /* 1. Transparent Glass Top Header */');
} else {
    html = html.replace('</style>', fixCSS + '\n</style>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Injected CSS to hide inner header divs in light mode.');
