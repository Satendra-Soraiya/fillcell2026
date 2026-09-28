const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('id="ecosystem"');
console.log(html.substring(start - 50, start + 2000));
