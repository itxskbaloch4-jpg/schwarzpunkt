import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let val = { v: 0 };
    gsap.to(val, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (barRef.current) barRef.current.style.width = val.v + '%';
        if (percentRef.current) percentRef.current.textContent = Math.round(val.v) + '%';
      },
    });
  }, []);

  return (
    <div className="loader-overlay" ref={overlayRef}>
      <div className="loader-logo">
        schwarz<span>punkt</span>
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" ref={barRef} />
      </div>
      <div className="loader-percent" ref={percentRef}>0%</div>
    </div>
  );
}
