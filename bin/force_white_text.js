const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The real problem: Tailwind text-white gets overridden in light mode.
// Fix: force color via inline style on each text node in the ecosystem cards.
// Find each card's text block by its unique label, then force white text inline.

const cards = [
    { needle: '01 \u2022 UNESCO', h3: 'Heritage &amp; Monuments' },
    { needle: '02 \u2022 Untamed', h3: 'Forests &amp; Wildlife' },
    { needle: '03 \u2022 Sacred', h3: 'Rivers &amp; Waterfalls' },
    { needle: '04 \u2022 Urban', h3: 'Cities &amp; Skylines' },
    { needle: '05 \u2022 Authentic', h3: 'Villages &amp; Rural Pastoral' },
    { needle: '06 \u2022 Dramatic', h3: 'Roads &amp; Ravines' },
];

// Fix the h3 elements: add color: #ffffff !important inline style
html = html.replace(/(<h3 class="text-xl font-extrabold text-white leading-tight">)/g, 
    '<h3 style="color:#ffffff!important;text-shadow:0 2px 12px rgba(0,0,0,1)" class="text-xl font-extrabold leading-tight">');

// Fix description paragraphs inside the mosaic cards (text-slate-200)
html = html.replace(/(<p class="text-xs text-slate-200 mt-1 line-clamp-2 font-medium">)/g,
    '<p style="color:#e2e8f0!important;text-shadow:0 1px 8px rgba(0,0,0,0.9)" class="text-xs mt-1 line-clamp-2 font-medium">');

// Fix the outer wrapper to force white text regardless of theme
// Replace the text container opening div (6 times, once per card)
html = html.replace(/(<div class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba\(0,0,0,0.9\)">)/g,
    '<div class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9); color: #ffffff !important;">');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done - forced white text on all ecosystem cards');
