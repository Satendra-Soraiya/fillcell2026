const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Swap the desktop navigation links
const navPolicy = '<a class="nav-pill-link" href="#policy">Film Policy 2025</a>';
const navFilms = '<a class="nav-pill-link" href="#films">Films Shot in MP</a>';
if (html.includes(navPolicy + '\n        ' + navFilms)) {
    html = html.replace(navPolicy + '\n        ' + navFilms, navFilms + '\n        ' + navPolicy);
} else {
    // Try a more generic replacement
    html = html.replace(/<a class="nav-pill-link" href="#policy">Film Policy 2025<\/a>\s*<a class="nav-pill-link" href="#films">Films Shot in MP<\/a>/, navFilms + '\n        ' + navPolicy);
}

// 2. Swap the mobile navigation links
const mobilePolicyRegex = /<a class="flex items-center gap-2[^>]*href="#policy">[\s\S]*?<\/a>/;
const mobileFilmsRegex = /<a class="flex items-center gap-2[^>]*href="#films">[\s\S]*?<\/a>/;

const mobilePolicyMatch = html.match(mobilePolicyRegex);
const mobileFilmsMatch = html.match(mobileFilmsRegex);

if (mobilePolicyMatch && mobileFilmsMatch) {
    const policyIndex = html.indexOf(mobilePolicyMatch[0]);
    const filmsIndex = html.indexOf(mobileFilmsMatch[0]);
    
    // Ensure they are strictly adjacent or near each other
    if (policyIndex < filmsIndex) {
        let beforePolicy = html.substring(0, policyIndex);
        let policyStr = mobilePolicyMatch[0];
        let between = html.substring(policyIndex + policyStr.length, filmsIndex);
        let filmsStr = mobileFilmsMatch[0];
        let afterFilms = html.substring(filmsIndex + filmsStr.length);
        
        html = beforePolicy + filmsStr + between + policyStr + afterFilms;
    }
}

// 3. Swap the actual sections
// We need to carefully find the start and end of <section id="policy"> and <section id="films">
function getTagContent(htmlStr, startStr, tagName) {
    let startIndex = htmlStr.indexOf(startStr);
    if (startIndex === -1) return null;
    
    let currentIndex = startIndex;
    let openTags = 0;
    let foundStart = false;
    
    while (currentIndex < htmlStr.length) {
        if (htmlStr.substring(currentIndex, currentIndex + ('<' + tagName).length) === '<' + tagName) {
            openTags++;
            foundStart = true;
        } else if (htmlStr.substring(currentIndex, currentIndex + ('</' + tagName + '>').length) === '</' + tagName + '>') {
            openTags--;
        }
        
        currentIndex++;
        
        if (foundStart && openTags === 0) {
            return {
                start: startIndex,
                end: currentIndex - 1 + ('</' + tagName + '>').length,
                content: htmlStr.substring(startIndex, currentIndex - 1 + ('</' + tagName + '>').length)
            };
        }
    }
    return null;
}

const policySection = getTagContent(html, '<section id="policy"', 'section');
const filmsSection = getTagContent(html, '<section id="films"', 'section');

if (policySection && filmsSection && policySection.start < filmsSection.start) {
    let beforePolicy = html.substring(0, policySection.start);
    let between = html.substring(policySection.end, filmsSection.start);
    let afterFilms = html.substring(filmsSection.end);
    
    html = beforePolicy + filmsSection.content + between + policySection.content + afterFilms;
    console.log('Successfully swapped the DOM sections.');
} else {
    console.log('Could not properly locate sections to swap.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Finished swapping navigation links and sections.');
