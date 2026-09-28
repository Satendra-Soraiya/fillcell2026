const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The logo has w-auto. We should give it an explicit width container so it doesn't jump.
// Or, we can just inject a CSS rule for the brand-logo width.
const css = `
    /* Fix logo width to prevent layout jump on theme toggle */
    img.brand-logo {
        width: 130px !important; /* Fixed width */
        object-fit: contain !important;
        object-position: left center !important;
    }
    @media (max-width: 768px) {
        img.brand-logo {
            width: 110px !important;
        }
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', css + '\n</style>');
} else {
    html += '<style>' + css + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed logo layout jump.');
