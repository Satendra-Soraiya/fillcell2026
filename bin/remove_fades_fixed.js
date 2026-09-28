const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const s1Start = '[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/75 {';
if (html.includes(s1Start)) {
    const startIdx = html.indexOf(s1Start);
    const endIdx = html.indexOf('}', startIdx) + 1;
    html = html.substring(0, startIdx) + html.substring(endIdx);
    console.log("Removed s1");
}

const s2Start = '[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/90 {';
if (html.includes(s2Start)) {
    const startIdx = html.indexOf(s2Start);
    const endIdx = html.indexOf('}', startIdx) + 1;
    html = html.substring(0, startIdx) + html.substring(endIdx);
    console.log("Removed s2");
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done.');
