const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the initial theme loading logic
const oldInit = `    // Theme Manager
    (function() {
      const savedTheme = localStorage.getItem('filmcell-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
    })();`;

const newInit = `    // Theme Manager
    (function() {
      const savedTheme = localStorage.getItem('filmcell-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      document.addEventListener('DOMContentLoaded', () => {
          const icon = document.getElementById('themeToggleIcon');
          if(icon) {
            icon.innerText = savedTheme === 'light' ? 'dark_mode' : 'light_mode';
          }
          const logos = document.querySelectorAll('.brand-logo');
          logos.forEach(logo => {
             if(savedTheme === 'light') {
                logo.src = 'logo-light-backup.png';
             } else {
                logo.src = 'Logo_Dark1.png';
             }
          });
      });
    })();`;

html = html.replace(oldInit, newInit);

// 2. Fix the header-scrolled translucent background
const oldScrolled = `    [data-theme="light"] header#mainHeader.header-scrolled {
        background: rgba(255, 255, 255, 0.35) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.45) !important;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05) !important;
    }`;

const newScrolled = `    [data-theme="light"] header#mainHeader.header-scrolled {
        background: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        border-bottom: none !important;
        box-shadow: none !important;
    }`;

html = html.replace(oldScrolled, newScrolled);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed header scrolled state and initial logo load.');
