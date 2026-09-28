const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const refineCSS = `
    /* =========================================
       SPECIFIC LIGHT MODE REFINEMENTS
       ========================================= */
       
    /* 1. Quick Access Action Cards */
    [data-theme="light"] section#quick-access .bg-\\[\\#12121a\\]\\/95 {
        background-color: #EEE6D9 !important;
        border-color: #DED3C3 !important;
        backdrop-filter: none !important;
    }
    [data-theme="light"] section#quick-access .bg-\\[\\#171722\\] {
        background-color: #FFFDF8 !important;
        border-color: #E5DBCD !important;
        box-shadow: 0 8px 30px rgba(50,40,20,0.06) !important;
    }
    [data-theme="light"] section#quick-access .hover\\:bg-\\[\\#1d1d2b\\]:hover {
        background-color: #F8F1E5 !important;
        border-color: var(--theme-brand-orange) !important;
    }
    [data-theme="light"] section#quick-access .bg-\\[\\#0c0c12\\] {
        background-color: #FAF7F0 !important;
        border-color: #D9D0C2 !important;
        color: #111827 !important;
    }
    [data-theme="light"] section#quick-access input::placeholder {
        color: #64748B !important;
    }
    [data-theme="light"] section#quick-access .text-white {
        color: #111827 !important;
    }
    [data-theme="light"] section#quick-access .text-slate-400 {
        color: #64748B !important;
    }
    [data-theme="light"] section#quick-access .bg-amber-500\\/10 {
        background-color: #FFF1DD !important;
        border-color: #F4B36A !important;
    }

    /* 2. Why MP - Single Window Badge */
    [data-theme="light"] section#why-mp .bg-\\[\\#14141e\\] {
        background-color: #FFFDF8 !important;
        border-color: #E2D9CB !important;
        box-shadow: 0 12px 35px rgba(60, 45, 20, 0.07) !important;
    }
    [data-theme="light"] section#why-mp .bg-\\[\\#14141e\\] .text-white {
        color: #111827 !important;
    }
    [data-theme="light"] section#why-mp .bg-\\[\\#14141e\\] .text-slate-400 {
        color: #718096 !important;
    }

    /* 3 & 4. Directory & Location Cards */
    [data-theme="light"] section#locations {
        background-color: #F8F5EE !important;
        border-color: #EAE4D9 !important;
    }
    [data-theme="light"] section#locations .bg-\\[\\#12121a\\] {
        background-color: #FFFDF8 !important;
        border-color: #E2D9CB !important;
        box-shadow: 0 8px 30px rgba(50,40,20,0.06) !important;
    }
    [data-theme="light"] section#locations .bg-\\[\\#09090d\\] {
        background-color: #FAF7F0 !important;
        border-color: #D9D0C2 !important;
    }
    [data-theme="light"] section#locations input, 
    [data-theme="light"] section#locations select {
        background-color: transparent !important;
        color: #1F2937 !important;
    }
    [data-theme="light"] section#locations input::placeholder {
        color: #7A8491 !important;
    }
    [data-theme="light"] section#locations .text-white {
        color: #111827 !important;
    }
    [data-theme="light"] section#locations .text-slate-300 {
        color: #64748B !important;
    }
    [data-theme="light"] section#locations .text-slate-400 {
        color: #7A8491 !important;
    }
    [data-theme="light"] section#locations .text-\\[\\#D99A16\\] {
        color: #D97706 !important;
    }

    /* 5. Cell Members Section */
    [data-theme="light"] section#cell-members {
        background-color: #F1E9DC !important;
        border-top-color: #EAE4D9 !important;
    }
    [data-theme="light"] section#cell-members .bg-\\[\\#09090d\\] {
        background-color: #FFFDF8 !important;
        border-color: #E2D9CB !important;
    }
    [data-theme="light"] section#cell-members .bg-gradient-to-br.from-\\[\\#1c1810\\] {
        background: #FFFDF8 !important;
        border-color: #E3D8C8 !important;
        box-shadow: 0 12px 35px rgba(60, 45, 20, 0.07) !important;
    }
    [data-theme="light"] section#cell-members .bg-\\[\\#161622\\] {
        background-color: #FFFDF8 !important;
        border-color: #E3D8C8 !important;
        box-shadow: 0 12px 35px rgba(60, 45, 20, 0.07) !important;
    }
    [data-theme="light"] section#cell-members .text-white {
        color: #111827 !important;
    }
    [data-theme="light"] section#cell-members .text-slate-300,
    [data-theme="light"] section#cell-members .text-slate-400 {
        color: #64748B !important;
    }

    /* Additional global text overrides for light mode sections to ensure deep navy */
    [data-theme="light"] h2.text-white, 
    [data-theme="light"] h3.text-white {
        color: #111827 !important;
    }
    [data-theme="light"] p.text-slate-300, 
    [data-theme="light"] p.text-slate-400 {
        color: #64748B !important;
    }
</style>
`;

if (html.includes('/* OVERRIDES for Light Mode')) {
    html = html.replace('</style>', refineCSS);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("Refinements applied successfully.");
} else {
    console.log("Error: CSS overrides block not found.");
}
