const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchBarFixesCSS = `
    /* =========================================
       SEARCH BAR UI FIX (LIGHT MODE)
       ========================================= */
    /* Make the nested search input seamless without an ugly double border */
    [data-theme="light"] section#locations div.bg-\\[\\#09090d\\] {
        background-color: rgba(0, 0, 0, 0.03) !important; /* Soft inner pill fill */
        border-color: transparent !important; /* Remove nested box border */
        box-shadow: inset 0 1px 3px rgba(0,0,0,0.02) !important; /* Subtle inner shadow */
    }
    
    /* Make the dropdown select look like a premium button */
    [data-theme="light"] section#locations select.bg-\\[\\#09090d\\] {
        background-color: #FFFFFF !important;
        border-color: rgba(0, 0, 0, 0.1) !important; /* Soft distinct border */
        box-shadow: 0 1px 3px rgba(0,0,0,0.03) !important;
        color: #0F172A !important;
        font-weight: 600 !important;
    }

    /* Fix icons and labels contrast */
    [data-theme="light"] section#locations .text-amber-400 {
        color: #F58220 !important; /* Primary Orange for Search icon */
    }
    [data-theme="light"] section#locations .text-slate-400 {
        color: #64748B !important; /* Darker slate for DISTRICT label */
    }
    [data-theme="light"] section#locations input::placeholder {
        color: #94A3B8 !important; /* Cleaner placeholder color */
        font-weight: 500 !important;
    }
`;

if (html.includes('</style>')) {
    html = html.replace('</style>', searchBarFixesCSS + '\n</style>');
} else {
    html += '<style>' + searchBarFixesCSS + '</style>';
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed search bar UI in light mode.');
