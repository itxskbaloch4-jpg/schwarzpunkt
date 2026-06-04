import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pakete = [
  {
    name: 'Starter',
    tagline: 'Für den Einstieg',
    color: '#3b82f6',
    highlight: false,
    features: [
      'WordPress Installation & Setup',
      'Responsives Design-Template',
      'Bis zu 5 Seiten',
      'Kontaktformular',
      'SEO-Grundeinstellungen',
      'SSL-Zertifikat',
      '1 Monat Support',
    ],
  },
  {
    name: 'Professional',
    tagline: 'Für Unternehmen',
    color: '#c8ff00',
    highlight: true,
    features: [
      'Individuelles WordPress-Theme',
      'Unbegrenzte Seiten',
      'Custom Design nach CI',
      'SEO-Optimierung (On-Page)',
      'Performance-Optimierung',
      'Google Analytics Setup',
      '3 Monate Support & Wartung',
      'Schulung & Einführung',
    ],
  },
  {
    name: 'Premium',
    tagline: 'Für anspruchsvolle Projekte',
    color: '#7c3aed',
    highlight: false,
    features: [
      'Alles aus Professional',
      'Custom Plugin-Entwicklung',
      'Mehrsprachigkeit (WPML)',
      'WooCommerce Integration',
      'API-Anbindungen',
      'Advanced SEO & Tracking',
      '6 Monate Premium Support',
      'Monatliches Reporting',
    ],
  },
];

const serviceItems = [
  { icon: '🔧', title: 'WordPress Update Service', desc: 'Regelmässige Updates von WordPress Core, Themes und Plugins — für maximale Sicherheit und Stabilität.' },
  { icon: '🛡️', title: 'Security Monitoring', desc: 'Kontinuierliche Überwachung Ihrer WordPress Website auf Sicherheitslücken und Anomalien.' },
  { icon: '⚡', title: 'Speed Optimierung', desc: 'Analyse und Optimierung der Ladezeit Ihrer Website für bessere User Experience und SEO.' },
  { icon: '💾', title: 'Backup Service', desc: 'Automatische tägliche Backups Ihrer Website und Datenbank — immer auf der sicheren Seite.' },
];

export default function Servicepakete() {
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    gsap.fromTo('.pakete-hero', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' });
    gsap.utils.toArray('.paket-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      });
    });
  }, []);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="section grid-bg" style={{ paddingTop: 160, minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-purple" style={{ width: 500, height: 500, top: -50, right: -100, opacity: 0.15 }} />
        <div className="pakete-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">WordPress Service Pakete</div>
          <h1 style={{ marginBottom: 24 }}>
            Service & <span className="shimmer-text">Wartung.</span>
          </h1>
          <p style={{ maxWidth: 560, fontSize: '1.1rem', marginBottom: 40 }}>
            Professionelle WordPress Service- und Wartungspakete aus Winterthur. Damit Ihre Website immer optimal läuft.
          </p>
        </div>
      </section>

      {/* PAKETE */}
      <section className="section">
        <div className="section-label" style={{ marginBottom: 48 }}>Pakete im Überblick</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>
          {pakete.map(({ name, tagline, color, highlight, features }) => (
            <div key={name} className="glass-card card-shine paket-card" style={{
              padding: '44px 36px',
              position: 'relative',
              overflow: 'hidden',
              border: highlight ? `1px solid ${color}50` : '1px solid var(--glass-border)',
              boxShadow: highlight ? `0 0 60px ${color}15, 0 32px 80px rgba(0,0,0,0.4)` : undefined,
              transform: highlight ? 'scale(1.02)' : undefined,
            }}>
              {highlight && (
                <div style={{ position: 'absolute', top: 20, right: 20, background: color, color: '#0a0a0a', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 100, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Empfohlen
                </div>
              )}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color, marginBottom: 8 }}>{tagline}</div>
              <h2 style={{ fontSize: '2rem', marginBottom: 32 }}>{name}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: '0.9rem' }}>
                    <span style={{ color, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                    <span style={{ color: 'var(--white-dim)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/kontakt" className={highlight ? 'btn-accent' : 'btn-ghost'} style={{ width: '100%', justifyContent: 'center' }}>
                Anfragen →
              </Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 32, fontSize: '0.85rem', color: 'var(--white-dim)' }}>
          Individuelle Preise auf Anfrage. Kontaktieren Sie uns für ein persönliches Angebot.
        </p>
      </section>

      {/* SERVICE ITEMS */}
      <section className="section" style={{ background: 'var(--deep)' }}>
        <div className="section-label">Im Service enthalten</div>
        <h2 style={{ marginBottom: 60 }}>Alles, was Ihre Website <span className="gradient-text">braucht.</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {serviceItems.map(({ icon, title, desc }) => (
            <div key={title} className="glass-card card-shine" style={{ padding: '32px 28px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 clamp(24px, 6vw, 120px) 100px' }}>
        <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: '64px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ marginBottom: 20 }}>Kein passendes Paket dabei?</h2>
          <p style={{ maxWidth: 500, margin: '0 auto 36px' }}>Kontaktieren Sie uns für ein individuelles Angebot — massgeschneidert für Ihre Anforderungen.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/kontakt" className="btn-accent">Individuell anfragen →</Link>
            <a href="tel:+41445277170" className="btn-ghost">+41 44 527 71 70</a>
          </div>
        </div>
      </section>
    </div>
  );
}
