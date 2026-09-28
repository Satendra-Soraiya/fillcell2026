const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const lines = html.split('\n');
lines.forEach((line, i) => {
    if (line.includes('Find Your Next Frame') || 
        line.includes('Members of the Film Facilitation Cell') ||
        line.includes('One State. Endless Stories.')) {
        console.log('Line ' + (i + 1) + ': ' + line.trim());
        
        for (let j = Math.max(0, i - 15); j < Math.min(lines.length, i + 30); j++) {
            console.log(lines[j]);
        }
        console.log('---------------------------');
    }
});
