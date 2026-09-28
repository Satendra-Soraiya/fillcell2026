const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const results = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('572')) {
        results.push(`Line ${i + 1}: ${lines[i]}`);
    }
    if (lines[i].toLowerCase().includes('dashboard')) {
        results.push(`Line ${i + 1}: ${lines[i]}`);
    }
}
console.log(results.join('\n'));
