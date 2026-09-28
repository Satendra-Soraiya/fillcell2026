const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const refs = html.match(/src="([^"]+)"|url\('([^']+)'\)/g);
refs.forEach(r => { if (!r.includes('http') && !r.includes('fonts.')) console.log(r); });
