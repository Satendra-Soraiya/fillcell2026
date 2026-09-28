const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the old JS logic that swaps the heroImage src
const oldJsBlock = `      // Update Hero Image
      const heroImage = document.getElementById('heroBgImage');
      if(heroImage) {
        if(newTheme === 'light') {
           heroImage.src = 'fort day bg image.png';
        } else {
           heroImage.src = 'fort night bg image .png';
        }
      }`;
html = html.replace(oldJsBlock, '');

// 2. Replace the single hero image with the dual-image structure
const oldImgTagStart = html.indexOf('<img alt="Ujjain Fort Backdrop"');
if (oldImgTagStart !== -1) {
    const oldImgTagEnd = html.indexOf('>', oldImgTagStart) + 1;
    const oldImgTag = html.substring(oldImgTagStart, oldImgTagEnd);
    
    const newImgs = `
  <img alt="Night Fort Backdrop" class="absolute inset-0 w-full h-full object-cover object-[center_right] sm:object-center will-change-transform scale-[1.08] transition-opacity duration-1000 ease-in-out night-bg" src="fort night bg image .png">
  <img alt="Day Fort Backdrop" class="absolute inset-0 w-full h-full object-cover object-[center_right] sm:object-center will-change-transform scale-[1.08] transition-opacity duration-1000 ease-in-out day-bg" src="fort day bg image.png">
`;
    html = html.replace(oldImgTag, newImgs);
}

// 3. Inject CSS for opacity swapping
const crossfadeCSS = `
    /* Hero Background Crossfade */
    .day-bg { opacity: 0; }
    .night-bg { opacity: 1; }

    [data-theme="light"] .day-bg { opacity: 1 !important; }
    [data-theme="light"] .night-bg { opacity: 0 !important; }
`;

// Inject into our existing block
if (html.includes('/* =========================================\n       SPECIFIC LIGHT MODE HEADER REFINEMENTS')) {
    html = html.replace('/* =========================================\n       SPECIFIC LIGHT MODE HEADER REFINEMENTS', crossfadeCSS + '\n    /* =========================================\n       SPECIFIC LIGHT MODE HEADER REFINEMENTS');
} else {
    html = html.replace('</style>', crossfadeCSS + '\n</style>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Hero crossfade applied successfully.");
