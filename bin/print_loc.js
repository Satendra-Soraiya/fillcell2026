const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('<section id="locations"');
console.log(html.substring(start, start + 300));
