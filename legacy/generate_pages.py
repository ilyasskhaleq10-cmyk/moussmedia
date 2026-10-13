import os
import re

def update_file(filename, title, desc, h1_html, content_html):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update Title
    content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', content)
    # 2. Update Meta Description
    content = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{desc}">', content)
    # 3. Update Canonical
    content = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="https://moussmedia.com/{filename}">', content)
    
    # 4. Replace body content between hero and footer
    start_tag = '    <section class="hero" id="inicio">'
    end_tag = '  <footer class="site-footer">'
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag)
    
    if start_idx != -1 and end_idx != -1:
        new_body = f"""
  <main style="padding-top: 140px; padding-bottom: 80px;">
    <div class="wrap">
      <div class="kicker"><span class="num">01</span> Servicio Especializado</div>
      {h1_html}
      {content_html}
    </div>
  </main>
"""
        content = content[:start_idx] + new_body + content[end_idx:]
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)


# --- DISENO WEB ---
update_file(
    "diseno-web-tarragona.html", 
    "Diseño Web en Tarragona y Castelló | Moussmedia",
    "Agencia de diseño web en Tarragona. Creamos páginas web rápidas, a medida y optimizadas para SEO que convierten visitas en clientes.",
    "<h1>Diseño web a medida para negocios en <em>Tarragona</em></h1>",
    """
    <div style="max-width: 720px; font-size: 1.1rem; color: var(--muted); margin-top: 20px;">
        <p>Tu página web es tu escaparate abierto 24/7. No sirve de nada que sea bonita si carga lento o si Google no la entiende.</p>
        <p>En Moussmedia desarrollamos <strong>webs corporativas, landing pages y tiendas online</strong> centradas en el rendimiento y la conversión.</p>
        
        <h3 style="color: var(--ink); margin-top: 40px; font-size:1.5rem;">Nuestro proceso:</h3>
        <ul style="margin-top: 20px; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Análisis estratégico:</strong> Estudiamos tu competencia en Tarragona y Castelló.</li>
            <li style="margin-bottom: 10px;"><strong>Diseño UI/UX:</strong> Creamos interfaces atractivas que guían al usuario hacia la compra.</li>
            <li style="margin-bottom: 10px;"><strong>Desarrollo técnico:</strong> Código limpio, rápido y adaptado 100% a móviles.</li>
            <li style="margin-bottom: 10px;"><strong>SEO On-Page:</strong> Entregamos la web lista para gustarle a Google.</li>
        </ul>
        
        <div style="margin-top: 50px;">
            <a href="index.html#contacto" class="btn btn-solid">Solicitar presupuesto sin compromiso</a>
        </div>
    </div>
    """
)

# --- SEO LOCAL ---
update_file(
    "seo-local.html", 
    "Agencia de SEO Local en Tarragona | Moussmedia",
    "Servicios de SEO Local en Tarragona. Posicionamos tu negocio en Google Maps para que los clientes de tu zona te encuentren el primero.",
    "<h1>Posicionamiento SEO Local en <em>Tarragona</em></h1>",
    """
    <div style="max-width: 720px; font-size: 1.1rem; color: var(--muted); margin-top: 20px;">
        <p>¿De qué sirve tener el mejor servicio si cuando alguien busca en Google Maps acaba llamando a tu competencia?</p>
        <p>El <strong>SEO Local</strong> es la estrategia más rentable para clínicas, restaurantes, talleres y oficinas que atienden a clientes físicos.</p>
        
        <h3 style="color: var(--ink); margin-top: 40px; font-size:1.5rem;">¿Qué conseguimos?</h3>
        <ul style="margin-top: 20px; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Dominar Google Maps:</strong> Te posicionamos en el famoso "Local Pack" (los 3 primeros del mapa).</li>
            <li style="margin-bottom: 10px;"><strong>Optimización de Google Business:</strong> Gestionamos tus reseñas, fotos y publicaciones.</li>
            <li style="margin-bottom: 10px;"><strong>Citas locales (NAP):</strong> Te damos de alta en directorios clave de la provincia de Tarragona y Castelló.</li>
        </ul>
        
        <div style="margin-top: 50px;">
            <a href="index.html#contacto" class="btn btn-solid">Empieza a captar más clientes</a>
        </div>
    </div>
    """
)

