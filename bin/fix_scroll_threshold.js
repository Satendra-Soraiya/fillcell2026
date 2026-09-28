const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('if (window.scrollY > 40)', 'if (window.scrollY > Math.max(window.innerHeight - 130, 40))');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed scroll threshold for header.');
