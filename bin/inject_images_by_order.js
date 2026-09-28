const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const imagesInOrder = [
    "images/khajuraho_temples_1790584135751.jpg",
    "images/kanha_tigers_1790584157232.jpg",
    "images/bhedaghat_gorge_1790584175223.jpg",
    "images/bhopal_lakeside_1790584190687.jpg",
    "images/mahodiya_village_1790584057022.jpg",
    "images/satpura_roads_1790584203240.jpg",
    "images/orchha_palace_1790584024440.jpg",
    "images/ahilya_fort_1790584040980.jpg",
    "images/mahodiya_village_1790584057022.jpg",
    "images/panchayat_webseries_1790584073857.jpg",
    "images/stree_chanderi_1790584085377.jpg",
    "images/bajirao_maheshwar_1790584098427.jpg",
    "images/paan_singh_chambal_1790584112021.jpg"
];

let count = 0;
// We only want to replace URLs that are either https://lh3.googleusercontent.com/aida-public/
// OR our previously injected images if we ran this script before.
// To do this reliably, we match `background-image: url('([^']+)')` and replace the inside.
html = html.replace(/background-image: url\('([^']+)'\)/g, (match, url) => {
    // Only replace if it's one of the target cards.
    // There are EXACTLY 13 cards with this structure that have aida-public or our images.
    // We skip any other random background images (like hero).
    if (url.includes('aida-public') || url.includes('images/')) {
        if (count < imagesInOrder.length) {
            const newUrl = imagesInOrder[count];
            console.log(`Replacing ${url.substring(0, 30)}... with ${newUrl}`);
            count++;
            return `background-image: url('${newUrl}')`;
        }
    }
    return match;
});

fs.writeFileSync('index.html', html, 'utf8');
console.log(`Replaced ${count} images.`);
