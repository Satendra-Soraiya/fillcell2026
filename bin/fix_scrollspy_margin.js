const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The old root margin might be '-20% 0px -70% 0px'
// Let's replace it with a center-screen detection margin which is vastly more reliable
html = html.replace(/rootMargin:\s*'[^']+',\s*threshold:\s*0\s*}\);/g, "rootMargin: '-40% 0px -40% 0px', threshold: 0 });");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed ScrollSpy IntersectionObserver margins.');
