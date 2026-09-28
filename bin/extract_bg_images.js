const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /style="[^"]*background-image:[^"]*"/g;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log(m[0]);
}
