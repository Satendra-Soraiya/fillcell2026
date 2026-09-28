const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix Home link
html = html.replace(
  'class="px-2.5 xl:px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-[10.5px] xl:text-[11px] tracking-wide shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all whitespace-nowrap"',
  'class="px-2.5 xl:px-3 py-1.5 rounded-lg bg-[#FFF1DD] border border-[#F4B36A] text-[#F47A00] font-bold text-[10.5px] xl:text-[11px] tracking-wide shadow-sm transition-all whitespace-nowrap"'
);

// Fix Inactive links - they all have identical classes
const badClasses = 'class="px-1.5 xl:px-2 py-1.5 rounded-lg bg-[#FFFDF8] shadow-sm border border-[#E3DDD2] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/40 text-[#526174] hover:text-amber-300 font-semibold text-[10.5px] xl:text-[11px] tracking-wide hover:shadow-[0_0_12px_rgba(245,158,11,0.15)] transition-all whitespace-nowrap"';
const goodClasses = 'class="px-1.5 xl:px-2 py-1.5 rounded-lg bg-transparent hover:bg-[#FFFDF8] border border-transparent hover:border-[#EAE4D9] text-[#263246] hover:text-[#F47A00] font-semibold text-[10.5px] xl:text-[11px] tracking-wide transition-all whitespace-nowrap"';

html = html.split(badClasses).join(goodClasses);

// Fix Language dropdown bg
html = html.replace('bg-amber-500 text-black', 'bg-[#F47A00] text-white');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Nav fixed');
