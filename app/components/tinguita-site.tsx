"use client";

import { FormEvent, ImgHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Quote,
  Send,
  Sparkles,
  Sunset,
  Users,
  Waves,
  X,
} from "lucide-react";
import { siteConfig } from "../site-config";

const filters = ["Todos", "Piscina", "Vista para o mar", "Áreas exteriores", "Dia", "Noite"];

const experiences = [
  {
    title: "Piscina e lazer",
    text: "Um convite a abrandar, mergulhar e aproveitar o dia com o oceano sempre por perto.",
    image: "/images/tinguita-03.webp",
    icon: Waves,
  },
  {
    title: "Gastronomia de qualidade",
    text: "Sabores preparados para completar o dia com momentos agradáveis à mesa, num ambiente junto ao mar.",
    image: "/images/tinguita-04.webp",
    icon: Clock3,
  },
  {
    title: "Pôr do sol",
    text: "Ao fim do dia, a luz transforma a piscina e o horizonte num cenário para guardar na memória.",
    image: "/images/tinguita-01.webp",
    icon: Sunset,
  },
  {
    title: "Bar e bebidas especiais",
    text: "Bebidas especiais para refrescar os dias de piscina e acompanhar o pôr do sol.",
    image: "/images/tinguita-05.webp",
    icon: Sparkles,
  },
  {
    title: "Noites tranquilas",
    text: "Luz suave, piscina iluminada e espaços exteriores pensados para prolongar o descanso.",
    image: "/images/tinguita-06.webp",
    icon: Quote,
  },
  {
    title: "Momentos especiais",
    text: "Um cenário acolhedor para desacelerar a dois, em família ou com quem torna a viagem especial.",
    image: "/images/tinguita-07.webp",
    icon: Users,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Componente de imagem usado em todo o site.
 * Carrega o hero imediatamente e aplica lazy loading às restantes fotografias.
 */
function SiteImage({
  fill,
  priority,
  style,
  alt,
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & {
  alt: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const originalSource = props.src;
  const resolvedSource =
    typeof originalSource === "string" && originalSource.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${originalSource}`
      : originalSource;

  return (
    // Local, pre-compressed resort photographs bypass the unavailable preview image proxy.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={resolvedSource}
      alt={alt}
      loading={priority ? "eager" : (props.loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      style={fill ? { ...style, position: "absolute", inset: 0, width: "100%", height: "100%" } : style}
    />
  );
}

/** Mantém os títulos das secções visualmente consistentes. */
function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="section-heading">
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2 className={light ? "text-white" : "text-navy"}>{title}</h2>
      {text ? <p className={light ? "text-white/72" : "text-ink/68"}>{text}</p> : null}
    </div>
  );
}

/**
 * Página completa do Tinguita Paradise.
 *
 * Este componente concentra a interface e as interações porque o projeto é uma
 * landing page de uma rota. O conteúdo que muda com frequência fica separado
 * em app/site-config.ts.
 */
export default function TinguitaSite() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [quickDates, setQuickDates] = useState({ checkIn: "", checkOut: "", guests: 2 });
  const [submitted, setSubmitted] = useState(false);

  // Converte o movimento vertical da página no parallax suave da fotografia.
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, 140]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1.04, 1.09]);

  // Recalcula a galeria apenas quando o visitante troca o filtro.
  const filteredGallery = useMemo(
    () =>
      activeFilter === "Todos"
        ? siteConfig.gallery
        : siteConfig.gallery.filter((item) => item.category.includes(activeFilter as never)),
    [activeFilter],
  );

  // Alterna o estado visual mais sólido da navbar depois do primeiro scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Impede a página de rolar atrás do menu mobile ou do lightbox.
  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lightboxIndex]);

  // Permite fechar e navegar no lightbox usando o teclado.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % filteredGallery.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + filteredGallery.length) % filteredGallery.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredGallery.length, lightboxIndex]);

  /** Leva o visitante até ao formulário principal. */
  const scrollToBooking = () => {
    document.querySelector("#contactos")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  /** A consulta rápida recolhe as datas e encaminha para os contactos. */
  const handleQuickBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scrollToBooking();
  };

  /**
   * Valida o formulário e cria uma mensagem formatada para o WhatsApp.
   * O envio não confirma automaticamente uma reserva.
   */
  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const message = [
      "Olá Tinguita Paradise, gostaria de consultar disponibilidade.",
      `Nome: ${data.get("name")}`,
      `Telefone: ${data.get("phone")}`,
      `E-mail: ${data.get("email")}`,
      `Data de entrada: ${data.get("checkIn")}`,
      `Data de saída: ${data.get("checkOut")}`,
      `Hóspedes: ${data.get("guests")}`,
      data.get("message") ? `Mensagem: ${data.get("message")}` : "",
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
    form.reset();
  };

  /** Move o lightbox para a fotografia anterior ou seguinte. */
  const moveLightbox = (direction: number) => {
    setLightboxIndex((current) =>
      current === null ? null : (current + direction + filteredGallery.length) % filteredGallery.length,
    );
  };

  return (
    <main>
      <header className={`site-header ${scrolled || menuOpen ? "site-header-solid" : ""}`}>
        <div className="shell header-inner">
          <a href="#inicio" className="brand" aria-label="Tinguita Paradise — página inicial">
            <SiteImage src="/images/tinguita-logo.jpg" alt="Logótipo do Tinguita Paradise" className="brand-logo" width={48} height={48} priority />
            <span>
              <strong>Tinguita</strong>
              <small>Paradise</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <button className="button button-gold desktop-booking" onClick={scrollToBooking}>
              Reservar agora <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              aria-label="Navegação mobile"
            >
              {siteConfig.nav.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span>0{index + 1}</span>{item.label}<ChevronRight size={18} />
                </a>
              ))}
              <button className="button button-gold" onClick={() => { setMenuOpen(false); scrollToBooking(); }}>
                Consultar disponibilidade
              </button>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <section ref={heroRef} id="inicio" className="hero" aria-labelledby="hero-title">
        <motion.div
          className="hero-media"
          style={prefersReducedMotion ? undefined : { y: heroImageY, scale: heroImageScale }}
        >
          <SiteImage
            src="/images/tinguita-07.webp"
            alt="Pôr do sol sobre a piscina e o oceano no Tinguita Paradise"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
        </motion.div>
        <div className="hero-shade" />
        <div className="shell hero-content">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="hero-copy"
          >
            <p className="hero-kicker"><span /> Praia Amélia · Moçâmedes</p>
            <h1 id="hero-title">O paraíso<br />espera por si.</h1>
            <p>
              Piscina, gastronomia de qualidade, bebidas especiais e um ambiente
              acolhedor para desfrutar em família junto ao oceano.
            </p>
            <div className="hero-buttons">
              <button className="button button-gold" onClick={scrollToBooking}>
                Consultar disponibilidade <ArrowUpRight size={17} />
              </button>
              <a className="button button-ghost" href="#galeria">Ver galeria</a>
            </div>
          </motion.div>

          <a href="#reserva-rapida" className="scroll-cue" aria-label="Continuar para reserva rápida">
            <span>Descobrir</span><ArrowDown size={16} />
          </a>
        </div>
      </section>

      <section id="reserva-rapida" className="quick-booking-wrap" aria-label="Consulta rápida de disponibilidade">
        <form className="shell quick-booking" onSubmit={handleQuickBooking}>
          <div className="quick-intro">
            <span>Planeie a sua estadia</span>
            <strong>Consulte disponibilidade</strong>
          </div>
          <label>
            <span>Entrada</span>
            <span className="field-line"><CalendarDays size={17} /><input type="date" required value={quickDates.checkIn} onChange={(e) => setQuickDates({ ...quickDates, checkIn: e.target.value })} /></span>
          </label>
          <label>
            <span>Saída</span>
            <span className="field-line"><CalendarDays size={17} /><input type="date" required value={quickDates.checkOut} min={quickDates.checkIn} onChange={(e) => setQuickDates({ ...quickDates, checkOut: e.target.value })} /></span>
          </label>
          <label>
            <span>Hóspedes</span>
            <span className="guest-counter">
              <button type="button" aria-label="Diminuir hóspedes" onClick={() => setQuickDates({ ...quickDates, guests: Math.max(1, quickDates.guests - 1) })}><Minus size={15} /></button>
              <b>{quickDates.guests}</b>
              <button type="button" aria-label="Aumentar hóspedes" onClick={() => setQuickDates({ ...quickDates, guests: Math.min(20, quickDates.guests + 1) })}><Plus size={15} /></button>
            </span>
          </label>
          <button className="button button-navy" type="submit">Consultar <ArrowUpRight size={17} /></button>
        </form>
      </section>

      <section id="resort" className="section resort-intro">
        <div className="shell intro-grid">
          <motion.div
            className="intro-visual"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7 }}
          >
            <div className="image-frame image-frame-main">
              <SiteImage src="/images/tinguita-03.webp" alt="Piscina exterior do Tinguita Paradise voltada para o oceano" fill sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="intro-badge"><Waves /><span><b>Junto ao oceano</b><small>Uma paisagem que convida a abrandar</small></span></div>
          </motion.div>

          <motion.div
            className="intro-copy"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.1 }}
          >
            <SectionHeading
              eyebrow="Bem-vindo"
              title="Tinguita Paradise"
              text="Em Praia Amélia, Moçâmedes, o Tinguita Paradise reúne piscina, lazer, gastronomia e bar num espaço acolhedor junto ao oceano. Um ambiente pensado para abrandar, conviver e aproveitar bons momentos com toda a família."
            />
            <p className="intro-note">
              Aqui, cada momento encontra o seu lugar: um mergulho na piscina, uma refeição sob o pergolado, uma bebida especial ou o silêncio de um pôr do sol sobre o mar.
            </p>
            <ul className="highlights-list">
              {siteConfig.highlights.map((item) => <li key={item}><Check size={15} />{item}</li>)}
            </ul>
            <button className="text-link" onClick={scrollToBooking}>Planeie a sua estadia <ArrowRight size={18} /></button>
          </motion.div>
        </div>
      </section>

      <section className="structure-section">
        <div className="shell structure-grid">
          <div className="structure-copy">
            <p className="eyebrow eyebrow-light">O resort ao anoitecer</p>
            <h2>Espaços que se revelam<br />sob uma nova luz</h2>
            <p>
              A vista aérea apresenta a relação entre as áreas exteriores, a piscina e a estrutura do resort. Ao cair da noite, a iluminação suave cria um ambiente sereno para continuar a desfrutar do espaço.
            </p>
            <div className="structure-stat"><span>Dia</span><i /><span>Pôr do sol</span><i /><span>Noite</span></div>
          </div>
          <div className="structure-image">
            <SiteImage src="/images/tinguita-02.webp" alt="Vista aérea noturna da estrutura e piscina do Tinguita Paradise" fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
        </div>
      </section>

      <section id="experiencias" className="section experiences-section">
        <div className="shell">
          <div className="section-topline">
            <SectionHeading
              eyebrow="Experiências"
              title="O seu tempo, ao ritmo do mar"
              text="Piscina, gastronomia, bebidas especiais, fins de tarde dourados e noites tranquilas — descubra diferentes formas de viver o Tinguita Paradise."
            />
            <span className="section-count">06 experiências</span>
          </div>
          <div className="experience-grid">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;
              return (
                <motion.article
                  key={experience.title}
                  className={`experience-card ${index === 0 || index === 5 ? "experience-card-wide" : ""}`}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: (index % 3) * 0.06 }}
                >
                  <SiteImage src={experience.image} alt={experience.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <div className="card-shade" />
                  <span className="card-number">0{index + 1}</span>
                  <div className="card-copy"><Icon size={22} /><h3>{experience.title}</h3><p>{experience.text}</p></div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="manifesto-section">
        <SiteImage src="/images/tinguita-07.webp" alt="Pôr do sol sobre a piscina com vista para o oceano" fill sizes="100vw" />
        <div className="manifesto-shade" />
        <motion.div
          className="shell manifesto-content"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        >
          <p className="eyebrow eyebrow-light">Uma memória para levar</p>
          <blockquote>“Há lugares que visitamos.<br />E há lugares que ficam connosco.”</blockquote>
          <button className="button button-gold" onClick={scrollToBooking}>Planeie a sua estadia <ArrowUpRight size={17} /></button>
        </motion.div>
      </section>

      <section id="acomodacoes" className="section accommodations-section">
        <div className="shell">
          <div className="section-topline accommodations-heading">
            <SectionHeading
              eyebrow="Acomodações"
              title="O seu espaço para descansar"
              text="Os tipos de acomodação, capacidades, comodidades e valores serão publicados assim que forem confirmados pelo proprietário. Entretanto, a nossa equipa pode informar sobre a disponibilidade."
            />
            <span className="info-pill">Informação a confirmar</span>
          </div>
          <div className="accommodation-grid">
            {siteConfig.accommodations.map((room, index) => (
              <article className="accommodation-card" key={`${room.name}-${index}`}>
                <div className="accommodation-placeholder">
                  <span>Fotografia da acomodação</span>
                  <small>A inserir após confirmação</small>
                </div>
                <div className="accommodation-content">
                  <span className="accommodation-index">0{index + 1}</span>
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>
                  <div className="room-facts">
                    <span><Users size={17} />{room.capacity}</span>
                    <span><Sparkles size={17} />{room.amenities}</span>
                  </div>
                  <div className="room-footer"><strong>{room.price}</strong><button onClick={scrollToBooking}>Pedir informação <ArrowRight size={17} /></button></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="section gallery-section">
        <div className="shell">
          <div className="gallery-heading">
            <SectionHeading eyebrow="Galeria" title="Conheça o Tinguita Paradise" text="Explore os espaços, a luz e a paisagem que dão identidade a este refúgio costeiro." />
            <div className="gallery-filters" role="group" aria-label="Filtros da galeria">
              {filters.map((filter) => (
                <button key={filter} className={activeFilter === filter ? "active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
              ))}
            </div>
          </div>

          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.button
                  layout
                  key={item.src}
                  className={`gallery-item gallery-item-${index % 7}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Ampliar imagem: ${item.alt}`}
                >
                  <SiteImage src={item.src} alt={item.alt} fill loading="lazy" sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="gallery-overlay"><Plus size={22} /></span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] ? (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização ampliada da galeria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Fechar imagem"><X /></button>
            <button className="lightbox-prev" onClick={() => moveLightbox(-1)} aria-label="Imagem anterior"><ArrowLeft /></button>
            <div className="lightbox-image"><SiteImage src={filteredGallery[lightboxIndex].src} alt={filteredGallery[lightboxIndex].alt} fill sizes="95vw" /></div>
            <button className="lightbox-next" onClick={() => moveLightbox(1)} aria-label="Imagem seguinte"><ArrowRight /></button>
            <p>{lightboxIndex + 1} / {filteredGallery.length} · {filteredGallery[lightboxIndex].alt}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section id="localizacao" className="section location-section">
        <div className="shell location-grid">
          <div className="location-copy">
            <SectionHeading eyebrow="Localização" title="Um cenário privilegiado junto ao oceano" text="O Tinguita Paradise encontra-se num ambiente costeiro onde o horizonte e o mar fazem parte da experiência." />
            <div className="location-detail"><MapPin /><span><b>Morada</b><small>{siteConfig.location.address}</small></span></div>
            <div className="location-detail"><ArrowUpRight /><span><b>Acessos e referências</b><small>{siteConfig.location.access}</small></span></div>
            <a className="button button-navy" href={siteConfig.location.mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowUpRight size={17} /></a>
          </div>
          <div className="map-wrap">
            <iframe src={siteConfig.location.embedUrl} title="Localização do Tinguita Paradise no Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <span className="map-label"><MapPin size={16} /> Tinguita Paradise</span>
          </div>
        </div>
      </section>

      <section id="contactos" className="booking-section">
        <div className="shell booking-grid">
          <div className="booking-copy">
            <p className="eyebrow eyebrow-light">Contactos e reservas</p>
            <h2>O seu próximo pôr do sol pode começar aqui.</h2>
            <p>Envie-nos as datas pretendidas. Entraremos em contacto para informar sobre disponibilidade e condições da estadia.</p>
            <div className="contact-list">
              <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small><b>{siteConfig.contact.phoneLabel}</b></span><ArrowUpRight /></a>
              <a href={siteConfig.contact.phoneHref}><Phone /><span><small>Telefone</small><b>{siteConfig.contact.phoneLabel}</b></span><ArrowUpRight /></a>
              <a href={siteConfig.contact.emailHref}><Mail /><span><small>E-mail</small><b>{siteConfig.contact.emailLabel}</b></span><ArrowUpRight /></a>
            </div>
          </div>

          <div className="booking-form-wrap">
            {submitted ? (
              <div className="success-message" role="status">
                <span><Check /></span>
                <p className="eyebrow">Pedido registado</p>
                <h3>Obrigado pelo seu interesse.</h3>
                <p>A sua mensagem foi preparada no WhatsApp. Para concluir o pedido, envie-a na conversa que acabou de abrir. A reserva só fica confirmada após resposta direta do Tinguita Paradise.</p>
                <button className="button button-navy" onClick={() => setSubmitted(false)}>Enviar outro pedido</button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} noValidate>
                <div className="form-heading"><div><span>Pedido de disponibilidade</span><h3>Conte-nos sobre a sua estadia</h3></div><Send /></div>
                <div className="form-grid">
                  <label><span>Nome completo *</span><input name="name" type="text" autoComplete="name" placeholder="O seu nome" required minLength={2} /></label>
                  <label><span>Telefone *</span><input name="phone" type="tel" autoComplete="tel" placeholder="+244 ..." required minLength={7} /></label>
                  <label className="full"><span>E-mail *</span><input name="email" type="email" autoComplete="email" placeholder="nome@exemplo.com" required /></label>
                  <label><span>Data de entrada *</span><input key={`in-${quickDates.checkIn}`} name="checkIn" type="date" defaultValue={quickDates.checkIn} required /></label>
                  <label><span>Data de saída *</span><input key={`out-${quickDates.checkOut}`} name="checkOut" type="date" defaultValue={quickDates.checkOut} min={quickDates.checkIn} required /></label>
                  <label className="full"><span>Número de hóspedes *</span><input name="guests" type="number" min="1" max="20" defaultValue={quickDates.guests} required /></label>
                  <label className="full"><span>Mensagem</span><textarea name="message" rows={4} placeholder="Conte-nos alguma preferência ou questão importante." /></label>
                </div>
                <button className="button button-gold submit-button" type="submit">Enviar pedido <ArrowUpRight size={17} /></button>
                <p className="form-disclaimer">O envio deste formulário não representa confirmação automática da reserva. A disponibilidade e as condições serão confirmadas diretamente pelo Tinguita Paradise.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-top">
          <div className="footer-brand"><a href="#inicio" className="brand brand-footer"><SiteImage src="/images/tinguita-logo.jpg" alt="Logótipo do Tinguita Paradise" className="brand-logo" width={76} height={76} /><span><strong>Tinguita</strong><small>Paradise</small></span></a><p>O paraíso espera por si — piscina, gastronomia, bar e lazer em família junto ao oceano.</p></div>
          <div><h3>Explorar</h3>{siteConfig.nav.slice(0, 4).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div>
          <div><h3>Informações</h3><a href="#localizacao">Localização</a><a href="#contactos">Reservas</a><a href="#privacidade">Política de privacidade</a></div>
          <div><h3>Contactos</h3><a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneLabel}</a><a href={siteConfig.contact.emailHref}>{siteConfig.contact.emailLabel}</a><span className="social-handle"><Camera />{siteConfig.contact.socialHandle}</span><div className="social-links"><a href={siteConfig.contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></div></div>
        </div>
        <div id="privacidade" className="shell privacy-note"><p><b>Privacidade:</b> os dados do formulário serão usados apenas para responder ao pedido de disponibilidade após a integração do serviço de envio.</p></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Tinguita Paradise. Todos os direitos reservados.</span><a href={siteConfig.location.mapsUrl} target="_blank" rel="noreferrer">Ver no Google Maps <ArrowUpRight size={14} /></a></div>
      </footer>

      <a href={siteConfig.contact.whatsappHref} target="_blank" rel="noreferrer" className="floating-whatsapp" aria-label="Consultar disponibilidade por WhatsApp"><MessageCircle /><span>Reservar</span></a>
    </main>
  );
}
