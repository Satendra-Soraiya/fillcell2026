const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    html = html.split('ChatGPT Image Sep 28, 2026, 10_35_31 AM.png').join('fort day bg image.png');
    html = html.split('ujjain_fort.png').join('fort night bg image .png');
    html = html.split('ujjain fort.png').join('fort night bg image .png');

    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Images updated successfully');
} catch (e) {
    console.error(e);
}
