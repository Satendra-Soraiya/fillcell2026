const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Step 1: Inject the theme toggle logic and CSS variables
const toggleScript = `
  <script>
    // Theme Manager
    (function() {
      const savedTheme = localStorage.getItem('filmcell-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    })();

    function toggleTheme() {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('filmcell-theme', newTheme);
      
      // Update toggle icon
      const icon = document.getElementById('themeToggleIcon');
      if(icon) {
        icon.innerText = newTheme === 'light' ? 'dark_mode' : 'light_mode';
      }
      
      // Update Hero Image
      const heroImage = document.getElementById('heroBgImage');
      if(heroImage) {
        if(newTheme === 'light') {
           heroImage.src = 'ChatGPT Image Sep 28, 2026, 10_35_31 AM.png';
        } else {
           heroImage.src = 'ujjain fort.png';
        }
      }
      
      // Update Logo
      const logos = document.querySelectorAll('.brand-logo');
      logos.forEach(logo => {
         if(newTheme === 'light') {
            logo.src = 'logo-light-backup.png';
         } else {
            logo.src = 'Logo_Dark1.png';
         }
      });
    }
  </script>
</head>`;

html = html.replace('</head>', toggleScript);

// Step 2: Add theme CSS Variables
const cssVars = `
    :root, [data-theme="dark"] {
      --header-height: 124px;
      
      --theme-bg-primary: #09090d;
      --theme-bg-secondary: #0c0c12;
      --theme-surface: #12121a;
      
      --theme-text-primary: #f8fafc;
      --theme-text-secondary: #cbd5e1;
      --theme-text-muted: #94a3b8;
      
      --theme-brand-orange: #f59e0b;
      --theme-brand-orange-dark: #d97706;
      
      --theme-border: rgba(255,255,255,0.08);
      --theme-border-light: rgba(255,255,255,0.15);
      
      --theme-card-shadow: 0 0 0 rgba(0,0,0,0);
    }
    [data-theme="light"] {
      --theme-bg-primary: #F8F5EE;
      --theme-bg-secondary: #F1E9DC;
      --theme-surface: #FFFDF8;
      
      --theme-text-primary: #101827;
      --theme-text-secondary: #526174;
      --theme-text-muted: #7A8491;
      
      --theme-brand-orange: #F47A00;
      --theme-brand-orange-dark: #D85A00;
      
      --theme-border: #E3DDD2;
      --theme-border-light: #EAE4D9;
      
      --theme-card-shadow: 0 8px 30px rgba(50,40,20,0.06);
    }
    
    /* OVERRIDES for Light Mode to preserve exact original class names but change appearance */
    [data-theme="light"] .bg-\\[\\#09090d\\] { background-color: var(--theme-bg-primary) !important; }
    [data-theme="light"] .bg-\\[\\#12121a\\], 
    [data-theme="light"] .bg-\\[\\#171722\\], 
    [data-theme="light"] .bg-\\[\\#161622\\],
    [data-theme="light"] .bg-\\[\\#15151f\\] { 
        background-color: var(--theme-surface) !important; 
        border-color: var(--theme-border) !important;
        box-shadow: var(--theme-card-shadow) !important;
    }
    [data-theme="light"] .text-white, 
    [data-theme="light"] .text-slate-100, 
    [data-theme="light"] .text-slate-50 { color: var(--theme-text-primary) !important; }
    
    [data-theme="light"] .text-slate-200, 
    [data-theme="light"] .text-slate-300 { color: var(--theme-text-secondary) !important; }
    
    [data-theme="light"] .text-slate-400, 
    [data-theme="light"] .text-[#7A8491] { color: var(--theme-text-muted) !important; }
    
    [data-theme="light"] .border-white\\/10, 
    [data-theme="light"] .border-white\\/\\[0\\.05\\], 
    [data-theme="light"] .border-white\\/\\[0\\.06\\], 
    [data-theme="light"] .border-white\\/\\[0\\.08\\] { border-color: var(--theme-border) !important; }
    
    /* Hero specific overrides */
    [data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/75 {
         background: linear-gradient(to right, rgba(255,255,255,0.94) 0%, rgba(255,250,240,0.55) 50%, rgba(255,255,255,0.08) 100%) !important;
    }
    [data-theme="light"] .bg-gradient-to-t.from-\\[\\#09090d\\]\\/90 {
         background: linear-gradient(to top, var(--theme-bg-primary) 0%, rgba(248, 245, 238, 0.6) 50%, transparent 100%) !important;
    }
    
    [data-theme="light"] .gold-shimmer-text {
         background: none !important;
         -webkit-text-fill-color: var(--theme-brand-orange) !important;
         color: var(--theme-brand-orange) !important;
         text-shadow: none !important;
    }
    
    /* Header specific overrides */
    [data-theme="light"] header.header-scrolled {
         background: rgba(255,253,248,0.88) !important;
         border-bottom-color: #E6DFD2 !important;
    }
    [data-theme="light"] header .text-\\[11px\\].text-\\[\\#D99A16\\]\\/80 { color: var(--theme-text-secondary) !important; }
    
    /* Buttons */
    [data-theme="light"] .bg-gradient-to-r.from-amber-500 {
         background: linear-gradient(135deg, #FF9A00, #F16A00) !important;
         color: #FFFFFF !important;
    }
    [data-theme="light"] .bg-\\[\\#14141c\\]\\/80 {
         background: #FFFDF8 !important;
         border-color: #D9D1C3 !important;
         color: #172033 !important;
    }
    [data-theme="light"] .bg-\\[\\#14141c\\]\\/80:hover {
         background: #FFF2DF !important;
         border-color: #F4A340 !important;
    }
    [data-theme="light"] .bg-\\[\\#14141c\\]\\/70 {
         background: #FFFDF8 !important;
         border-color: #D9D1C3 !important;
    }
    [data-theme="light"] .bg-amber-500\\/20 {
         background: #FFF1DD !important;
         border-color: #F4B36A !important;
         color: #F47A00 !important;
         -webkit-text-fill-color: #F47A00 !important;
    }
    [data-theme="light"] .bg-\\[\\#FFFDF8\\] {
         background: transparent !important;
         border-color: transparent !important;
         color: #263246 !important;
    }
    
    /* Footer */
    [data-theme="light"] footer {
         background: #101827 !important;
    }
    [data-theme="light"] footer .text-white { color: #ffffff !important; }
    [data-theme="light"] footer .text-slate-400 { color: #7A8491 !important; }
    [data-theme="light"] footer .text-slate-200 { color: #cbd5e1 !important; }

    /* Theme Toggle Button */
    .theme-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--theme-text-secondary);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .theme-toggle-btn:hover {
      background: rgba(255,255,255,0.1);
      color: var(--theme-brand-orange);
    }
    [data-theme="light"] .theme-toggle-btn {
      background: rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.1);
      color: var(--theme-text-primary);
    }
  </style>`;

