const fs = require('fs');
const path = require('path');

// ── Folders to create
['bin', 'resources'].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d); });

// ── IMAGE FILES → resources/
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
const rootImages = fs.readdirSync('.').filter(f => {
    const stat = fs.statSync(f);
    return stat.isFile() && imageExtensions.includes(path.extname(f).toLowerCase());
});

rootImages.forEach(f => {
    fs.renameSync(f, path.join('resources', f));
    console.log(`resources/ ← ${f}`);
});

// Move everything inside images/ to resources/ and delete images/ folder
if (fs.existsSync('images')) {
    const imgFiles = fs.readdirSync('images');
    imgFiles.forEach(f => {
        fs.renameSync(path.join('images', f), path.join('resources', f));
        console.log(`resources/ ← images/${f}`);
    });
    fs.rmdirSync('images');
    console.log('Removed empty images/ folder');
}

// ── ORPHAN / SCRIPT FILES → bin/
const keepInRoot = new Set([
    'index.html',
    'server.js',
    'bin',
    'resources',
    '.git',
]);
const orphanExts = ['.js', '.py', '.txt', '.html'];

fs.readdirSync('.').forEach(f => {
    if (keepInRoot.has(f)) return;
    const stat = fs.statSync(f);
    if (stat.isDirectory()) {
        // move whole directories (stitch_... backup folder)
        if (!['bin', 'resources', '.git'].includes(f)) {
            fs.renameSync(f, path.join('bin', f));
            console.log(`bin/ ← ${f}/`);
        }
        return;
    }
    const ext = path.extname(f).toLowerCase();
    if (orphanExts.includes(ext) && f !== 'index.html' && f !== 'server.js') {
        fs.renameSync(f, path.join('bin', f));
        console.log(`bin/ ← ${f}`);
    }
});

// ── UPDATE index.html: fix image src references
let html = fs.readFileSync('index.html', 'utf8');

// Collect all moved images
const movedImages = fs.readdirSync('resources');

movedImages.forEach(img => {
    // Replace bare filename references (with or without old images/ prefix)
    const escapedName = img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html
        .replace(new RegExp(`(?<!\\/)(images\\/${escapedName})`, 'g'), `resources/${img}`)
        .replace(new RegExp(`(?<!resources\\/|images\\/)(['"])(${escapedName})(['"])`, 'g'), `$1resources/${img}$3`);
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('\nindex.html updated with new resources/ paths.');
console.log('\nDone!');
