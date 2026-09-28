const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('<header id="mainHeader"');
const end = html.indexOf('</header>', start);

console.log(html.substring(start, end + 9));
