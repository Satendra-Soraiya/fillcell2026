const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldFooterStart = '<footer class="w-full bg-[#FFFDF8] shadow-[0_8px_30px_rgba(50,40,20,0.06)] border border-[#E3DDD2] border-t border-[#DDD6C8] py-12 px-4 md:px-8 xl:px-12">';
const newFooterStart = '<footer class="w-full bg-[#101827] py-12 px-4 md:px-8 xl:px-12">';

if (html.includes(oldFooterStart)) {
    // We'll just regex replace inside the footer block
    let [before, footerPart] = html.split(oldFooterStart);
    if(footerPart) {
        let [footerContent, after] = footerPart.split('</footer>');
        
        // Reverse colors in footer to match the dark theme
        footerContent = footerContent.replace(/text-\[#101827\]/g, 'text-white');
        footerContent = footerContent.replace(/text-\[#7A8491\]/g, 'text-slate-400');
        footerContent = footerContent.replace(/border-\[#DDD6C8\]/g, 'border-slate-800');
        footerContent = footerContent.replace(/text-\[#D99A16\]/g, 'text-amber-500');
        
        html = before + newFooterStart + footerContent + '</footer>' + after;
        fs.writeFileSync('index.html', html, 'utf8');
        console.log('Footer fixed');
    }
}
