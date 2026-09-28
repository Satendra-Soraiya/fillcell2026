const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGradient = `<div class="absolute inset-0" style="background: linear-gradient(to top, rgba(9,9,13,0.98) 0%, rgba(9,9,13,0.7) 38%, rgba(9,9,13,0.15) 65%, transparent 100%); z-index:10"></div>`;
const oldGradient = `<div class="absolute inset-0 bg-gradient-to-t from-[#09090d] via-[#09090d]/80 to-transparent z-10"></div>`;

// card 01 label
const oldLabel01 = `<div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20 drop-shadow-xl">\n<span class="text-xs uppercase tracking-wider text-amber-400 font-bold">01 \u2022 UNESCO &amp; Fortresses</span>\n<h3 class="text-xl font-bold">Heritage &amp; Monuments</h3>\n<p class="text-xs text-slate-300 mt-1 line-clamp-2">Khajuraho temples, Orchha Betwa palaces, Gwalior Fort ramparts, and Mandu's Jahaz Mahal.</p>\n</div>`;
const newLabel01 = `<div class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9)">
<span class="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-black" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.45);color:#FCD34D;backdrop-filter:blur(6px)">01 \u2022 UNESCO &amp; Fortresses</span>
<h3 class="text-xl font-extrabold text-white leading-tight">Heritage &amp; Monuments</h3>
<p class="text-xs text-slate-200 mt-1 line-clamp-2 font-medium">Khajuraho temples, Orchha Betwa palaces, Gwalior Fort ramparts, and Mandu\u2019s Jahaz Mahal.</p>
</div>`;

// card 05 label
const oldLabel05 = `<div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20 drop-shadow-xl">\n<span class="text-xs uppercase tracking-wider text-amber-400 font-bold">05 \u2022 Authentic Hinterland</span>\n<h3 class="text-xl font-bold">Villages &amp; Rural Pastoral</h3>\n<p class="text-xs text-slate-300 mt-1 line-clamp-2">Mahodiya village (filming site of 'Panchayat'), Bundelkhand hamlets, and tribal arts communities.</p>\n</div>`;
const newLabel05 = `<div class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9)">
<span class="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-black" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.45);color:#FCD34D;backdrop-filter:blur(6px)">05 \u2022 Authentic Hinterland</span>
<h3 class="text-xl font-extrabold text-white leading-tight">Villages &amp; Rural Pastoral</h3>
<p class="text-xs text-slate-200 mt-1 line-clamp-2 font-medium">Mahodiya village (filming site of \u2018Panchayat\u2019), Bundelkhand hamlets, and tribal arts communities.</p>
</div>`;

// Replace all old gradients with new
html = html.replace(new RegExp(oldGradient.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newGradient);
console.log('Gradients replaced:', (html.match(/rgba\(9,9,13,0\.98\)/g) || []).length);

// Replace label blocks
if (html.includes(oldLabel01)) {
    html = html.replace(oldLabel01, newLabel01);
    console.log('Card 01 label replaced');
} else {
    console.log('Card 01 label NOT found - searching...');
    // Try a simpler search
    const idx = html.indexOf('01 \u2022 UNESCO');
    console.log('01 • UNESCO at byte:', idx);
    if (idx > 0) console.log(JSON.stringify(html.substring(idx - 150, idx + 300)));
}

if (html.includes(oldLabel05)) {
    html = html.replace(oldLabel05, newLabel05);
    console.log('Card 05 label replaced');
} else {
    console.log('Card 05 label NOT found');
    const idx = html.indexOf('05 \u2022 Authentic');
    console.log('05 • Authentic at byte:', idx);
    if (idx > 0) console.log(JSON.stringify(html.substring(idx - 150, idx + 300)));
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done');