html = html.replace('</style>', cssVars);

// Step 3: Add the toggle button to the header
// We'll insert it right after the Language Toggle block
const languageToggleStr = `<!-- Language Toggle -->
        <div class="hidden sm:flex items-center border border-white/[0.06] rounded-lg p-0.5 bg-white/[0.03] text-[11px] font-medium">
          <span class="px-2 py-0.5 rounded-md bg-amber-500 text-black font-extrabold shadow-sm">EN</span>
          <button class="px-2 py-0.5 text-slate-500 hover:text-white transition-colors" type="button">हिन्दी</button>
        </div>`;

const themeToggleStr = `
        <!-- Theme Toggle -->
        <button onclick="toggleTheme()" class="theme-toggle-btn" aria-label="Toggle Theme">
          <span class="material-symbols-outlined" id="themeToggleIcon">light_mode</span>
        </button>
`;

if(html.includes(languageToggleStr)) {
    html = html.replace(languageToggleStr, languageToggleStr + themeToggleStr);
} else {
    // fallback if exact string isn't found
    const fallbackTarget = '<!-- Language Toggle -->';
    if(html.includes(fallbackTarget)) {
        html = html.replace(fallbackTarget, themeToggleStr + fallbackTarget);
    }
}

// Step 4: Ensure the logo image has the class 'brand-logo'
html = html.replace(/<img alt="Madhya Pradesh Film Facilitation Cell" class="([^"]*)"/g, '<img alt="Madhya Pradesh Film Facilitation Cell" class="$1 brand-logo"');

fs.writeFileSync('index.html', html, 'utf8');
console.log("Theme setup complete");
