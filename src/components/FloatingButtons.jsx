import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  wrap: {
    position: 'fixed',
    right: 24,
    bottom: 32,
    zIndex: 9990,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 12,
  },
  speed: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(22,22,31,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'none',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    color: '#f0f0f0',
    fontSize: 18,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    textDecoration: 'none',
    position: 'relative',
  },
  mainFab: {
    width: 58,
    height: 58,
    borderRadius: '50%',
    background: '#c8ff00',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'none',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    color: '#0a0a0a',
    fontSize: 22,
    boxShadow: '0 0 40px rgba(200,255,0,0.4), 0 8px 32px rgba(0,0,0,0.5)',
  },
  tooltip: {
    position: 'absolute',
    right: 66,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(22,22,31,0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f0f0f0',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 12px',
    borderRadius: 8,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    letterSpacing: '0.05em',
  },
};

function FabBtn({ icon, tooltip, onClick, href, isLink }) {
  const [hov, setHov] = useState(false);
  const btnStyle = {
    ...styles.fab,
    ...(hov ? { borderColor: '#c8ff00', color: '#c8ff00', transform: 'scale(1.12)' } : {}),
  };

  const content = (
    <>
      {hov && <span style={styles.tooltip}>{tooltip}</span>}
      {icon}
    </>
  );

  if (isLink) return (
    <Link to={href} style={btnStyle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      {content}
    </Link>
  );

  return (
    <button style={btnStyle} onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>
      {content}
    </button>
  );
}

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={styles.wrap}>
      {open && (
        <div style={styles.speed}>
          <FabBtn icon="✉" tooltip="Kontakt" href="/kontakt" isLink />
          <FabBtn icon="📦" tooltip="Servicepakete" href="/servicepakete" isLink />
          <FabBtn icon="📞" tooltip="+41 44 527 71 70"
            onClick={() => window.open('tel:+41445277170')} />
          {showTop && (
            <FabBtn icon="↑" tooltip="Nach oben"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          )}
        </div>
      )}
      <button
        style={{
          ...styles.mainFab,
          ...(open ? { transform: 'rotate(45deg)' } : {}),
        }}
        onClick={() => setOpen(o => !o)}>
        +
      </button>
    </div>
  );
}
