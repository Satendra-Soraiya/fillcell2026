const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(' overflow-x-hidden w-full max-w-[100vw]', '');
html = html.replace(' overflow-x-hidden w-full max-w-[100vw]', '');
html = html.replace(' overflow-x-hidden w-full max-w-[100vw]', '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed overflow-x-hidden from body/main');
