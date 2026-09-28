const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find all <section> tags with an id and add 'scroll-mt-40' to their classes
// We will also remove scroll-padding-top from CSS to avoid conflicts

// 1. Add scroll-mt-40 to all sections
html = html.replace(/<section\s+class="([^"]*)"\s+id="([^"]+)">/g, function(match, classes, id) {
    if (!classes.includes('scroll-mt-')) {
        return `<section class="${classes} scroll-mt-40" id="${id}">`;
    }
    return match;
});

html = html.replace(/<section\s+id="([^"]+)"\s+class="([^"]*)">/g, function(match, id, classes) {
    if (!classes.includes('scroll-mt-')) {
        return `<section id="${id}" class="${classes} scroll-mt-40">`;
    }
    return match;
});


// 2. Remove the scroll-padding-top we added earlier just to be clean
html = html.replace('scroll-padding-top: 140px;', '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added scroll-mt-40 to all sections');
