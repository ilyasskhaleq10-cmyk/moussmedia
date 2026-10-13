# Mouss Media — web

Web de Mouss Media hecha con **Next.js** (React), con vídeo a pantalla completa, vídeo controlado por el scroll, scroll suave (Lenis) y animaciones (GSAP). Se compila a archivos estáticos para servirla con nginx en el VPS.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Textos, precios, sectores, rutas de vídeo | `content/site.ts` |
| Colores y tipografías | `app/globals.css` (bloque `:root`) |
| Orden de las secciones | `app/page.tsx` |
| Cada sección | `components/*.tsx` y su `.module.css` |
| Vídeos y pósters | `public/media/` |

## Meter vuestros vídeos

Los vídeos actuales son **provisionales** (llevan el texto "sustituir"). Sustitúyelos en `public/media/` con el mismo nombre, o cambia la ruta en `content/site.ts`.

| Archivo | Formato | Uso |
|---|---|---|
| `hero.mp4` | 16:9, 8-15 s, en bucle | Portada a pantalla completa |
| `scroll.mp4` | 16:9, 5-10 s | Avanza y retrocede con el scroll |
| `sector-*.mp4` | 16:9 o 4:5, 5-10 s | Vista previa de cada sector |
| `reel-*.mp4` | 9:16 vertical | Galería de trabajos |

Comprímelos antes de subirlos (genera también el póster `.jpg`):

```bash
./scripts/encode-video.sh bruto.mov public/media/hero.mp4
./scripts/encode-video.sh reel.mov public/media/reel-1.mp4 1080
./scripts/encode-scroll-video.sh plano.mov public/media/scroll.mp4   # todos los fotogramas clave: scroll fluido
```

Los vídeos no llevan sonido (los navegadores solo reproducen solos los vídeos silenciados).

## Lista de espera

El formulario envía un **POST JSON** a `NEXT_PUBLIC_WAITLIST_ENDPOINT` (por defecto `https://app.moussmedia.com/api/lista-espera`). Copia `.env.example` a `.env.local` para cambiarlo.

Campos: `marca, sector, instagram, seguidores, presupuesto, inicio, nombre, cargo, email, telefono, mensaje, privacidad, origen, enviado`.

En app.moussmedia.com la ruta debe:
1. Aceptar `POST` con `Content-Type: application/json` y responder 2xx.
2. Permitir CORS desde `https://moussmedia.com` (incluida la petición `OPTIONS`).

Si falla, la web muestra un aviso con el email de contacto.

## Publicar en el VPS

```bash
./scripts/deploy.sh usuario@servidor /var/www/moussmedia.com
```

Compila (`out/`) y sincroniza con rsync. En nginx basta con servir esa carpeta como raíz estática.

## Web anterior

La versión anterior (HTML estático y páginas de SEO local) está en `legacy/` por si hay que recuperar algo.
