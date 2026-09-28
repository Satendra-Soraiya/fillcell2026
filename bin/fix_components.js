const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove "Single Window Portal" badge
const badgeHTML = '<span class="hidden xl:inline-block px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-full gold-badge text-amber-300">Single Window Portal</span>';
if (html.includes(badgeHTML)) {
    html = html.replace(badgeHTML, '');
    console.log('Removed Single Window Portal badge.');
}

// 2. Remove "Live MP Footage" block
const footageStartStr = '<!-- Lower Left Floating Info -->';
const footageStartIdx = html.indexOf(footageStartStr);
if (footageStartIdx !== -1) {
    const footageEndIdx = html.indexOf('</div>', footageStartIdx) + 6;
    html = html.substring(0, footageStartIdx) + html.substring(footageEndIdx);
    console.log('Removed Live MP Footage component.');
}

// 3. Fix the logo subtext color
const subtextStr = '<span class="text-[11px] text-amber-400/80 font-medium">मध्य प्रदेश शासन | Madhya Pradesh Tourism Board</span>';
const newSubtextStr = '<span class="text-[11px] text-amber-400/80 font-medium" id="logo-subtext">मध्य प्रदेश शासन | Madhya Pradesh Tourism Board</span>';
if (html.includes(subtextStr)) {
    html = html.replace(subtextStr, newSubtextStr);
    console.log('Added ID to logo subtext.');
}

const fixCSS = `
    /* Fix logo subtext visibility in Light Mode */
    [data-theme="light"] #logo-subtext {
        color: #101827 !important;
        font-weight: 700 !important;
    }
`;

if (html.includes('/* 1. Transparent Glass Top Header */')) {
    html = html.replace('/* 1. Transparent Glass Top Header */', fixCSS + '\n    /* 1. Transparent Glass Top Header */');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Finished updates.');
