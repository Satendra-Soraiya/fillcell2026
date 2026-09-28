const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("const img = document.getElementById('heroBgImage');", "const imgs = document.querySelectorAll('.night-bg, .day-bg');");
html = html.replace("if (img) img.style.filter = 'brightness(0.85)';", "imgs.forEach(img => img.style.filter = 'brightness(0.85)');");
html = html.replace("if (img) img.style.filter = 'none';", "imgs.forEach(img => img.style.filter = 'none');");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed toggleFootageEffect');
