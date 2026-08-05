import os
import glob

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Schema addressLocality
    content = content.replace('"addressLocality": "La Sénia"', '"addressLocality": "Amposta"')
    
    # 2. Hero eyebrow (index.html)
    content = content.replace('Estudio de marketing digital — La Sénia', 'Estudio de marketing digital — Amposta')
    
    # 3. Legal address
    content = content.replace('43560 La Sénia', '43870 Amposta')
    
    # 4. Legal text in privacy
    content = content.replace('La Sénia (Tarragona)', 'Amposta (Tarragona)')
    
    # 5. Footer legal
    content = content.replace('La Sénia (Tarragona)</div>', 'Amposta (Tarragona)</div>')
    
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

print("Reemplazos realizados con éxito.")
