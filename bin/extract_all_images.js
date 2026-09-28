const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
    console.log(m[1]);
}
