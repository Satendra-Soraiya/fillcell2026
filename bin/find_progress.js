const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('<header id="mainHeader"');
const headerHTML = html.substring(start, html.indexOf('</header>'));
console.log(headerHTML);