# --- REDES SOCIALES ---
update_file(
    "redes-sociales.html", 
    "Gestión de Redes Sociales en Tarragona | Moussmedia",
    "Gestión profesional de Instagram, Facebook y TikTok. Creamos contenido que conecta y lanza campañas de Ads rentables en Tarragona.",
    "<h1>Gestión de Redes Sociales y <em>Publicidad Online</em></h1>",
    """
    <div style="max-width: 720px; font-size: 1.1rem; color: var(--muted); margin-top: 20px;">
        <p>Las redes sociales no son solo para subir fotos bonitas, son el canal directo para hablar con tus futuros clientes.</p>
        <p>Delegando tus redes sociales en Moussmedia ganarás tiempo y proyectarás una imagen profesional e impecable.</p>
        
        <h3 style="color: var(--ink); margin-top: 40px; font-size:1.5rem;">Nuestros planes incluyen:</h3>
        <ul style="margin-top: 20px; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Estrategia de contenidos:</strong> Planificamos qué publicar y cuándo.</li>
            <li style="margin-bottom: 10px;"><strong>Diseño de creatividades:</strong> Imágenes, vídeos y Reels de alta calidad.</li>
            <li style="margin-bottom: 10px;"><strong>Publicidad Online (Ads):</strong> Campañas segmentadas en Meta Ads y Google Ads para maximizar tu retorno de inversión en Terres de l'Ebre y Castelló.</li>
        </ul>
        
        <div style="margin-top: 50px;">
            <a href="index.html#contacto" class="btn btn-solid">Hablemos de tu estrategia</a>
        </div>
    </div>
    """
)

# --- PROYECTOS ---
update_file(
    "proyectos.html", 
    "Nuestro Portfolio de Proyectos | Moussmedia",
    "Descubre los proyectos, páginas web y campañas que hemos desarrollado para clientes en Tarragona y Castelló.",
    "<h1>Casos de éxito y <em>Proyectos</em></h1>",
    """
    <div style="margin-top: 40px;">
        <p style="font-size: 1.1rem; color: var(--muted); max-width: 600px; margin-bottom:40px;">Nos enorgullece el trabajo que hacemos para impulsar el crecimiento de negocios reales. Aquí tienes una selección de nuestros últimos lanzamientos.</p>
        
        <div class="projects-grid">
          <a href="#" class="project reveal d1 in">
            <div class="thumb">
              <div class="ph ph-1"><svg viewBox="0 0 100 100"><use href="#mark"></use></svg></div>
              <img src="bistro-street-logo.jpg" class="ph" alt="Bistro Street Project">
            </div>
            <div class="meta"><strong class="h-title" style="display:block; font-size:1.1rem; margin-bottom:0.25rem;">Bistro Street</strong><span>Sistema de Pedidos / TPV</span></div>
          </a>
          <a href="#" class="project reveal d2 in">
            <div class="thumb">
              <div class="ph ph-2 ph-dark"><svg viewBox="0 0 100 100"><use href="#mark"></use></svg></div>
            </div>
            <div class="meta"><strong class="h-title" style="display:block; font-size:1.1rem; margin-bottom:0.25rem;">Global Tortosa</strong><span>Renovación Web Integral</span></div>
          </a>
          <a href="#" class="project reveal d3 in">
            <div class="thumb">
              <div class="ph ph-3"><svg viewBox="0 0 100 100"><use href="#mark"></use></svg></div>
            </div>
            <div class="meta"><strong class="h-title" style="display:block; font-size:1.1rem; margin-bottom:0.25rem;">Keeva</strong><span>Diseño Web Corporativo</span></div>
          </a>
        </div>
        
        <div style="margin-top: 80px; padding-top:40px; border-top:1px solid var(--line); text-align:center;">
            <h2 style="font-size:2rem; margin-bottom:20px;">¿Preparado para ser el siguiente?</h2>
            <a href="index.html#contacto" class="btn btn-solid">Trabaja con nosotros</a>
        </div>
    </div>
    """
)

print("Páginas generadas con éxito.")
