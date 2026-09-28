const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('Apex Leadership (Chairman & Deputy Chairman)');
const end = html.indexOf('Executive Committee (Secretaries)');
const snippet = html.substring(start, end);

const matches = snippet.match(/class="[^"]*bg-[^"]*"/g);
console.log(matches);
