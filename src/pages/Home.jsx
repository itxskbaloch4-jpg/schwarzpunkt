import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchHero, fetchServices } from '../utils/wordpress';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: '10+', label: 'Jahre Erfahrung' },
  { num: '200+', label: 'Projekte realisiert' },
  { num: '100%', label: 'Qualitätsarbeit nach Mass' },
  { num: '1', label: 'Ansprechpartner: Jérôme Meier' },
];

// ── Static fallbacks (shown if WP API is unreachable) ───────────────
const FALLBACK_HERO = {
  title: null,
  subtitle: null,
};

const FALLBACK_SERVICES = [
  {
    icon: '◈',
    title: 'WordPress Websites',
    desc: 'Premium WordPress Websites nach Mass — individuell, professionell und auf Ihre Bedürfnisse zugeschnitten.',
    color: '#c8ff00',
  },
  {
    icon: '⬡',
    title: 'Webentwicklung',
    desc: 'Moderne Webentwicklung aus Winterthur. Technisch präzise und visuell überzeugend.',
    color: '#7c3aed',
  },
  {
    icon: '◎',
    title: 'Web Design',
    desc: 'Individuelles Design, das Ihre Marke stärkt und Ihre Kommunikation professionell nach aussen trägt.',
    color: '#3b82f6',
  },
  {
    icon: '⊕',
    title: 'WordPress Service',
    desc: 'Wartung, Reparatur und Pflege Ihrer WordPress Website — zuverlässig und schnell aus Winterthur.',
    color: '#f59e0b',
  },
];

const testimonials = [
  {
    text: 'Ich arbeite nun schon lange mit der Firma Schwarzpunkt zusammen und das hat seine Gründe! Hier wird mitgedacht und nicht nur ans Geld gedacht. Auf weitere lange Zusammenarbeit.',
    author: 'Kunde, langjährige Zusammenarbeit',
  },
  {
    text: 'Dass meine Kommunikation nach aussen einwandfrei und professionell funktioniert, ist mir ebenso wichtig, wie meinen Werbeauftritt persönlich und individuell zu gestalten. Das nötige Fachwissen und die erforderliche Verantwortung habe ich bei schwarzpunkt in den fast 10 Jahren Zusammenarbeit stets erhalten. Auch viele tolle Ideen wurden in diesen Jahren von Jérôme Meier in eine virtuelle oder gedruckte Form gebracht, womit ich meine Arbeit präsentieren und ideal bewerben konnte.',
    author: 'Kundin, fast 10 Jahre Zusammenarbeit',
  },
];

