# Spec Design: Nueva sección de Desarrollo Web & Apps Personalizadas y Mejoras de Marketing Digital

**Fecha:** 2026-07-22  
**Proyecto:** Moussmedia Landing Page (`index.html`)  
**Estado:** Aprobado por el usuario  

---

## 1. Visión General

El objetivo de esta especificación es enriquecer la landing page de **Moussmedia** añadiendo una sección dedicada e independiente para **Desarrollo Web & Aplicaciones Web Personalizadas**, así como mejorar la claridad de los servicios de Marketing Digital. Esta adición permitirá posicionar a Moussmedia no solo como un estudio de marketing local, sino también como un proveedor capaz de crear software web a medida (portales, dashboards, e-commerce avanzado y web apps).

---

## 2. Arquitectura de Cambios y Navegación

### 2.1 Menú de Navegación Header (`.nav-links` y `.mobile-menu`)
- Se añade el enlace `#desarrollo` etiquetado como `Desarrollo` en el menú desktop.
- Se actualiza la numeración del menú móvil:
  - `01` Estudio (`#sobre`)
  - `02` Servicios (`#servicios`)
  - `03` Desarrollo Web & Apps (`#desarrollo`)
  - `04` Ventajas (`#ventajas`)
  - `05` Proyectos (`#proyectos`)
  - `06` Opiniones (`#opiniones`)
  - `07` FAQ (`#faq`)
  - `08` Contacto (`#contacto`)

### 2.2 Formulario de Contacto (`#contactForm`)
- Se incorporan al campo `<select id="f-servicio">` las siguientes opciones adicionales:
  - `<option value="Aplicaciones web a medida">Aplicaciones web a medida</option>`
  - `<option value="Desarrollo Web & Apps">Desarrollo Web & Apps</option>`

---

## 3. Especificación de la Nueva Sección (`#desarrollo`)

### 3.1 Estilo Visual y UI
- Se ubicará entre la sección `#servicios` y `#ventajas`.
- Fondo: `--white` (`#fdfcfa`) con sutiles separadores de línea (`--line`).
- Tipografías: `--font-display` (*Fraunces*) para encabezados y `--font-body` (*Inter*) para descripciones.
- Animación: Clases `.reveal` e instanciación en el `IntersectionObserver` de JavaScript.

### 3.2 Componentes de la Sección

1. **Encabezado de Sección (`.section-head`):**
   - Kicker: `<div class="kicker reveal"><span class="num">03</span> Desarrollo & Web Apps</div>`
   - Encabezado H2: `Soluciones digitales a medida para negocios que necesitan ir más allá`
   - Párrafo descriptivo: *Desde páginas web corporativas de alto rendimiento hasta plataformas web complejas, portales de cliente y aplicaciones SaaS personalizadas.*

2. **Grid de Tarjetas de Desarrollo (`.dev-grid`):**
   - **Tarjeta 1: Webs Corporativas & Landings**
     - *Título:* Páginas Web & Landings de Alta Conversión
     - *Descripción:* Sitios web ultrarrápidos, adaptados 100% a la identidad de tu marca, diseñados para captar clientes desde el primer día.
     - *Puntos clave:* Velocidad <1s, SEO técnico nativo, diseño responsive editorial.
   - **Tarjeta 2: Aplicaciones Web & Portales a Medida (Destacada / Card Principal)**
     - *Título:* Web Apps, Dashboards & Portales de Cliente
     - *Descripción:* Software en la nube desarrollado exactamente para los procesos de tu negocio. Sin las limitaciones ni la lentitud de plantillas prefabricadas.
     - *Puntos clave:* Paneles de control (CRM/ERP), sistemas de reservas o gestión, integración con APIs externas (Stripe, Bizum, WhatsApp API).
   - **Tarjeta 3: E-Commerce & Tiendas Avanzadas**
     - *Título:* E-commerce & Plataformas de Venta Online
     - *Descripción:* Tiendas online preparadas para escalar y procesar ventas sin fricción ni cuellos de botella.
     - *Puntos clave:* Catálogo dinámico, pasarelas de pago seguras, sincronización de stock e integración con facturación.

3. **Banner de Pilares Técnicos (`.tech-pillars`):**
   - Un bloque horizontal con 4 distintivos de calidad técnica:
     - ⚡ **Rendimiento Máximo:** Carga ultrarrápida optimizada para Google Core Web Vitals.
     - 🛠️ **Código Limpio:** Desarrollo a medida sin plugins innecesarios ni dependencias pesadas.
     - 🔒 **Seguridad & SSL:** Protección de datos, cifrado HTTPS y buenas prácticas en ciberseguridad.
     - 📈 **Escalabilidad:** Arquitectura lista para crecer junto con las necesidades de tu empresa.

---

## 4. Requisitos No Funcionales y SEO
- **Semántica HTML5:** Uso de etiquetas `<section>`, `<article>`, `<h3>`, `<ul>`, `<li>`.
- **Accesibilidad:** Mantener contraste adecuado de color, atributos `aria-expanded` y etiquetas `aria-label` en enlaces interactivos.
- **Responsive Design:** Garantizar la visualización impecable en dispositivos móviles (320px+), tablets y escritorios (1200px+).

---

## 5. Plan de Verificación
- Verificación visual de los estilos CSS y animación `.reveal`.
- Comprobación del correcto funcionamiento del menú de navegación fija y el menú móvil.
- Validación del envío y selección de opciones en el formulario de contacto.
