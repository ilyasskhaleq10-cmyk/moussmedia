// Todo el contenido de la web en un solo sitio.
// Para cambiar un vídeo: deja el archivo en public/media/ y cambia la ruta aquí.

export const site = {
  name: "Mouss Media",
  url: "https://moussmedia.com",
  email: "rachid@moussmedia.com",
  phone: "+34 615 22 20 74",
  phoneHref: "+34615222074",
  instagram: "https://www.instagram.com/moussmedia",
  location: "Amposta, Tarragona · Rodajes en Madrid",
  waitlistEndpoint:
    process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "https://app.moussmedia.com/api/lista-espera",
};

export const hero = {
  eyebrow: "Comunicación audiovisual de lujo · Madrid",
  title: ["El lujo no se explica.", "Se filma."],
  text: "Creamos y gestionamos el contenido de tu marca de principio a fin: guion, rodaje, edición y redes. Cuatro marcas a la vez.",
  video: "/media/hero.mp4",
  poster: "/media/hero.jpg",
};

export const statement =
  "No hacemos contenido para llenar un perfil. Rodamos piezas que transmiten lo que vale tu marca, para que llegue a quien puede pagarlo.";

// Vídeo que avanza y retrocede con el scroll. Los textos aparecen en el punto indicado (0 a 1).
export const scrollFilm = {
  video: "/media/scroll.mp4",
  poster: "/media/scroll.jpg",
  captions: [
    { at: 0.05, kicker: "i.", title: "Una jornada de rodaje al mes", text: "Cuatro horas efectivas con equipo de cine en tu espacio." },
    { at: 0.38, kicker: "ii.", title: "Edición en tres días", text: "Montaje, color y formatos para cada red, como máximo en 72 h." },
    { at: 0.7, kicker: "iii.", title: "Tú no gestionas nada", text: "Plataforma privada con plan, contrato, recursos e informe mensual." },
  ],
};

export const sectors = [
  { name: "Inmobiliaria de lujo", tag: "Propiedades y agentes", video: "/media/sector-inmobiliaria.mp4", poster: "/media/sector-inmobiliaria.jpg" },
  { name: "Automoción de alta gama", tag: "Concesionarios y marcas", video: "/media/sector-automocion.mp4", poster: "/media/sector-automocion.jpg" },
  { name: "Banca privada e inversión", tag: "Firmas y asesores", video: "/media/sector-banca.mp4", poster: "/media/sector-banca.jpg" },
];
export const sectorsNote =
  "También estudiamos hostelería, eventos y moda de alta gama. Solo aceptamos marcas con una oferta de lujo definida y un cliente ideal claro.";

// Reels verticales (9:16) para la galería horizontal.
export const reels = [
  { title: "Reel 1", tag: "Inmobiliaria", video: "/media/reel-1.mp4", poster: "/media/reel-1.jpg" },
  { title: "Reel 2", tag: "Automoción", video: "/media/reel-2.mp4", poster: "/media/reel-2.jpg" },
  { title: "Reel 3", tag: "Marca personal", video: "/media/reel-3.mp4", poster: "/media/reel-3.jpg" },
  { title: "Reel 4", tag: "Eventos", video: "/media/reel-4.mp4", poster: "/media/reel-4.jpg" },
];

export const membership = {
  price: "1.500 €",
  note: "Precio desde, IVA no incluido. Lo indicamos aquí para que solo nos escriba quien encaja.",
  items: [
    { title: "Estrategia y guiones", text: "Qué contar cada mes, escrito antes de rodar." },
    { title: "Jornada de rodaje mensual", text: "Cuatro horas efectivas con equipo profesional." },
    { title: "Edición y adaptación", text: "Montaje, color y formatos en un máximo de tres días." },
    { title: "Gestión de redes", text: "Publicación, calendario y seguimiento de resultados." },
    { title: "Plataforma privada", text: "Plan, contrato, recursos, avisos de hitos e informe mensual." },
  ],
  extra: "Jornadas adicionales, atrezo y materiales impresos se presupuestan aparte y se abonan por adelantado.",
};

export const slots = {
  total: 4,
  title: "Cuatro marcas a la vez. Ni una más.",
  text: "Rodamos, editamos y publicamos nosotros mismos, así que el número de plazas es real. Cuando están ocupadas, las solicitudes esperan turno por orden de llegada.",
};

export const steps = [
  { title: "Solicitud", text: "Nos cuentas tu marca, tu público y tu presupuesto en dos minutos." },
  { title: "Videollamada", text: "Si encajamos, te proponemos una llamada para conocer tu negocio." },
  { title: "Propuesta", text: "Propuesta y contrato por correo. Pago seguro con tarjeta." },
  { title: "Alta en 24 h", text: "Acceso a tu plataforma y fecha del primer rodaje." },
];

export const form = {
  sectors: ["Inmobiliaria de lujo", "Automoción de alta gama", "Banca privada e inversión", "Hostelería de lujo", "Eventos", "Moda de alta gama", "Otro"],
  followers: ["Menos de 5.000", "5.000 a 20.000", "20.000 a 100.000", "Más de 100.000"],
  budgets: ["Menos de 1.500 €", "1.500 € a 3.000 €", "3.000 € a 6.000 €", "Más de 6.000 €"],
  start: ["Este mes", "En 1 a 3 meses", "Más adelante"],
  roles: ["Propietario o CEO", "Dirección de marketing", "Otro cargo"],
};
