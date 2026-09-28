const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startStr = '/* 1. Explore 1,200+ Locations (Secondary CTA) */';
const endStr = '/* 3. Stat Bubbles (floating) */';

const startIdx = html.indexOf(startStr);
const endIdx = html.indexOf(endStr);

if (startIdx > -1 && endIdx > -1) {
    const newStyles = `/* 1. Explore 1,200+ Locations (Secondary CTA) & 2. National Film Award Winner (Badge) */
/* We maintain consistency for both elements */

/* Dark Mode (Default) - Ultra Premium Cyber Glass */
.hero-cta-glass, .hero-badge-glass {
    background: rgba(15, 23, 42, 0.35) !important;
    backdrop-filter: blur(24px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.25) !important;
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.05),
        0 8px 32px rgba(0, 0, 0, 0.3) !important;
    border-radius: 9999px !important; /* Pill shape for both */
    color: #F8FAFC !important;
    transition: all 0.3s ease !important;
}
.hero-cta-glass:hover, .hero-badge-glass:hover {
    background: rgba(255, 255, 255, 0.05) !important;
    border-color: rgba(245, 158, 11, 0.5) !important;
    box-shadow: 
        0 0 20px rgba(245, 158, 11, 0.2),
        0 8px 32px rgba(0, 0, 0, 0.3) !important;
}

/* Fix internal text colors for dark mode */
.hero-badge-glass span.text-white { color: #F8FAFC !important; }
.hero-badge-glass span.text-slate-400 { color: #94A3B8 !important; }

/* Light Mode - Frosted Daylight Glass */
[data-theme="light"] .hero-cta-glass, [data-theme="light"] .hero-badge-glass {
    background: rgba(255, 255, 255, 0.6) !important;
    backdrop-filter: blur(24px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
    border-top: 1px solid rgba(255, 255, 255, 1) !important;
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.8),
        0 8px 32px rgba(30, 41, 59, 0.1) !important;
    color: #0F172A !important;
}
[data-theme="light"] .hero-cta-glass:hover, [data-theme="light"] .hero-badge-glass:hover {
    background: rgba(255, 255, 255, 0.8) !important;
    border-color: rgba(245, 158, 11, 0.6) !important;
    box-shadow: 
        0 0 20px rgba(245, 158, 11, 0.15),
        0 8px 32px rgba(30, 41, 59, 0.1) !important;
}

/* Ensure the icon remains gold/orange */
.hero-cta-glass span.material-symbols-outlined, 
.hero-badge-glass span.material-symbols-outlined {
    color: #F58220 !important;
}

/* Fix internal text colors for light mode */
[data-theme="light"] .hero-badge-glass span.text-white { color: #0F172A !important; text-shadow: none !important; }
[data-theme="light"] .hero-badge-glass span.text-slate-400 { color: #475569 !important; text-shadow: none !important; }

`;
    html = html.substring(0, startIdx) + newStyles + html.substring(endIdx);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Replaced successfully!');
} else {
    console.log('Could not find start or end block.');
}
