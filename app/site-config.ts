/**
 * Conteúdo centralizado do site.
 *
 * Edite este objeto para atualizar contactos, endereço, navegação, destaques,
 * galeria e acomodações sem procurar esses dados por todos os componentes.
 * Os valores abaixo correspondem às informações confirmadas pelo proprietário.
 */
export const siteConfig = {
  name: "Tinguita Paradise",
  tagline: "O paraíso espera por si.",
  description:
    "Restaurante e espaço de lazer junto ao oceano, em Praia Amélia, Moçâmedes, com piscina, gastronomia, bar e um ambiente acolhedor para toda a família.",
  businessType: "Restaurante",
  location: {
    latitude: -15.2020515,
    longitude: 12.1144359,
    address: "Namibe, Moçâmedes, bairro Praia Amélia, junto à Projeque",
    access: "Bairro Praia Amélia, junto à Projeque.",
    mapsUrl:
      "https://www.google.com/maps/place/Tinguita+Paradise/@-15.2020515,12.111861,17z/data=!3m1!4b1!4m6!3m5!1s0x1ba3d904b0475d85:0x62520f28110326cb!8m2!3d-15.2020515!4d12.1144359!16s%2Fg%2F11zh3wyssx",
    embedUrl:
      "https://www.google.com/maps?q=-15.2020515,12.1144359&z=16&output=embed",
  },
  contact: {
    phoneLabel: "+244 940 637 666",
    phoneHref: "tel:+244940637666",
    whatsappNumber: "244940637666",
    whatsappHref:
      "https://wa.me/244940637666?text=Ol%C3%A1%20Tinguita%20Paradise%2C%20gostaria%20de%20pedir%20informa%C3%A7%C3%B5es.",
    emailLabel: "tinguitaparadise@gmail.com",
    emailHref: "mailto:tinguitaparadise@gmail.com",
    socialHandle: "@tinguitaparadise",
  },
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "O Espaço", href: "#resort" },
    { label: "Experiências", href: "#experiencias" },
    { label: "Galeria", href: "#galeria" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contactos", href: "#contactos" },
  ],
  highlights: [
    "Piscina e lazer",
    "Gastronomia de qualidade",
    "Bar com bebidas especiais",
    "Conforto e tranquilidade",
    "Ambiente acolhedor para toda a família",
  ],
  gallery: [
    {
      src: "/images/tinguita-01.webp",
      alt: "Pôr do sol sobre a piscina e o oceano no Tinguita Paradise",
      category: ["Piscina", "Vista para o mar", "Noite"],
    },
    {
      src: "/images/tinguita-02.webp",
      alt: "Vista aérea noturna da piscina e da estrutura do Tinguita Paradise",
      category: ["Piscina", "Áreas exteriores", "Noite"],
    },
    {
      src: "/images/tinguita-03.webp",
      alt: "Piscina exterior e zona de lazer com vista para o oceano",
      category: ["Piscina", "Vista para o mar", "Dia"],
    },
    {
      src: "/images/tinguita-04.webp",
      alt: "Pergolado e mesas ao ar livre junto ao mar",
      category: ["Áreas exteriores", "Vista para o mar", "Dia"],
    },
    {
      src: "/images/tinguita-05.webp",
      alt: "Área exterior do resort com pergolado, piscina e oceano",
      category: ["Áreas exteriores", "Vista para o mar", "Dia"],
    },
    {
      src: "/images/tinguita-06.webp",
      alt: "Piscina iluminada e zonas de descanso ao anoitecer",
      category: ["Piscina", "Áreas exteriores", "Noite"],
    },
    {
      src: "/images/tinguita-07.webp",
      alt: "Pôr do sol visto da área da piscina e refeições ao ar livre",
      category: ["Piscina", "Vista para o mar", "Noite"],
    },
  ],
  accommodations: [
    {
      name: "Acomodação — informações em atualização",
      description:
        "A descrição, as fotografias interiores e as condições desta acomodação serão adicionadas após confirmação do proprietário.",
      capacity: "Capacidade a confirmar",
      amenities: "Comodidades a confirmar",
      price: "Solicite disponibilidade",
    },
    {
      name: "Acomodação — informações em atualização",
      description:
        "Este espaço está preparado para receber o nome, a descrição e os detalhes oficiais da acomodação.",
      capacity: "Capacidade a confirmar",
      amenities: "Comodidades a confirmar",
      price: "Solicite disponibilidade",
    },
  ],
} as const;

export type GalleryItem = (typeof siteConfig.gallery)[number];
