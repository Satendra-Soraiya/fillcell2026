const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

function extractTagByRegex(htmlStr, id) {
    const regex = new RegExp('<section[^>]*id="' + id + '"[^>]*>');
    const match = regex.exec(htmlStr);
    if (!match) return null;
    
    let startIndex = match.index;
    let currentIndex = startIndex;
    let openTags = 0;
    let foundStart = false;
    
    while (currentIndex < htmlStr.length) {
        if (htmlStr.substring(currentIndex, currentIndex + 8) === '<section') {
            openTags++;
            foundStart = true;
        } else if (htmlStr.substring(currentIndex, currentIndex + 9) === '</section') {
            openTags--;
        }
        
        currentIndex++;
        
        if (foundStart && openTags === 0) {
            const endIndex = htmlStr.indexOf('>', currentIndex - 1) + 1;
            return {
                start: startIndex,
                end: endIndex,
                content: htmlStr.substring(startIndex, endIndex)
            };
        }
    }
    return null;
}

const filmsSection = extractTagByRegex(html, 'films');
const policySection = extractTagByRegex(html, 'policy');

if (filmsSection && policySection) {
    if (filmsSection.start < policySection.start) {
        // Films is before Policy. Swap them so Policy is before Films.
        let beforeFirst = html.substring(0, filmsSection.start);
        let between = html.substring(filmsSection.end, policySection.start);
        let afterSecond = html.substring(policySection.end);
        
        html = beforeFirst + policySection.content + between + filmsSection.content + afterSecond;
        console.log('Swapped DOM: Policy is now before Films.');
    } else {
        // Policy is before Films. Swap them so Films is before Policy.
        let beforeFirst = html.substring(0, policySection.start);
        let between = html.substring(policySection.end, filmsSection.start);
        let afterSecond = html.substring(filmsSection.end);
        
        html = beforeFirst + filmsSection.content + between + policySection.content + afterSecond;
        console.log('Swapped DOM: Films is now before Policy.');
    }
} else {
    console.log('Could not find both sections.');
}

// Ensure the Navigation order matches the DOM order (whichever we just changed it to)
const domFilmsBeforePolicy = html.indexOf('id="films"') < html.indexOf('id="policy"');

// Desktop Nav
const navRegex = /(<a class="nav-pill-link" href="#(films|policy)">[^<]+<\/a>)\s*(<a class="nav-pill-link" href="#(films|policy)">[^<]+<\/a>)/;
html = html.replace(navRegex, (match, link1, id1, link2, id2) => {
    if ((domFilmsBeforePolicy && id1 !== 'films') || (!domFilmsBeforePolicy && id1 !== 'policy')) {
        return link2 + '\n        ' + link1;
    }
    return match;
});

// Mobile Nav
const mobRegex = /(<a class="flex items-center gap-2[^>]*href="#(films|policy)">[\s\S]*?<\/a>)\s*(<a class="flex items-center gap-2[^>]*href="#(films|policy)">[\s\S]*?<\/a>)/;
html = html.replace(mobRegex, (match, link1, id1, link2, id2) => {
    if ((domFilmsBeforePolicy && id1 !== 'films') || (!domFilmsBeforePolicy && id1 !== 'policy')) {
        return link2 + '\n    ' + link1;
    }
    return match;
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Navigation links synchronized with new DOM order.');
