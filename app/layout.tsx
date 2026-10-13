import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";
import { site } from "@/content/site";

const description =
  "Agencia boutique de comunicación audiovisual para marcas de lujo en Madrid. Rodaje, edición y gestión de redes, todo hecho por nosotros. Solo cuatro marcas a la vez.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Mouss Media | Comunicación audiovisual de lujo en Madrid",
  description,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "es_ES",
    title: "Mouss Media | Comunicación audiovisual de lujo",
    description: "Vídeo y redes para marcas de lujo. Un servicio completamente gestionado, para cuatro marcas a la vez.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0b0b0b", viewportFit: "cover" };

// Google Analytics solo se carga si el usuario acepta cookies
const gaScript = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
window.loadAnalytics=function(){if(window.__gaLoaded)return;window.__gaLoaded=true;
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-03CQ93ZJJ1';
document.head.appendChild(s);gtag('js',new Date());gtag('config','G-03CQ93ZJJ1');};
try{if(localStorage.getItem('mm-cookies')==='accepted')window.loadAnalytics();}catch(e){}
`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description,
  email: site.email,
  telephone: site.phoneHref,
  priceRange: "€€€",
  address: { "@type": "PostalAddress", addressLocality: "Amposta", addressRegion: "Tarragona", addressCountry: "ES" },
  areaServed: [{ "@type": "City", name: "Madrid" }],
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
