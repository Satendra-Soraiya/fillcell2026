const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const s1 = `[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/75 {
         background: linear-gradient(to top, rgba(248, 245, 238, 0.95) 0%, rgba(248, 245, 238, 0.4) 40%, transparent 100%) !important;
    }`;

const s2 = `[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/90 {
         background: linear-gradient(to top, var(--theme-bg-primary) 0%, rgba(248, 245, 238, 0.6) 50%, transparent 100%) !important;
    }`;

if (html.includes(s1)) {
    html = html.replace(s1, '');
} else {
    console.log("Could not find s1 exactly, trying relaxed match...");
    html = html.replace(/\[data-theme="light"\] \.bg-gradient-to-t\.from-\\.\[\\#09090d\\.\]\\/75 \{[\s\S]*?\}/, '');
}

if (html.includes(s2)) {
    html = html.replace(s2, '');
} else {
    console.log("Could not find s2 exactly, trying relaxed match...");
    html = html.replace(/\[data-theme="light"\] \.bg-gradient-to-t\.from-\\.\[\\#09090d\\.\]\\/90 \{[\s\S]*?\}/, '');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed white fades successfully.');
