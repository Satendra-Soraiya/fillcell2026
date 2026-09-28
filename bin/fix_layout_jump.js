const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Strip out the old light mode padding override for the nav container
const regex = /\[data-theme="light"\] header#mainHeader \.border-t\.border-white\\\/\\\[0\\\.05\\\]\s*\{[^}]+\}/g;
html = html.replace(regex, '');

// Also search without escapes just in case
const regex2 = /\[data-theme="light"\] header#mainHeader \.border-t[^{]*\{[^}]+\}/g;
html = html.replace(regex2, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed layout-breaking light mode CSS');
