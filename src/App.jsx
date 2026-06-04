import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import FloatingButtons from './components/FloatingButtons';

import Home from './pages/Home';
import Leistungen from './pages/Leistungen';
import Servicepakete from './pages/Servicepakete';
import Projekte from './pages/Projekte';
import Agentur from './pages/Agentur';
import Kontakt from './pages/Kontakt';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    gsap.fromTo(
      '.page-wrapper',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, [pathname]);
  return children;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="noise-overlay" />
      <Cursor />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollToTop />
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leistungen" element={<Leistungen />} />
              <Route path="/servicepakete" element={<Servicepakete />} />
              <Route path="/projekte" element={<Projekte />} />
              <Route path="/agentur" element={<Agentur />} />
              <Route path="/kontakt" element={<Kontakt />} />
            </Routes>
          </PageTransition>
          <Footer />
          <FloatingButtons />
        </>
      )}
    </BrowserRouter>
  );
}
