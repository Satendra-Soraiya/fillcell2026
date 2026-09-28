const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The label blocks use the bullet character • (U+2022) not the escaped \u2022 in the file
// and the grad uses the HTML entity &amp; - let's just do targeted substring replacements

function replaceCard(html, needle, badgeText, h3Text, pText) {
    const idx = html.indexOf(needle);
    if (idx === -1) { console.log('Not found:', needle); return html; }
    
    // go backward to find the opening <div class="absolute bottom-0...
    const divStart = html.lastIndexOf('<div class="absolute bottom-0 left-0 right-0 p-6 text-white z-20 drop-shadow-xl">', idx);
    // go forward to find the closing </div>\n</div>
    const divEnd = html.indexOf('</div>\n</div>', idx) + '</div>\n</div>'.length - '</div>'.length;
    
    const oldBlock = html.substring(divStart, divEnd);
    const newBlock = `<div class="absolute bottom-0 left-0 right-0 p-6 z-20" style="text-shadow: 0 1px 8px rgba(0,0,0,0.9)">
<span class="inline-block mb-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-black" style="background:rgba(245,158,11,0.18);border:1px solid rgba(245,158,11,0.45);color:#FCD34D;backdrop-filter:blur(6px)">${badgeText}</span>
<h3 class="text-xl font-extrabold text-white leading-tight">${h3Text}</h3>
<p class="text-xs text-slate-200 mt-1 line-clamp-2 font-medium">${pText}</p>
</div>`;
    
    html = html.substring(0, divStart) + newBlock + html.substring(divEnd);
    console.log('Fixed card:', badgeText);
    return html;
}

html = replaceCard(html, 
    '01 \u2022 UNESCO',
    '01 \u2022 UNESCO &amp; Fortresses',
    'Heritage &amp; Monuments',
    'Khajuraho temples, Orchha Betwa palaces, Gwalior Fort ramparts, and Mandu\u2019s Jahaz Mahal.'
);

html = replaceCard(html,
    '05 \u2022 Authentic',
    '05 \u2022 Authentic Hinterland',
    'Villages &amp; Rural Pastoral',
    'Mahodiya village (filming site of \u2018Panchayat\u2019), Bundelkhand hamlets, and tribal arts communities.'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done!');