const marqueeItems = [
  'WordPress', 'Web Design', 'Webentwicklung', 'Winterthur', 'Premium Websites',
  'SEO', 'Jérôme Meier', 'Schweiz', 'WordPress Service', 'Qualitätsarbeit',
  'WordPress', 'Web Design', 'Webentwicklung', 'Winterthur', 'Premium Websites',
  'SEO', 'Jérôme Meier', 'Schweiz', 'WordPress Service', 'Qualitätsarbeit',
];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  // ── WordPress dynamic state ──────────────────────────────────────
  const [hero, setHero] = useState(FALLBACK_HERO);
  const [services, setServices] = useState(FALLBACK_SERVICES);

  useEffect(() => {
    // Fetch Hero data from WordPress
    fetchHero().then((data) => {
      if (data && (data.title || data.subtitle)) {
        setHero(data);
      }
    });

    // Fetch Services from WordPress
    fetchServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);
  // ────────────────────────────────────────────────────────────────

  useEffect(() => {
    // Hero title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out', delay: 0.3 }
    );

    // Stats counters
    document.querySelectorAll('.stat-num').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        once: true,
        onEnter: () => {
          gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' });
        },
      });
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        }
      );
    });

    // Testimonials
    gsap.utils.toArray('.testimonial-card').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    });
  }, []);

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="section grid-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 120,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div className="orb orb-accent float" style={{ width: 600, height: 600, top: -100, right: -150, opacity: 0.18 }} />
        <div className="orb orb-purple float" style={{ width: 500, height: 500, bottom: -100, left: -100, opacity: 0.15, animationDelay: '2s' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label fade-in">
            Premium WordPress Agentur · Winterthur · Schweiz
          </div>

          <div ref={titleRef} style={{ maxWidth: 1000 }}>
            <h1 style={{ marginBottom: 32, lineHeight: 1.05 }}>
              {/* ── DYNAMIC: Hero Title ── */}
              {hero.title ? (
                <span dangerouslySetInnerHTML={{ __html: hero.title }} />
              ) : (
                <>
                  Web & Design
                  <br />
                  <span className="shimmer-text">nach Mass.</span>
                </>
              )}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', maxWidth: 560, marginBottom: 48 }}>
              {/* ── DYNAMIC: Hero Subtitle ── */}
              {hero.subtitle
                ? hero.subtitle
                : 'Über 10 Jahre Erfahrung in Konzeption, Gestaltung und Realisierung von Webseiten mit WordPress — individuelle Qualitätsarbeit von Jérôme Meier aus Winterthur.'}
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/kontakt" className="btn-accent">
                Projekt besprechen →
              </Link>
              <Link to="/projekte" className="btn-ghost">
                Projekte ansehen
              </Link>
            </div>
          </div>

          {/* HERO BADGE */}
          <div className="glass-card" style={{
            position: 'absolute',
            top: 80, right: 0,
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            maxWidth: 280,
          }}>
            <div style={{
              width: 44, height: 44,
              background: 'var(--accent-dim)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              border: '1px solid rgba(200,255,0,0.3)',
              flexShrink: 0,
            }}>◎</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>10+ Jahre</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--white-dim)' }}>Erfahrung & Expertise</div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 20,
          marginTop: 80,
          position: 'relative',
          zIndex: 1,
        }}>
          {stats.map(({ num, label }) => (
            <div key={label} className="glass-card card-shine stat-num" style={{ padding: '28px 24px' }}>
              <div className="counter-num">{num}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--white-dim)', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* SCROLL INDICATOR */}
        <div style={{
          position: 'absolute',
          bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.5,
          animation: 'float 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <span style={{ fontSize: 18 }}>↓</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap" style={{
        padding: '28px 0',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        background: 'var(--glass)',
      }}>
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              padding: '0 32px',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              color: i % 3 === 0 ? 'var(--accent)' : 'var(--white-dim)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              {item} <span style={{ opacity: 0.3, marginLeft: 32 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="section-label">Was wir machen</div>
        <h2 style={{ marginBottom: 16, maxWidth: 600 }}>
          Alles aus einer Hand — <span className="gradient-text">für Ihren Erfolg.</span>
        </h2>
        <p style={{ maxWidth: 560, marginBottom: 64 }}>
          Von der ersten Idee bis zur fertigen Website — schwarzpunkt meier begleitet Sie durch den gesamten Prozess.
        </p>
        {/* ── DYNAMIC: Services Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {services.map(({ icon, title, desc, color }, idx) => (
            <div key={title || idx} className="glass-card card-shine service-card" style={{
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: 200, height: 200,
                background: `radial-gradient(circle at center, ${color}18, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              <div style={{
                fontSize: '2rem',
                marginBottom: 20,
                color,
                filter: `drop-shadow(0 0 12px ${color}80)`,
              }}>{icon}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
              <Link to="/leistungen" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 20,
                fontSize: '0.85rem',
                fontWeight: 600,
                color,
                cursor: 'none',
              }}>
                Mehr erfahren →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="section" style={{ background: 'var(--deep)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="why-grid">
          <div>
            <div className="section-label">Warum schwarzpunkt</div>
            <h2 style={{ marginBottom: 28 }}>
              Mitdenken — nicht nur<br />
              <span className="gradient-text">ausführen.</span>
            </h2>
            <p style={{ marginBottom: 24 }}>
              Bei schwarzpunkt meier erhalten Sie einen persönlichen Ansprechpartner, der Ihre Ziele versteht und mitdenkt. Nicht nur ans Geld gedacht — sondern an Ihren langfristigen Erfolg.
            </p>
            <p style={{ marginBottom: 40 }}>
              Jérôme Meier bringt über 10 Jahre Erfahrung in der Konzeption, Gestaltung und Realisierung von Webseiten mit WordPress mit — und steht Ihnen persönlich zur Seite.
            </p>
            <Link to="/agentur" className="btn-ghost">Über die Agentur →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '✓', text: 'Persönliche Betreuung durch Jérôme Meier' },
              { icon: '✓', text: 'Über 10 Jahre WordPress-Expertise' },
              { icon: '✓', text: 'Individuelle Qualitätsarbeit nach Mass' },
              { icon: '✓', text: 'Professionelle Kommunikation nach aussen' },
              { icon: '✓', text: 'Tolle Ideen in virtueller & gedruckter Form' },
              { icon: '✓', text: 'Langjährige Kunden-Beziehungen aus Überzeugung' },
            ].map(({ icon, text }, i) => (
              <div key={i} className="glass-card" style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transition: 'var(--transition)',
              }}>
                <span style={{
                  width: 28, height: 28,
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(200,255,0,0.3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>{icon}</span>
                <span style={{ fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:768px) { .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="orb orb-purple" style={{ width: 500, height: 500, top: '20%', right: -200, opacity: 0.12 }} />
        <div className="section-label">Kundenstimmen</div>
        <h2 style={{ marginBottom: 60 }}>Was unsere Kunden sagen.</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 28,
          position: 'relative',
          zIndex: 1,
        }}>
          {testimonials.map(({ text, author }, i) => (
            <div key={i} className="glass-card card-shine testimonial-card" style={{ padding: '40px 36px' }}>
              <div style={{
                fontSize: '3rem',
                lineHeight: 1,
                color: 'var(--accent)',
                fontFamily: 'Georgia, serif',
                marginBottom: 16,
                opacity: 0.6,
              }}>"</div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 24 }}>
                {text}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingTop: 20,
                borderTop: '1px solid var(--glass-border)',
              }}>
                <div style={{
                  width: 40, height: 40,
                  background: 'var(--accent-dim)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  border: '1px solid rgba(200,255,0,0.3)',
                }}>★</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{author}</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{
        margin: '0 clamp(24px, 6vw, 120px) 80px',
        padding: '72px 64px',
        background: 'linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(124,58,237,0.06) 100%)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 24,
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
      }}>
        <div className="orb orb-accent" style={{ width: 400, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.1 }} />
        <div className="section-label">Bereit für Ihr Projekt?</div>
        <h2 style={{ position: 'relative', zIndex: 1 }}>
          Starten Sie jetzt Ihr<br /><span className="shimmer-text">Premium-Webprojekt.</span>
        </h2>
        <p style={{ maxWidth: 520, position: 'relative', zIndex: 1 }}>
          Kontaktieren Sie schwarzpunkt meier und erfahren Sie, wie Ihr nächstes Webprojekt realisiert werden kann.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Link to="/kontakt" className="btn-accent">Kontakt aufnehmen →</Link>
          <Link to="/servicepakete" className="btn-ghost">Servicepakete ansehen</Link>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--white-dim)', position: 'relative', zIndex: 1 }}>
          +41 44 527 71 70 · Schmittenbach 9, Wald ZH
        </div>
      </section>
    </div>
  );
}
