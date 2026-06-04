import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      padding: '80px clamp(24px, 6vw, 120px) 40px',
      background: 'var(--deep)',
      borderTop: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* GLOW */}
      <div className="orb orb-accent" style={{
        width: 400, height: 400,
        bottom: -200, left: '50%',
        transform: 'translateX(-50%)',
        opacity: 0.15,
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 48,
        marginBottom: 64,
        position: 'relative',
        zIndex: 1,
      }}>
        {/* BRAND */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.6rem',
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            schwarz<span style={{ color: 'var(--accent)' }}>punkt</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 24 }}>
            Premium WordPress Websites & Webentwicklung aus Winterthur. Über 10 Jahre Erfahrung in Konzeption, Gestaltung und Realisierung.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['LinkedIn', 'Xing', 'Facebook'].map(s => (
              <span key={s} style={{
                padding: '6px 14px',
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                borderRadius: 100,
                fontSize: '0.75rem',
                color: 'var(--white-dim)',
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 20, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>Navigation</div>
          {[
            { path: '/', label: 'Start' },
            { path: '/leistungen', label: 'Leistungen' },
            { path: '/servicepakete', label: 'Servicepakete' },
            { path: '/projekte', label: 'Projekte' },
            { path: '/agentur', label: 'Agentur' },
            { path: '/kontakt', label: 'Kontakt' },
          ].map(({ path, label }) => (
            <div key={path} style={{ marginBottom: 10 }}>
              <Link to={path} style={{ color: 'var(--white-dim)', fontSize: '0.9rem', transition: 'color 0.2s', cursor: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--white-dim)'}>
                {label}
              </Link>
            </div>
          ))}
        </div>

        {/* LEISTUNGEN */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 20, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>Leistungen</div>
          {['WordPress Websites', 'Webentwicklung', 'Web Design', 'SEO Optimierung', 'WordPress Service', 'WordPress Reparatur'].map(s => (
            <div key={s} style={{ marginBottom: 10, color: 'var(--white-dim)', fontSize: '0.9rem' }}>{s}</div>
          ))}
        </div>

        {/* KONTAKT */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 20, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white-dim)' }}>Kontakt</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '📍', text: 'Schmittenbach 9, Wald ZH' },
              { icon: '📞', text: '+41 44 527 71 70' },
              { icon: '🌐', text: 'www.schwarzpunkt.ch' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem', marginTop: 2 }}>{icon}</span>
                <span style={{ color: 'var(--white-dim)', fontSize: '0.9rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" style={{ margin: '0 0 32px 0' }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(240,240,240,0.35)' }}>
          © {new Date().getFullYear()} schwarzpunkt meier — Jérôme Meier. Alle Rechte vorbehalten.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Impressum', 'Datenschutz'].map(s => (
            <span key={s} style={{ fontSize: '0.8rem', color: 'rgba(240,240,240,0.35)', cursor: 'pointer' }}>{s}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
