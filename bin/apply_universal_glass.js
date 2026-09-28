const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix hero paragraph text (using [id="home"] to avoid section#home failure)
const fixHeroText = `
    /* Fix hero description text visibility */
    [data-theme="light"] [id="home"] p {
        color: #111827 !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5) !important;
    }
`;

// 2. Make the Liquid Glass Universal (Milky glass for BOTH themes) & Add hero-glass-pill CSS
const universalGlassCSS = `
    /* Universal Premium Liquid Glass (Matches Light Mode style for consistency) */
    header#mainHeader nav {
        background: rgba(255, 255, 255, 0.15) !important; 
        backdrop-filter: blur(28px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-top: 1px solid rgba(255, 255, 255, 0.7) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.8),
            inset 0 -10px 20px rgba(255, 255, 255, 0.1),
            0 12px 35px rgba(0, 0, 0, 0.15) !important;
    }
    header#mainHeader nav a {
        color: #1E293B !important; 
    }
    header#mainHeader nav a:hover {
        background: rgba(255, 255, 255, 0.5) !important; 
        color: #D97706 !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.03) !important;
    }
    header#mainHeader nav a.active-pill {
        background: rgba(245, 130, 32, 0.15) !important; 
        border: 1px solid rgba(245, 150, 20, 0.3) !important;
        border-top: 1px solid rgba(255, 255, 255, 0.7) !important;
        box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.6),
            0 4px 12px rgba(245, 130, 32, 0.1) !important;
        color: #D97706 !important;
    }

    /* Apply same Liquid Glass to Hero Components */
    .hero-glass-pill {
        background: rgba(255, 255, 255, 0.15) !important; 
        backdrop-filter: blur(28px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-top: 1px solid rgba(255, 255, 255, 0.7) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.8),
            inset 0 -10px 20px rgba(255, 255, 255, 0.1),
            0 12px 35px rgba(0, 0, 0, 0.15) !important;
        border-radius: 9999px !important;
        color: #1E293B !important;
    }
    .hero-glass-pill .text-white, .hero-glass-pill .text-slate-300 {
        color: #1E293B !important;
        font-weight: 700 !important;
    }
`;

// Remove the old [data-theme="light"] active state from nav CSS to let the universal active-pill work
html = html.replace(/\[data-theme="light"\] header#mainHeader nav a\[href="#home"\]\s*\{[^}]+\}/g, '');
html = html.replace(/html\[data-theme="dark"\].*?header#mainHeader nav a\[href="#home"\].*?\{[^}]+\}/gs, '');

if (html.includes('</style>')) {
    html = html.replace('</style>', fixHeroText + '\n' + universalGlassCSS + '\n</style>');
}

// 3. Update the Hero Component classes
const btnExplore = 'class="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#14141c]/80 hover:bg-[#1c1c28]/90 text-white border border-white/15 hover:border-amber-400/50 backdrop-blur-md shadow-lg transition-all group"';
const newBtnExplore = 'class="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-bold transition-all group hero-glass-pill"';
html = html.replace(btnExplore, newBtnExplore);

const btnAward = 'class="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#14141c]/70 border border-white/15 backdrop-blur-md shadow-lg"';
const newBtnAward = 'class="inline-flex items-center gap-3 px-4 py-2.5 transition-all hero-glass-pill"';
html = html.replace(btnAward, newBtnAward);

// 4. Inject ScrollSpy JS at the bottom
const scrollSpyJS = `
<script>
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('header#mainHeader nav a');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

    // Set initial active pill
    navLinks[0].classList.add('active-pill');

    const observer = new IntersectionObserver((entries) => {
        let activeSectionId = null;
        
        // Find the most visible section
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeSectionId = '#' + entry.target.id;
            }
        });

        if (activeSectionId) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === activeSectionId) {
                    link.classList.add('active-pill');
                } else {
                    link.classList.remove('active-pill');
                }
            });
        }
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 }); // Triggers when element is near top third of screen

    sections.forEach(section => observer.observe(section));
});
</script>
`;

if (html.includes('</body>')) {
    html = html.replace('</body>', scrollSpyJS + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Applied universal liquid glass, fixed hero text, and added scrollspy.');
