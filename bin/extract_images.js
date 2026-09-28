const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<img[^>]*src="([^"]+)"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
    if (m[1].includes('placeholder.com') || m[1].includes('source.unsplash.com') || m[1].includes('unsplash.it') || m[1].includes('images.unsplash.com')) {
        console.log(m[1]);
    }
}
