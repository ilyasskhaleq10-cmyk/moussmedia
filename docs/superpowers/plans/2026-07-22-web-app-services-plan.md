# Web App Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrar la nueva sección de Desarrollo Web & Apps en la landing page de Moussmedia y actualizar la navegación y el formulario de contacto.

**Architecture:** Modificaremos únicamente el archivo `index.html` estático, inyectando la nueva sección `#desarrollo` con clases CSS consistentes con el diseño actual, actualizando los enlaces de navegación y las opciones del `<select>`.

**Tech Stack:** HTML5, CSS Nativo (Vanilla).

## Global Constraints

Mantener exactamente las mismas variables CSS (`--paper`, `--ink`, `--bronze`, `--line`), tipografías (`Fraunces` e `Inter`) y la animación mediante clases `.reveal`.

---

### Task 1: Actualizar la Navegación y Formulario

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: N/A
- Produces: Enlaces operativos para `#desarrollo` y nuevas opciones en el `<select>` del formulario.

- [ ] **Step 1: Añadir enlace "Desarrollo" en el header desktop**

Modificar la sección `<nav class="nav-links"...>` para insertar `<a href="#desarrollo">Desarrollo</a>` después de `<a href="#servicios">Servicios</a>`.

```html
<nav class="nav-links" aria-label="Navegación principal">
  <a href="#sobre">Estudio</a>
  <a href="#servicios">Servicios</a>
  <a href="#desarrollo">Desarrollo</a>
  <a href="#proyectos">Proyectos</a>
  <a href="#faq">FAQ</a>
  <a href="#contacto" class="btn btn-solid">Solicitar presupuesto</a>
</nav>
```

- [ ] **Step 2: Actualizar menú móvil**

Modificar `<div class="mobile-menu" id="mobileMenu">` para añadir Desarrollo y reordenar los números:

```html
<div class="mobile-menu" id="mobileMenu">
  <a href="#sobre"><span>Estudio</span><small>01</small></a>
  <a href="#servicios"><span>Servicios</span><small>02</small></a>
  <a href="#desarrollo"><span>Desarrollo</span><small>03</small></a>
  <a href="#ventajas"><span>Ventajas</span><small>04</small></a>
  <a href="#proyectos"><span>Proyectos</span><small>05</small></a>
  <a href="#faq"><span>FAQ</span><small>06</small></a>
  <a href="#contacto"><span>Contacto</span><small>07</small></a>
</div>
```

- [ ] **Step 3: Actualizar opciones del formulario**

Modificar el `<select id="f-servicio" name="servicio">`:

```html
<select id="f-servicio" name="servicio">
  <option value="Aún no lo tengo claro">Aún no lo tengo claro</option>
  <option value="Diseño web">Diseño web</option>
  <option value="Aplicaciones web a medida">Aplicaciones web a medida</option>
  <option value="Desarrollo Web & Apps">Desarrollo Web & Apps</option>
  <option value="Redes sociales">Redes sociales</option>
  <option value="Publicidad online">Publicidad online</option>
  <option value="SEO local">SEO local</option>
  <option value="Varias cosas">Varias cosas</option>
</select>
```

- [ ] **Step 4: Verificar visualmente los enlaces y el formulario.**

---

### Task 2: Insertar la Nueva Sección `#desarrollo` y CSS Auxiliar

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Clases CSS globales como `.wrap`, `.section-head`, `.reveal`, `.kicker`.
- Produces: Nueva sección visual integrada en la página principal.

- [ ] **Step 1: Añadir CSS para la nueva sección**

En la sección `<style>`, justo antes de `/* ============================================================ RESPONSIVE ============================================================ */`, añadir el CSS para el bloque de desarrollo y los "Tech pillars".

