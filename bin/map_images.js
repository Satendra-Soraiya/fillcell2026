const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find all elements with a style="background-image: url(...)" and get their text content to identify them
const regex = /<div[^>]*style="background-image: url\('([^']+)'\)"[^>]*>([\s\S]*?)<\/div>/g;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
    let url = m[1];
    let content = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`[URL ${count}] ${url.substring(0, 80)}...`);
    console.log(`[TEXT ${count}] ${content.substring(0, 100)}...`);
    console.log('---');
    count++;
}
