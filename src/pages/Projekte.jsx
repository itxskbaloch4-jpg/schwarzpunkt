import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Alle', 'WordPress', 'Web Design', 'Corporate', 'E-Commerce'];

const projekte = [
  { title: 'Unternehmens-Webauftritt', cat: 'Corporate', tags: ['WordPress', 'Design', 'SEO'], color: '#c8ff00', year: '2024' },
  { title: 'Online Shop Relaunch', cat: 'E-Commerce', tags: ['WooCommerce', 'WordPress', 'UI/UX'], color: '#7c3aed', year: '2024' },
  { title: 'Praxis-Website', cat: 'WordPress', tags: ['WordPress', 'Booking', 'Responsive'], color: '#3b82f6', year: '2023' },
  { title: 'Handwerker Webauftritt', cat: 'Web Design', tags: ['Design', 'WordPress', 'Mobile'], color: '#f59e0b', year: '2023' },
  { title: 'Non-Profit Organisation', cat: 'Corporate', tags: ['WordPress', 'Multilingual', 'SEO'], color: '#10b981', year: '2023' },
  { title: 'Gastronomie Website', cat: 'WordPress', tags: ['WordPress', 'Design', 'Reservierung'], color: '#f43f5e', year: '2022' },
];

export default function Projekte() {
  const [active, setActive] = useState('Alle');

  const filtered = active === 'Alle' ? projekte : projekte.filter(p => p.cat === active || p.tags.includes(active));

  useEffect(() => {
    gsap.fromTo('.projekte-hero', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' });
  }, []);

  useEffect(() => {
    gsap.fromTo('.projekt-card', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
    });
  }, [active]);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="section grid-bg" style={{ paddingTop: 160, minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-accent" style={{ width: 500, height: 500, top: -50, right: -100, opacity: 0.15 }} />
        <div className="projekte-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Unsere Arbeit</div>
          <h1 style={{ marginBottom: 24 }}>Ausgewählte <span className="shimmer-text">Projekte.</span></h1>
          <p style={{ maxWidth: 560, fontSize: '1.1rem' }}>
            Über 10 Jahre WordPress-Projekte — von der Landing Page bis zum komplexen Unternehmensauftritt. Individuelle Qualitätsarbeit aus Winterthur.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              padding: '10px 22px',
              borderRadius: 100,
              border: active === cat ? '1px solid rgba(200,255,0,0.4)' : '1px solid var(--glass-border)',
              background: active === cat ? 'rgba(200,255,0,0.1)' : 'var(--glass)',
              color: active === cat ? 'var(--accent)' : 'var(--white-dim)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backdropFilter: 'blur(10px)',
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {filtered.map(({ title, cat, tags, color, year }) => (
            <div key={title} className="glass-card card-shine projekt-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* VISUAL AREA */}
              <div style={{
                height: 220,
                background: `linear-gradient(135deg, ${color}15, transparent 60%), var(--surface)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid var(--glass-border)',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, ${color}20, transparent 60%)` }} />
                <div style={{
                  width: 80, height: 80,
                  border: `1px solid ${color}40`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem',
                  color,
                  background: `${color}10`,
                  position: 'relative', zIndex: 1,
                }}>◈</div>
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '4px 10px', fontSize: '0.75rem', color: 'var(--white-dim)', backdropFilter: 'blur(10px)' }}>
                  {year}
                </div>
              </div>
              {/* INFO */}
              <div style={{ padding: '24px 28px' }}>
                <div style={{ fontSize: '0.75rem', color, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{cat}</div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 14 }}>{title}</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 clamp(24px, 6vw, 120px) 100px', textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>Ihr Projekt als Nächstes?</div>
        <h2 style={{ margin: '20px 0 16px' }}>Lassen Sie uns Ihr Projekt realisieren.</h2>
        <p style={{ maxWidth: 460, margin: '0 auto 36px' }}>Kontaktieren Sie schwarzpunkt meier für ein unverbindliches Gespräch über Ihr Webprojekt.</p>
        <a href="/kontakt" className="btn-accent">Projekt besprechen →</a>
      </section>
    </div>
  );
}
