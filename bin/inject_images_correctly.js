const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// We need to carefully replace the URLs. Let's find the titles first.
const replacements = [
    { title: "Jahangir Mahal &amp; Orchha", file: "orchha_palace_1790584024440.jpg" },
    { title: "Ahilya Fort &amp; Narmada Ghats", file: "ahilya_fort_1790584040980.jpg" },
    { title: "Mahodiya Village ('Phulera')", file: "mahodiya_village_1790584057022.jpg" },
    { title: "Panchayat", file: "panchayat_webseries_1790584073857.jpg" },
    { title: "Stree &amp; Stree 2", file: "stree_chanderi_1790584085377.jpg" },
    { title: "Bajirao Mastani", file: "bajirao_maheshwar_1790584098427.jpg" },
    { title: "Paan Singh Tomar", file: "paan_singh_chambal_1790584112021.jpg" },
    { title: "01 &bull; UNESCO", file: "khajuraho_temples_1790584135751.jpg" },
    { title: "02 &bull; UNTAMED", file: "kanha_tigers_1790584157232.jpg" },
    { title: "03 &bull; SACRED", file: "bhedaghat_gorge_1790584175223.jpg" },
    { title: "04 &bull; URBAN", file: "bhopal_lakeside_1790584190687.jpg" },
    { title: "05 &bull; AUTHENTIC", file: "mahodiya_village_1790584057022.jpg" },
    { title: "06 &bull; DRAMATIC", file: "satpura_roads_1790584203240.jpg" }
];

// Re-read because previous script messed up some URLs (replaced them wrongly).
// Let's actually restore index.html from git or just fix it.
// Wait, the previous script replaced some URLs with "images/..." correctly and some wrongly.
// Let's just fix it by searching for the title, then searching backwards for 'background-image: url('
