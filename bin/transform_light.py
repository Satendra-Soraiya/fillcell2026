import re

def transform():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Update Logo image
    html = re.sub(r'src="Logo_Dark1\.png"', 'src="logo-light-backup.png"', html)
    html = re.sub(r'src="logo\.png"', 'src="logo-light-backup.png"', html)

    # 2. Update Background Image in hero
    html = re.sub(r'src="ujjain_fort\.png"', 'src="ChatGPT Image Sep 28, 2026, 10_35_31 AM.png"', html)
    html = re.sub(r"this\.src='ujjain fort\.png'", "this.src='ChatGPT Image Sep 28, 2026, 10_35_31 AM.png'", html)
    html = re.sub(r'src="ujjain fort\.png"', 'src="ChatGPT Image Sep 28, 2026, 10_35_31 AM.png"', html)

    # 3. Update the Tailwind Config
    tailwind_config_replacement = """    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            primary: "#F47A00",
            "primary-hover": "#D85A00",
            "primary-wash": "rgba(244, 122, 0, 0.12)",
            secondary: "#D99A16",
            "secondary-hover": "#B37A00",
            "secondary-wash": "rgba(217, 154, 22, 0.12)",
            amber: { accent: "#F47A00" },
            tertiary: "#38bdf8",
            "border-crisp": "#EAE4D9",
            "border-muted": "#DDD6C8",
            "text-amber-400": "#F47A00",
            "text-orange-400": "#D85A00",
            "text-muted": "#7A8491",
            "surface-ground": "#F8F5EE",
            "surface-subtle": "#F1E9DC",
            ivory: "#F8F5EE",
            sandstone: "#F1E9DC",
            cream: "#FFFDF8",
            navy: "#101827",
            "slate-blue": "#526174"
          },
          fontFamily: {
            sans: ["Manrope", "Montserrat", "sans-serif"],
            serif: ["'Playfair Display'", "Georgia", "serif"]
          }
        }
      }
    }"""
    html = re.sub(r'tailwind\.config\s*=\s*\{.*?\n    \}', tailwind_config_replacement, html, flags=re.DOTALL)

    # 4. Inject CSS variables
    css_vars = """    :root {
      --header-height: 124px;
      --bg-primary: #F8F5EE;
      --bg-secondary: #F1E9DC;
      --surface: #FFFDF8;
      --text-primary: #101827;
      --text-secondary: #526174;
      --text-muted: #7A8491;
      --brand-orange: #F47A00;
      --brand-orange-dark: #D85A00;
      --heritage-gold: #D99A16;
      --champagne-gold: #F2C866;
      --border: #DDD6C8;
      --border-light: #EAE4D9;
      --success: #3F7D4C;
      --info: #467A9E;
      --footer: #101827;
      --shadow-soft: 0 8px 30px rgba(50,40,20,0.06);
      --shadow-elevated: 0 15px 45px rgba(30,25,15,0.10);
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 20px;
      --radius-xl: 28px;
    }"""
    html = re.sub(r':root\s*\{\s*--header-height:\s*124px;\s*\}', css_vars, html)

    # 5. Update the Base Styles
    html = re.sub(r'background-color:\s*#09090d;', 'background-color: var(--bg-primary, #F8F5EE);', html)
    html = re.sub(r'color:\s*#f1f5f9;', 'color: var(--text-primary, #101827);', html)
    html = re.sub(r'font-family:\s*\'Montserrat\',\s*sans-serif;', "font-family: 'Manrope', 'Montserrat', sans-serif;", html)
    
    # 6. Fix HTML body class
    html = html.replace('<html class="dark"', '<html')
    html = html.replace('bg-[#09090d]', 'bg-[#F8F5EE]')
    html = html.replace('text-slate-100', 'text-[#101827]')
    html = html.replace('selection:bg-amber-500/25', 'selection:bg-[#F47A00]/25')
    html = html.replace('selection:text-amber-300', 'selection:text-[#D85A00]')
    
    # Header styles
    html = html.replace('header.header-scrolled {\n      background: rgba(9, 9, 13, 0.90) !important;',
                        'header.header-scrolled {\n      background: rgba(255, 253, 248, 0.88) !important;')
    html = html.replace('border-bottom-color: rgba(255, 255, 255, 0.08) !important;',
                        'border-bottom-color: #E6DFD2 !important;')
    html = html.replace('box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6) !important;',
                        'box-shadow: var(--shadow-soft) !important;')

    # Hero Gradient
    html = html.replace('bg-gradient-to-t from-[#09090d]/75 via-transparent to-transparent',
                        'bg-gradient-to-r from-white/95 via-[#FFFAF0]/55 to-white/10')
    html = html.replace('bg-gradient-to-t from-[#09090d]/90 via-[#09090d]/40 to-transparent',
                        'bg-gradient-to-t from-[#F8F5EE]/95 via-[#F8F5EE]/60 to-transparent')

    # Card & sections backgrounds
    html = html.replace('bg-[#12121a]', 'bg-white shadow-[0_8px_30px_rgba(50,40,20,0.06)] border border-[#E3DDD2]')
    html = html.replace('bg-white/5', 'bg-white shadow-[0_8px_30px_rgba(50,40,20,0.06)] border border-[#E3DDD2]')
    html = html.replace('bg-white/[0.03]', 'bg-white shadow-sm border border-[#E3DDD2]')
    
    # Text colors
    html = html.replace('text-white', 'text-[#101827]')
    html = html.replace('text-slate-200', 'text-[#526174]')
    html = html.replace('text-slate-300', 'text-[#526174]')
    html = html.replace('text-slate-400', 'text-[#7A8491]')
    html = html.replace('text-amber-400', 'text-[#D99A16]')
    html = html.replace('text-amber-500', 'text-[#F47A00]')
    
    # Specific borders
    html = html.replace('border-white/10', 'border-[#DDD6C8]')
    html = html.replace('border-white/20', 'border-[#EAE4D9]')
    
    # Specific buttons
    html = html.replace('from-amber-500 via-orange-500 to-amber-600', 'from-[#FF9A00] to-[#F16A00]')
    html = html.replace('text-black', 'text-white')
    
    # Other backgrounds
    html = html.replace('bg-[#1a1a24]', 'bg-[#F1E9DC]')
    html = html.replace('bg-[#151522]', 'bg-[#FFFDF8]')

    # Ambient glow
    html = html.replace('bg-amber-500/15', 'bg-[#F2C866]/30')

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    transform()
