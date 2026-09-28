const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Target Header Height = 120px
// We want: scrollMargin + paddingTop = 120px
// scrollMargin = 120px - paddingTop

html = html.replace(/<section([^>]*)>/g, function(match, inner) {
    if (!inner.includes('id=')) return match; // skip sections without ID
    
    // Default padding top is 0
    let pt = 0;
    
    // Check for py- or pt- classes
    if (inner.includes('py-24') || inner.includes('pt-24')) pt = 96;
    else if (inner.includes('py-20') || inner.includes('pt-20')) pt = 80;
    else if (inner.includes('py-16') || inner.includes('pt-16')) pt = 64;
    else if (inner.includes('py-12') || inner.includes('pt-12')) pt = 48;
    else if (inner.includes('py-8') || inner.includes('pt-8')) pt = 32;
    
    // Calculate required scroll margin in pixels to make the total 120px
    let requiredMarginPx = 120 - pt;
    if (requiredMarginPx < 0) requiredMarginPx = 0;
    
    // Convert to tailwind spacing (1 unit = 4px)
    let scrollMtClass = `scroll-mt-${Math.round(requiredMarginPx / 4)}`;
    
    // Replace existing scroll-mt-* with the new one
    let newInner = inner.replace(/scroll-mt-\d+/g, scrollMtClass);
    
    // If it didn't have one, add it
    if (!newInner.includes('scroll-mt-')) {
        newInner = newInner.replace('class="', `class="${scrollMtClass} `);
    }
    
    return `<section${newInner}>`;
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Mathematically perfectly aligned scroll margins!');
