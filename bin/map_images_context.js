const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div[^>]*style="background-image: url\('([^']+)'\)"[^>]*>/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
    let url = m[1];
    // Get 300 characters around the match to see context
    let context = html.substring(Math.max(0, m.index - 50), Math.min(html.length, m.index + 350));
    context = context.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    console.log(`[URL ${count}] ${url.substring(0, 80)}...`);
    console.log(`[CONTEXT ${count}] ${context}`);
    console.log('---');
    count++;
}
