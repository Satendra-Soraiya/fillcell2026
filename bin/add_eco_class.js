const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace all 6 text container opening divs inside ecosystem cards
// They all have this pattern now:
const old = 'class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9); color: #ffffff !important;"';
const nw  = 'class="absolute bottom-0 left-0 right-0 p-6 z-20 eco-card-text" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9); color: #ffffff !important;"';

const count = (html.match(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log('Found', count, 'matches');

html = html.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), nw);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added eco-card-text class to', count, 'card text containers');