```css
    /* ============================================================
       DESARROLLO & WEB APPS
       ============================================================ */
    #desarrollo { background: var(--white); border-top: 1px solid var(--line); }
    .dev-grid {
      margin-top: clamp(40px, 5vw, 70px);
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: clamp(16px, 2vw, 28px);
    }
    .dev-card {
      background: var(--paper); border: 1px solid var(--line);
      padding: clamp(24px, 3vw, 40px); border-radius: 6px;
      transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease);
      display: flex; flex-direction: column;
    }
    .dev-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.04); }
    .dev-card.featured {
      background: var(--ink); color: var(--paper); border-color: var(--ink);
    }
    .dev-card.featured h3, .dev-card.featured p, .dev-card.featured .dev-pts li { color: var(--paper); }
    .dev-card h3 { font-size: 1.35rem; margin-bottom: 12px; }
    .dev-card p { color: var(--muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.5; }
    .dev-pts { list-style: none; margin-top: auto; display: grid; gap: 10px; border-top: 1px solid var(--line); padding-top: 20px; }
    .dev-card.featured .dev-pts { border-top-color: #35332e; }
    .dev-pts li { font-size: 0.88rem; color: var(--muted); display: flex; gap: 10px; align-items: flex-start; }
    .dev-pts li::before { content: "✓"; color: var(--bronze); font-family: var(--font-display); font-weight: 600; }
    
    .tech-pillars {
      margin-top: clamp(40px, 5vw, 70px);
      padding-top: 30px; border-top: 1px solid var(--line);
      display: flex; flex-wrap: wrap; gap: clamp(20px, 4vw, 50px);
    }
    .tech-pillar { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 500; }
    .tech-pillar i { font-size: 1.2rem; font-style: normal; }

    /* Actualización Responsive */
    @media (max-width: 980px) {
      .dev-grid { grid-template-columns: 1fr; }
    }
```

- [ ] **Step 2: Insertar la estructura HTML de la sección**

Justo antes de `<!-- ============================ VENTAJAS ============================ -->`, insertar la nueva sección `#desarrollo`. Además, hay que re-enumerar el *Kicker* de Ventajas a `04`, Proyectos a `05`, Opiniones a `06`, FAQ a `07`, y Contacto a `08`.

```html
    <!-- ============================ DESARROLLO ============================ -->
    <section id="desarrollo">
      <div class="wrap">
        <div class="kicker reveal"><span class="num">03</span> Desarrollo Web & Apps</div>
        <div class="section-head reveal">
          <h2>Soluciones digitales a medida para negocios que necesitan ir más allá</h2>
          <p class="lead">Desde páginas web corporativas de alto rendimiento hasta plataformas web complejas, portales de cliente y aplicaciones SaaS personalizadas.</p>
        </div>

        <div class="dev-grid">
          <div class="dev-card reveal">
            <h3>Páginas Web & Landings de Alta Conversión</h3>
            <p>Sitios web ultrarrápidos, adaptados 100% a la identidad de tu marca, diseñados para captar clientes desde el primer día.</p>
            <ul class="dev-pts">
              <li>Velocidad extrema (&lt;1s de carga)</li>
              <li>SEO técnico nativo</li>
              <li>Diseño editorial responsive</li>
            </ul>
          </div>
          <div class="dev-card featured reveal d1">
            <h3>Web Apps, Dashboards & Portales</h3>
            <p>Software en la nube desarrollado exactamente para los procesos de tu negocio. Sin las limitaciones de las plantillas.</p>
            <ul class="dev-pts">
              <li>CRM, ERP y Portales de cliente</li>
              <li>Sistemas de reservas y automatizaciones</li>
              <li>Integración con API (Stripe, Bizum, WhatsApp)</li>
            </ul>
          </div>
          <div class="dev-card reveal d2">
            <h3>E-commerce & Tiendas Avanzadas</h3>
            <p>Tiendas online preparadas para escalar y procesar ventas sin fricción ni cuellos de botella.</p>
            <ul class="dev-pts">
              <li>Catálogos dinámicos complejos</li>
              <li>Sincronización de stock y facturación</li>
              <li>Checkout seguro sin fricción</li>
            </ul>
          </div>
        </div>

        <div class="tech-pillars reveal d3">
          <div class="tech-pillar"><i>⚡</i> Rendimiento Máximo</div>
          <div class="tech-pillar"><i>🛠️</i> Código Limpio a Medida</div>
          <div class="tech-pillar"><i>🔒</i> Seguridad & SSL</div>
          <div class="tech-pillar"><i>📈</i> Escalabilidad</div>
        </div>
      </div>
    </section>
```

- [ ] **Step 3: Actualizar numeración de kickers en resto de index.html**

Actualizar en el HTML:
- En `#ventajas`: `<span class="num">04</span> Por qué Moussmedia`
- En `#proyectos`: `<span class="num">05</span> Proyectos`
- En `#opiniones`: `<span class="num">06</span> Opiniones`
- En `#faq`: `<span class="num">07</span> Preguntas frecuentes`
- En `#contacto`: `<span class="num">08</span> Contacto`

- [ ] **Step 4: Ejecutar formato y revisar renderizado visual final.**

---
