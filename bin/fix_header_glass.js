const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The new Light Mode Header CSS based on user instructions
const newHeaderCSS = `
    /* =========================================
       SPECIFIC LIGHT MODE HEADER REFINEMENTS
       ========================================= */
       
    /* 1. Transparent Glass Top Header */
    [data-theme="light"] header#mainHeader {
        background: rgba(255, 255, 255, 0.18) !important;
        backdrop-filter: blur(14px) saturate(130%) !important;
        -webkit-backdrop-filter: blur(14px) saturate(130%) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.22) !important;
        box-shadow: none !important;
    }
    [data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.35) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.45) !important;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
    }

    /* Clean up the inner utility containers for the top row so they don't block the background */
    [data-theme="light"] header#mainHeader .bg-white\\/\\[0\\.03\\] {
        background-color: rgba(255, 255, 255, 0.15) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
        color: #101827 !important;
    }
    [data-theme="light"] header#mainHeader .bg-white\\/\\[0\\.03\\]:hover {
        background-color: rgba(255, 255, 255, 0.25) !important;
    }
    
    /* 2. Glass Navigation Pill (Row 2) */
    [data-theme="light"] header#mainHeader .border-t.border-white\\/\\[0\\.05\\] {
        border-top: none !important;
        padding-top: 4px !important;
        padding-bottom: 12px !important;
        display: flex !important;
        justify-content: center !important;
    }
    [data-theme="light"] header#mainHeader nav {
        background: rgba(255, 255, 255, 0.30) !important;
        backdrop-filter: blur(20px) saturate(150%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(150%) !important;
        border: 1px solid rgba(255, 255, 255, 0.40) !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08) !important;
        border-radius: 9999px !important; /* Full pill shape */
        padding: 6px 10px !important;
        width: fit-content !important;
        margin: 0 auto !important;
        display: flex !important;
        justify-content: center !important;
        gap: 2px !important;
    }

    /* Navigation Links (Inactive) inside the glass pill */
    [data-theme="light"] header#mainHeader nav a {
        background-color: transparent !important;
        border-color: transparent !important;
        box-shadow: none !important;
        color: #101827 !important;
        font-weight: 600 !important;
        transition: all 0.2s ease !important;
        padding: 6px 14px !important;
        border-radius: 9999px !important;
        -webkit-text-fill-color: initial !important; /* Fix inherited gradient text */
    }
    [data-theme="light"] header#mainHeader nav a:hover {
        background-color: rgba(255, 255, 255, 0.4) !important;
        color: #F58220 !important;
    }

    /* Navigation Link (Active - Home) inside the glass pill */
    [data-theme="light"] header#mainHeader nav a[href="#home"] {
        background: rgba(255, 255, 255, 0.45) !important;
        border: 1px solid rgba(245, 150, 20, 0.25) !important;
        box-shadow: 0 3px 10px rgba(0,0,0,0.06) !important;
        color: #E86F00 !important;
    }

    /* Typography overrides for header */
    [data-theme="light"] header#mainHeader .text-white {
        color: #101827 !important;
    }
    [data-theme="light"] header#mainHeader .text-slate-300,
    [data-theme="light"] header#mainHeader .text-slate-400 {
        color: #101827 !important;
    }
    [data-theme="light"] header#mainHeader .text-amber-400 {
        color: #F58220 !important;
    }
    
    /* Apply CTA Button */
    [data-theme="light"] header#mainHeader .bg-gradient-to-r.from-amber-500 {
        background: linear-gradient(135deg, #F58220, #E86F00) !important;
        color: #FFFFFF !important;
        box-shadow: 0 8px 20px rgba(245, 130, 32, 0.3) !important;
        border-color: transparent !important;
    }
`;

// Extract existing CSS to process it
let cssBlockStart = html.indexOf('/* =========================================');
let styleTagEnd = html.indexOf('</style>', cssBlockStart);

if (cssBlockStart !== -1 && styleTagEnd !== -1) {
    // 1. Replace the entire old Header Refinements block with the new one
    let beforeBlock = html.substring(0, cssBlockStart);
    let afterBlock = html.substring(styleTagEnd);
    
    // We want to keep the "SPECIFIC LIGHT MODE REFINEMENTS" from refine_light.js
    // but replace the header ones.
    // Let's just do targeted string replacements on the original injected script
    
    // Fix the Hero gradient override that was blocking the top of the image!
    const oldGradient = `[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/75 {
         background: linear-gradient(to right, rgba(255,255,255,0.94) 0%, rgba(255,250,240,0.55) 50%, rgba(255,255,255,0.08) 100%) !important;
    }`;
    const newGradient = `[data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/75 {
         background: linear-gradient(to top, rgba(248, 245, 238, 0.95) 0%, rgba(248, 245, 238, 0.4) 40%, transparent 100%) !important;
    }`;
    html = html.replace(oldGradient, newGradient);
    
    // Remove the old header CSS block injected by refine_header.js
    let headerBlockStart = html.indexOf('/* 1. Transparent Glass Top Header */');
    let headerBlockEnd = html.indexOf('/* 2. Why MP - Single Window Badge */');
    if (headerBlockEnd === -1) {
        // If not found, just replace until the end of style
        headerBlockEnd = html.indexOf('</style>');
    } else {
        // Step back to remove the previous lines
        let temp = html.substring(0, headerBlockEnd);
        headerBlockEnd = temp.lastIndexOf('/*') > headerBlockStart ? temp.lastIndexOf('/*') : headerBlockEnd;
    }
    
    if (headerBlockStart !== -1) {
        html = html.substring(0, headerBlockStart) + newHeaderCSS + '\n' + html.substring(headerBlockEnd);
    } else {
        html = html.replace('</style>', newHeaderCSS + '\n</style>');
    }

    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Fixed header glass effect and hero gradient.");
} else {
    console.log("Could not find style tags");
}
