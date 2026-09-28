const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace classes in HTML
html = html.replace('hero-glass-pill" href="#locations"', 'hero-cta-glass" href="#locations"');
html = html.replace('transition-all hero-glass-pill">\\n      <span class="material-symbols-outlined', 'transition-all hero-badge-glass">\\n      <span class="material-symbols-outlined');
// Also handle case where it's on the same line
html = html.replace('transition-all hero-glass-pill">\n      <span class="material-symbols-outlined', 'transition-all hero-badge-glass">\n      <span class="material-symbols-outlined');

// Build the robust new CSS
const newHeroGlassCSS = `
/* ==============================================
   HERO COMPONENTS: CTA & BADGE (LIQUID GLASS)
   ============================================== */

/* 1. Explore 1,200+ Locations (Secondary CTA) */
/* Dark Mode (Default) */
.hero-cta-glass {
    background: rgba(15, 23, 42, 0.45) !important; /* deep navy translucent */
    backdrop-filter: blur(20px) saturate(160%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.3) !important; /* subtle top highlight */
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.05),
        0 8px 30px rgba(0, 0, 0, 0.25) !important;
    border-radius: 9999px !important; /* compact horizontal pill */
    color: #F8FAFC !important; /* white/light text */
}
.hero-cta-glass:hover {
    background: rgba(30, 41, 59, 0.55) !important;
    border-color: rgba(245, 158, 11, 0.4) !important;
}

/* Light Mode */
[data-theme="light"] .hero-cta-glass {
    background: rgba(255, 255, 255, 0.35) !important; /* frosted daylight glass */
    backdrop-filter: blur(20px) saturate(160%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
    border: 1px solid rgba(255, 255, 255, 0.6) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.9) !important;
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.8),
        0 8px 30px rgba(20, 30, 40, 0.1) !important;
    color: #0F172A !important; /* dark navy text */
}
[data-theme="light"] .hero-cta-glass:hover {
    background: rgba(255, 255, 255, 0.5) !important;
}

/* Ensure the icon remains gold/orange */
.hero-cta-glass span.material-symbols-outlined {
    color: #F58220 !important;
}

/* 2. National Film Award Winner (Badge) */
/* Dark Mode (Default) */
.hero-badge-glass {
    background: rgba(2, 6, 23, 0.55) !important; /* deep navy/black translucent glass */
    backdrop-filter: blur(24px) saturate(140%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(140%) !important;
    border: 1px solid rgba(245, 158, 11, 0.25) !important; /* subtle gold border */
    border-top: 1px solid rgba(245, 158, 11, 0.4) !important;
    box-shadow: 
        inset 0 1px 2px rgba(245, 158, 11, 0.1),
        0 12px 35px rgba(0, 0, 0, 0.3) !important;
    border-radius: 16px !important; /* Elegant card shape */
}
.hero-badge-glass span.text-white {
    color: #F8FAFC !important; /* white/gold heading */
}
.hero-badge-glass span.text-slate-400 {
    color: #94A3B8 !important; /* muted light subtitle */
}

/* Light Mode */
[data-theme="light"] .hero-badge-glass {
    background: rgba(255, 253, 248, 0.65) !important; /* translucent warm-white/cream glass */
    backdrop-filter: blur(24px) saturate(140%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(140%) !important;
    border: 1px solid rgba(245, 158, 11, 0.3) !important; /* thin warm-gold translucent border */
    border-top: 1px solid rgba(255, 255, 255, 0.9) !important; /* slight inner highlight */
    box-shadow: 
        inset 0 1px 1px rgba(255, 255, 255, 0.8),
        0 10px 40px rgba(245, 158, 11, 0.15) !important; /* subtle gold tint shadow */
}
[data-theme="light"] .hero-badge-glass span.text-white {
    color: #0F172A !important; /* dark navy heading */
    text-shadow: none !important;
}
[data-theme="light"] .hero-badge-glass span.text-slate-400 {
    color: #475569 !important; /* muted slate subtitle */
    text-shadow: none !important;
}

/* Gold icon overrides for both modes */
.hero-badge-glass span.material-symbols-outlined {
    color: #D97706 !important; 
}
`;

// Remove the old `.hero-glass-pill` CSS block so it doesn't conflict
html = html.replace(/\/\* Apply same Liquid Glass to Hero Components \*\/[\s\S]*?\.hero-glass-pill \.text-slate-300\s*\{[^}]+\}/g, '');

if (html.includes('</style>')) {
    html = html.replace('</style>', newHeroGlassCSS + '\n</style>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Restyled CTA and Award Badge to distinct premium glass designs.');
