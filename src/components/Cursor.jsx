import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const cursorStyle = {
  position: 'fixed',
  top: 0, left: 0,
  pointerEvents: 'none',
  zIndex: 99998,
  mixBlendMode: 'difference',
};

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power4.out' });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.45, ease: 'power3.out' });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .btn-accent, .btn-ghost, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => { window.removeEventListener('mousemove', onMove); };
  }, []);

  if (window.innerWidth <= 768) return null;

  return (
    <>
      <div ref={dotRef} style={{
        ...cursorStyle,
        width: 8, height: 8,
        background: '#c8ff00',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div ref={ringRef} style={{
        ...cursorStyle,
        width: 36, height: 36,
        border: '1.5px solid #c8ff00',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
    </>
  );
}
