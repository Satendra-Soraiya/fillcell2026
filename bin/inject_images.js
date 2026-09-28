const fs = require('fs');
const path = require('path');

const images = {
    "Jahangir Mahal & Orchha": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\orchha_palace_1790584024440.jpg",
    "Ahilya Fort & Narmada Ghats": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\ahilya_fort_1790584040980.jpg",
    "Mahodiya Village ('Phulera')": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\mahodiya_village_1790584057022.jpg",
    
    ">Panchayat<": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\panchayat_webseries_1790584073857.jpg",
    "Stree & Stree 2": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\stree_chanderi_1790584085377.jpg",
    "Bajirao Mastani": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\bajirao_maheshwar_1790584098427.jpg",
    "Paan Singh Tomar": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\paan_singh_chambal_1790584112021.jpg",
    
    "01 &bull; UNESCO & FORTRESSES": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\khajuraho_temples_1790584135751.jpg",
    "02 &bull; UNTAMED BIOSPHERES": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\kanha_tigers_1790584157232.jpg",
    "03 &bull; SACRED WATERWAYS": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\bhedaghat_gorge_1790584175223.jpg",
    "04 &bull; URBAN & HERITAGE MIX": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\bhopal_lakeside_1790584190687.jpg",
    "05 &bull; AUTHENTIC HINTERLAND": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\mahodiya_village_1790584057022.jpg",
    "06 &bull; DRAMATIC TOPOGRAPHY": "C:\\Users\\26082563\\.gemini\\antigravity-ide\\brain\\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\\satpura_roads_1790584203240.jpg"
};

let html = fs.readFileSync('index.html', 'utf8');

for (const [title, srcPath] of Object.entries(images)) {
    if (!fs.existsSync(srcPath)) {
        console.log(`File not found: ${srcPath}`);
        continue;
    }
    
    const filename = path.basename(srcPath);
    const destPath = path.join('images', filename);
    fs.copyFileSync(srcPath, destPath);
    
    const idx = html.indexOf(title);
    if (idx === -1) {
        console.log(`Title not found: ${title}`);
        continue;
    }
    
    const urlStartIdx = html.lastIndexOf("url('", idx);
    if (urlStartIdx === -1) {
        console.log(`URL not found for: ${title}`);
        continue;
    }
    
    const urlEndIdx = html.indexOf("')", urlStartIdx);
    if (urlStartIdx !== -1 && urlEndIdx !== -1) {
        const oldUrl = html.substring(urlStartIdx + 5, urlEndIdx);
        const newUrl = "images/" + filename;
        html = html.substring(0, urlStartIdx + 5) + newUrl + html.substring(urlEndIdx);
        console.log(`Replaced ${oldUrl.substring(0, 30)}... with ${newUrl} for title ${title}`);
    }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully replaced all images!');
