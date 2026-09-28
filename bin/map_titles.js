const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div[^>]*style="background-image: url\('([^']+)'\)"[^>]*>([\s\S]*?)(?:<h[234][^>]*>([^<]+)<\/h[234]>|<div[^>]*class="[^"]*text-xl[^"]*"[^>]*>([^<]+)<\/div>|class="[^"]*font-bold[^"]*"[^>]*>([^<]+)<\/div>)/g;

let count = 0;
// We'll just split by the URL and look forward to find the next meaningful text
const urls = [];
const urlRegex = /url\('([^']+)'\)/g;
let m;
while ((m = urlRegex.exec(html)) !== null) {
    if (m[1].includes('aida-public')) urls.push(m[1]);
}

urls.forEach((url, i) => {
    const idx = html.indexOf(url);
    const context = html.substring(idx, idx + 600).replace(/\n/g, ' ').replace(/\s+/g, ' ');
    // Try to find an h3 or h4
    let titleMatch = context.match(/<h[34][^>]*>([^<]+)<\/h[34]>/);
    let title = titleMatch ? titleMatch[1].trim() : 'Unknown';
    if (title === 'Unknown') {
        titleMatch = context.match(/<div class="font-bold[^"]*">([^<]+)<\/div>/);
        title = titleMatch ? titleMatch[1].trim() : 'Unknown';
    }
    console.log(`[Card ${i}] Title: ${title}`);
    console.log(`URL: ${url}`);
});

