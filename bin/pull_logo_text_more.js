const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('margin-left: -30px !important;', 'margin-left: -55px !important;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Pulled text closer to logo by -55px.');
