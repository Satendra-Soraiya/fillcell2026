const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the invalid body selector with html
html = html.replace(/body\[data-theme="light"\] header#mainHeader\.header-scrolled/g, 'html[data-theme="light"] header#mainHeader.header-scrolled');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed frosting selector for Light Mode.');
