import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const links = [
  { path: '/', label: 'Start' },
  { path: '/leistungen', label: 'Leistungen' },
  { path: '/servicepakete', label: 'Servicepakete' },
  { path: '/projekte', label: 'Projekte' },
  { path: '/agentur', label: 'Agentur' },
  { path: '/kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9000,
        padding: scrolled ? '14px 40px' : '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(10,10,10,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* LOGO */}
        <Link to="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.4rem',
          letterSpacing: '-0.03em',
          color: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          schwarz<span style={{ color: 'var(--accent)' }}>punkt</span>
          <span style={{
            width: 6, height: 6,
            background: 'var(--accent)',
            borderRadius: '50%',
            display: 'inline-block',
            marginLeft: 2,
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
        </Link>

        {/* DESKTOP LINKS */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }} className="desktop-nav">
          {links.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: '8px 16px',
              borderRadius: 100,
              fontSize: '0.88rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: pathname === path ? 'var(--accent)' : 'var(--white-dim)',
              background: pathname === path ? 'rgba(200,255,0,0.1)' : 'transparent',
              border: pathname === path ? '1px solid rgba(200,255,0,0.2)' : '1px solid transparent',
              transition: 'all 0.25s ease',
              cursor: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link to="/kontakt" className="btn-accent" style={{
          fontSize: '0.85rem',
          padding: '12px 24px',
        }}>
          Projekt starten →
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            fontSize: 22,
            cursor: 'pointer',
          }}
          className="mobile-toggle">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 8999,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(30px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}>
          {links.map(({ path, label }) => (
            <Link key={path} to={path} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: pathname === path ? 'var(--accent)' : 'var(--white)',
              letterSpacing: '-0.02em',
            }}>
              {label}
            </Link>
          ))}
          <div style={{ color: 'var(--white-dim)', fontSize: '0.9rem', marginTop: 20 }}>
            +41 44 527 71 70
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .btn-accent.cta-desktop { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
