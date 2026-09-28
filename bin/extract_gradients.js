const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="absolute inset-0 bg-gradient-to-t[^"]*"><\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    console.log(match[0]);
}
