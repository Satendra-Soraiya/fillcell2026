const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newHeaderCSS = `
    /* =========================================
       SPECIFIC LIGHT MODE HEADER REFINEMENTS
       ========================================= */
       
    /* 1. Transparent Glass Top Header */
    [data-theme="light"] header#mainHeader {
        background: rgba(255, 255, 255, 0.45) !important;
        backdrop-filter: blur(18px) saturate(140%) !important;
        -webkit-backdrop-filter: blur(18px) saturate(140%) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.35) !important;
        box-shadow: none !important;
    }
    [data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.65) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.55) !important;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
    }

    /* Top row utilities clean-up */
    [data-theme="light"] header#mainHeader .bg-white\\/\\[0\\.03\\] {
        background-color: rgba(255, 255, 255, 0.3) !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
        color: #101827 !important;
    }
    [data-theme="light"] header#mainHeader .bg-white\\/\\[0\\.03\\]:hover {
        background-color: rgba(255, 255, 255, 0.5) !important;
    }
    
    /* 2. Glass Navigation Pill */
    [data-theme="light"] header#mainHeader .border-t.border-white\\/\\[0\\.05\\] {
        border-top: none !important;
        padding-top: 4px !important;
        padding-bottom: 12px !important;
        display: flex !important;
        justify-content: center !important;
    }
    [data-theme="light"] header#mainHeader nav {
        background: rgba(255, 255, 255, 0.55) !important;
        backdrop-filter: blur(22px) saturate(160%) !important;
        -webkit-backdrop-filter: blur(22px) saturate(160%) !important;
        border: 1px solid rgba(255, 255, 255, 0.65) !important;
        box-shadow: 0 8px 30px rgba(20, 30, 45, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7) !important;
        border-radius: 9999px !important; /* Full pill shape */
        padding: 6px 12px !important;
        width: fit-content !important;
        margin: 0 auto !important;
        display: flex !important;
        justify-content: center !important;
        gap: 6px !important;
    }

    /* Navigation Links (Inactive) */
    [data-theme="light"] header#mainHeader nav a {
        background-color: transparent !important;
        border-color: transparent !important;
        box-shadow: none !important;
        color: #263246 !important;
        font-weight: 600 !important;
        transition: all 0.2s ease !important;
        padding: 6px 14px !important;
        border-radius: 9999px !important;
        -webkit-text-fill-color: initial !important; /* Remove gold glow if any */
    }
    [data-theme="light"] header#mainHeader nav a:hover {
        background-color: rgba(255, 255, 255, 0.4) !important;
        color: #F58220 !important;
    }

    /* Navigation Link (Active - Home) */
    [data-theme="light"] header#mainHeader nav a[href="#home"] {
        background: rgba(255, 255, 255, 0.65) !important;
        border: 1px solid rgba(245, 150, 20, 0.35) !important;
        box-shadow: 0 3px 10px rgba(0,0,0,0.06) !important;
        color: #E86F00 !important;
    }

    /* Text Color Resets */
    [data-theme="light"] header#mainHeader .text-white {
        color: #101827 !important;
    }
    [data-theme="light"] header#mainHeader .text-slate-300,
    [data-theme="light"] header#mainHeader .text-slate-400 {
        color: #64748B !important;
    }
    [data-theme="light"] header#mainHeader .text-amber-400 {
        color: #F58220 !important;
    }
    
    /* Apply CTA overriding in Light Mode */
    [data-theme="light"] header#mainHeader .bg-gradient-to-r.from-amber-500 {
        background: linear-gradient(135deg, #FF9A00, #F16A00) !important;
        color: #FFFFFF !important;
        box-shadow: 0 8px 20px rgba(241, 106, 0, 0.25) !important;
        border-color: transparent !important;
    }
`;

// Insert the new CSS before </style>
if (html.includes('</style>')) {
    html = html.replace('</style>', newHeaderCSS + '\n</style>');
    
    // Also remove the old conflicting header rules we added previously in theme_refactor.js
    html = html.replace('[data-theme="light"] header.header-scrolled {\n         background: rgba(255,253,248,0.88) !important;\n         border-bottom-color: #E6DFD2 !important;\n    }', '');
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Header refinements applied successfully.");
} else {
    console.log("Error: CSS overrides block not found.");
}
