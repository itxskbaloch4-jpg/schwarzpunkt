import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const leistungen = [
  {
    icon: '◈',
    title: 'WordPress Websites',
    color: '#c8ff00',
    desc: 'Premium WordPress Websites nach Mass — individuell konzipiert, professionell gestaltet und technisch präzise realisiert. Von der Landing Page bis zum umfangreichen Unternehmensauftritt.',
    features: [
      'Individuelle WordPress-Entwicklung',
      'Responsive Design für alle Geräte',
      'Performance-Optimierung',
      'Content Management System',
      'Schulung & Einführung',
    ],
  },
  {
    icon: '⬡',
    title: 'Webentwicklung',
    color: '#7c3aed',
    desc: 'Technisch anspruchsvolle Webentwicklung mit modernen Standards. Sauberer Code, schnelle Ladezeiten und zukunftssichere Lösungen.',
    features: [
      'Custom Theme-Entwicklung',
      'Plugin-Entwicklung & -Anpassung',
      'API-Integrationen',
      'Datenbank-Optimierung',
      'Security-Hardening',
    ],
  },
  {
    icon: '◎',
    title: 'Web Design',
    color: '#3b82f6',
    desc: 'Individuelles Web Design, das Ihre Marke stärkt. Tolle Ideen in virtueller Form — für einen professionellen Auftritt nach aussen.',
    features: [
      'Corporate Design Umsetzung',
      'UI/UX Design',
      'Wireframing & Konzeption',
      'Bildbearbeitung & Grafiken',
      'Printdesign & Drucksachen',
    ],
  },
  {
    icon: '⊕',
    title: 'WordPress Service & Reparatur',
    color: '#f59e0b',
    desc: 'Zuverlässiger WordPress Service aus Winterthur. Wartung, Reparatur und Pflege Ihrer bestehenden WordPress Website.',
    features: [
      'WordPress Updates & Wartung',
      'Fehlerdiagnose & Reparatur',
      'Backup-Management',
      'Speed Optimierung',
      'Sicherheits-Checks',
    ],
  },
  {
    icon: '◉',
    title: 'SEO Optimierung',
    color: '#10b981',
    desc: 'Suchmaschinenoptimierung für mehr Sichtbarkeit. Technisches SEO und On-Page-Optimierung für bessere Rankings.',
    features: [
      'Technisches SEO-Audit',
      'On-Page Optimierung',
      'Meta-Tags & Struktur',
      'Page Speed Optimierung',
      'Google Search Console',
    ],
  },
  {
    icon: '⬩',
    title: 'Konzeption & Beratung',
    color: '#f43f5e',
    desc: 'Strategische Beratung für Ihren Webauftritt. Gemeinsam entwickeln wir die beste Lösung für Ihre Kommunikation.',
    features: [
      'Projektberatung & Konzept',
      'Zieldefinition & Strategie',
      'Technologie-Empfehlungen',
      'Content-Strategie',
      'Persönliche Begleitung',
    ],
  },
];

export default function Leistungen() {
  useEffect(() => {
    gsap.utils.toArray('.leistung-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          delay: (i % 2) * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        }
      );
    });
    gsap.fromTo('.leistungen-hero', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' });
  }, []);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="section grid-bg" style={{ paddingTop: 160, minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-accent" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.15 }} />
        <div className="leistungen-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Was wir anbieten</div>
          <h1 style={{ marginBottom: 24, maxWidth: 700 }}>
            Unsere <span className="shimmer-text">Leistungen.</span>
          </h1>
          <p style={{ maxWidth: 560, fontSize: '1.1rem' }}>
            Von der Konzeption über das Design bis hin zur technischen Umsetzung — schwarzpunkt meier bietet alles aus einer Hand.
          </p>
        </div>
      </section>

      {/* LEISTUNGEN GRID */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
          {leistungen.map(({ icon, title, color, desc, features }) => (
            <div key={title} className="glass-card card-shine leistung-card" style={{ padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${color}12, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ fontSize: '2.5rem', marginBottom: 24, color, filter: `drop-shadow(0 0 16px ${color}60)` }}>{icon}</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 14 }}>{title}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 28, lineHeight: 1.8 }}>{desc}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--white-dim)' }}>
                    <span style={{ width: 20, height: 20, background: `${color}20`, border: `1px solid ${color}40`, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color, flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 clamp(24px, 6vw, 120px) 100px' }}>
        <div style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-xl)', padding: '64px', textAlign: 'center', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ marginBottom: 20 }}>Ihr nächstes Projekt?</h2>
          <p style={{ maxWidth: 500, margin: '0 auto 36px' }}>Kontaktieren Sie uns und lassen Sie uns gemeinsam die beste Lösung für Ihre Anforderungen entwickeln.</p>
          <Link to="/kontakt" className="btn-accent">Jetzt anfragen →</Link>
        </div>
      </section>
    </div>
  );
}
