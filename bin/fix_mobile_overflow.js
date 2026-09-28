const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add overflow-x-hidden and w-full to body to fix mobile horizontal scroll issue
html = html.replace(/<body class="([^"]*)">/, '<body class="$1 overflow-x-hidden w-full max-w-[100vw]">');

// 2. Wrap main with overflow-x-hidden too just in case
html = html.replace(/<main class="([^"]*)">/, '<main class="$1 overflow-x-hidden w-full max-w-[100vw]">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added overflow-x-hidden to body and main');
