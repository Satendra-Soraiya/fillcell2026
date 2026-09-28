const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Upgrade the weak gradients to be stronger and cover more area
html = html.replace(/bg-gradient-to-t from-black\/95 via-black\/40 to-transparent/g, 
    "bg-gradient-to-t from-[#09090d] via-[#09090d]/80 to-transparent z-10");

html = html.replace(/bg-gradient-to-t from-black\/80 via-transparent to-transparent/g, 
    "bg-gradient-to-t from-[#09090d] via-[#09090d]/80 to-transparent z-10");

// 2. Add drop-shadow to text container for the image cards to make text pop!
// It's currently: <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
// Wait, we can just replace that specific div start tag with one containing z-20 and drop-shadow
html = html.replace(/<div class="absolute bottom-0 left-0 right-0 p-6 text-white">/g, 
    '<div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20 drop-shadow-xl">');

// 3. Just to be completely sure the text has strong visibility even if the CSS drop-shadow isn't enough,
// we can add a very subtle dark background behind just the text area or make the gradient 100% black at the bottom.
// from-[#09090d] (which is 100% opaque) should already do the trick.

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed visibility!');
