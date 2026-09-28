const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /section#locations[^{]*\{[^}]+\}/g;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log(m[0]);
}
