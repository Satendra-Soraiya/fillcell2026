const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /\[data-theme="light"\] \.bg-gradient-to-t\.from-\\.\[\\#09090d\\.\]\\/75 \{\s*background: linear-gradient\(to top, rgba\(248, 245, 238, 0\.95\) 0%, rgba\(248, 245, 238, 0\.4\) 40%, transparent 100%\) !important;\s*\}/g;

html = html.replace(regex, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed white fade effect from day theme hero section.');
