const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mapping = {
    "Jahangir Mahal": "images/orchha_palace_1790584024440.jpg",
    "Ahilya Fort": "images/ahilya_fort_1790584040980.jpg",
    "Mahodiya Village ('Phulera')": "images/mahodiya_village_1790584057022.jpg",
    "Panchayat": "images/panchayat_webseries_1790584073857.jpg",
    "Stree &amp; Stree 2": "images/stree_chanderi_1790584085377.jpg",
    "Bajirao Mastani": "images/bajirao_maheshwar_1790584098427.jpg",
    "Paan Singh Tomar": "images/paan_singh_chambal_1790584112021.jpg",
    "01 &bull; UNESCO": "images/khajuraho_temples_1790584135751.jpg",
    "02 &bull; UNTAMED": "images/kanha_tigers_1790584157232.jpg",
    "03 &bull; SACRED": "images/bhedaghat_gorge_1790584175223.jpg",
    "04 &bull; URBAN": "images/bhopal_lakeside_1790584190687.jpg",
    "05 &bull; AUTHENTIC": "images/mahodiya_village_1790584057022.jpg",
    "06 &bull; DRAMATIC": "images/satpura_roads_1790584203240.jpg"
};

// Also search for the plain text versions just in case
const plainMapping = {
    "Stree & Stree 2": "images/stree_chanderi_1790584085377.jpg",
    "01 • UNESCO": "images/khajuraho_temples_1790584135751.jpg",
    "02 • UNTAMED": "images/kanha_tigers_1790584157232.jpg",
    "03 • SACRED": "images/bhedaghat_gorge_1790584175223.jpg",
    "04 • URBAN": "images/bhopal_lakeside_1790584190687.jpg",
    "05 • AUTHENTIC": "images/mahodiya_village_1790584057022.jpg",
    "06 • DRAMATIC": "images/satpura_roads_1790584203240.jpg"
};

const fullMapping = { ...mapping, ...plainMapping };

for (const [title, imagePath] of Object.entries(fullMapping)) {
    const idx = html.indexOf(title);
    if (idx === -1) {
        console.log(`Could not find title in HTML: ${title}`);
        continue;
    }
    
    // Search backwards to find the nearest background-image declaration
    const urlStart = html.lastIndexOf("background-image: url('", idx);
    if (urlStart === -1) continue;
    
    const quoteStart = urlStart + 23; // length of "background-image: url('"
    const quoteEnd = html.indexOf("')", quoteStart);
    
    if (quoteEnd !== -1 && quoteEnd < idx) {
        const oldUrl = html.substring(quoteStart, quoteEnd);
        // Ensure we don't accidentally replace a global background or something way too far away
        if (idx - quoteEnd < 1500) {
            html = html.substring(0, quoteStart) + imagePath + html.substring(quoteEnd);
            console.log(`Replaced for ${title}`);
        } else {
            console.log(`Distance too far for ${title}: ${idx - quoteEnd} chars`);
        }
    }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done!');
