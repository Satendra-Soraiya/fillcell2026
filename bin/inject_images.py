import shutil
import re

# Paths of the generated images
images = {
    "Jahangir Mahal & Orchha": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\orchha_palace_1790584024440.jpg",
    "Ahilya Fort & Narmada Ghats": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\ahilya_fort_1790584040980.jpg",
    "Mahodiya Village ('Phulera')": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\mahodiya_village_1790584057022.jpg",
    
    ">Panchayat<": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\panchayat_webseries_1790584073857.jpg",
    "Stree & Stree 2": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\stree_chanderi_1790584085377.jpg",
    "Bajirao Mastani": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\bajirao_maheshwar_1790584098427.jpg",
    "Paan Singh Tomar": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\paan_singh_chambal_1790584112021.jpg",
    
    "01 &bull; UNESCO & FORTRESSES": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\khajuraho_temples_1790584135751.jpg",
    "02 &bull; UNTAMED BIOSPHERES": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\kanha_tigers_1790584157232.jpg",
    "03 &bull; SACRED WATERWAYS": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\bhedaghat_gorge_1790584175223.jpg",
    "04 &bull; URBAN & HERITAGE MIX": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\bhopal_lakeside_1790584190687.jpg",
    "05 &bull; AUTHENTIC HINTERLAND": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\mahodiya_village_1790584057022.jpg",
    "06 &bull; DRAMATIC TOPOGRAPHY": r"C:\Users\26082563\.gemini\antigravity-ide\brain\a5328b3a-6ac5-4059-bca9-e926b9ea06fa\satpura_roads_1790584203240.jpg",
}

import os
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

for title, src_path in images.items():
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        continue
    
    filename = os.path.basename(src_path)
    # the target is images/filename
    dest_path = os.path.join("images", filename)
    shutil.copy2(src_path, dest_path)
    
    # Find the title in the HTML
    idx = html.find(title)
    if idx == -1:
        print(f"Title not found: {title}")
        continue
        
    # Search backwards from the title to find url('...')
    url_start_idx = html.rfind("url('", 0, idx)
    if url_start_idx == -1:
        print(f"URL not found for: {title}")
        continue
        
    url_end_idx = html.find("')", url_start_idx)
    
    if url_start_idx != -1 and url_end_idx != -1:
        # replace the old url with the new one
        old_url = html[url_start_idx+5:url_end_idx]
        new_url = "images/" + filename
        html = html[:url_start_idx+5] + new_url + html[url_end_idx:]
        print(f"Replaced {old_url[:30]}... with {new_url} for title {title}")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
    
print("Successfully replaced all images!")
