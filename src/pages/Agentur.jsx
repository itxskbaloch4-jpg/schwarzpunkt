import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '10+', label: 'Jahre Erfahrung', desc: 'Über 10 Jahre in Konzeption, Gestaltung und Realisierung von Webseiten mit WordPress.' },
  { year: '200+', label: 'Projekte', desc: 'Individuelle Projekte — von der kleinen Landingpage bis zum grossen Unternehmensauftritt.' },
  { year: '1', label: 'Ansprechpartner', desc: 'Jérôme Meier — Ihr persönlicher und direkter Ansprechpartner für alle Webprojekte.' },
];

const values = [
  { icon: '◎', title: 'Mitdenken', desc: 'Hier wird mitgedacht und nicht nur ans Geld gedacht. Wir entwickeln die beste Lösung für Sie.' },
  { icon: '◈', title: 'Qualitätsarbeit', desc: 'Individuelle Qualitätsarbeit nach Mass — kein Template, keine Kompromisse.' },
  { icon: '⬡', title: 'Persönlichkeit', desc: 'Ihren Werbeauftritt persönlich und individuell gestalten — das ist unser Anspruch.' },
  { icon: '⊕', title: 'Verantwortung', desc: 'Das nötige Fachwissen und die erforderliche Verantwortung — jetzt und in Zukunft.' },
];

export default function Agentur() {
  useEffect(() => {
    gsap.fromTo('.agentur-hero', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' });
    gsap.utils.toArray('.value-card').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  }, []);

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="section grid-bg" style={{ paddingTop: 160, minHeight: '55vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-purple" style={{ width: 500, height: 500, top: -50, right: -100, opacity: 0.15 }} />
        <div className="agentur-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Über uns</div>
          <h1 style={{ marginBottom: 24 }}>
            schwarzpunkt <span className="shimmer-text">meier.</span>
          </h1>
          <p style={{ maxWidth: 600, fontSize: '1.1rem' }}>
            Agentur für Web & Design aus Wald, Zürich. Jérôme Meier — Ihr persönlicher Ansprechpartner für Premium WordPress Websites und individuelle Webprojekte seit über 10 Jahren.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="story-grid">
          <div>
            <div className="section-label">Die Geschichte</div>
            <h2 style={{ marginBottom: 28 }}>Über 10 Jahre<br /><span className="gradient-text">Leidenschaft für das Web.</span></h2>
            <p style={{ marginBottom: 20, lineHeight: 1.9 }}>
              schwarzpunkt meier steht für individuelle Qualitätsarbeit in der Webentwicklung und im Web Design. Gegründet von Jérôme Meier, ist die Agentur in Wald, Zürich ansässig und betreut Kunden in der ganzen Deutschschweiz.
            </p>
            <p style={{ marginBottom: 20, lineHeight: 1.9 }}>
              Mit über 10 Jahren Erfahrung in Konzeption, Gestaltung und Realisierung von Webseiten mit WordPress bietet schwarzpunkt meier einen umfassenden Service — von der ersten Idee bis zur fertig realisierten Website und darüber hinaus.
            </p>
            <p style={{ lineHeight: 1.9 }}>
              Dass Kommunikation nach aussen einwandfrei und professionell funktioniert, ist uns ebenso wichtig, wie den Werbeauftritt persönlich und individuell zu gestalten. Viele tolle Ideen wurden in diesen Jahren von Jérôme Meier in eine virtuelle oder gedruckte Form gebracht.
            </p>
          </div>

          {/* STATS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {timeline.map(({ year, label, desc }) => (
              <div key={year} className="glass-card card-shine" style={{ padding: '28px 32px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1, flexShrink: 0, minWidth: 80 }}>{year}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>{label}</div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.story-grid{grid-template-columns:1fr !important; gap: 48px !important;}}`}</style>
      </section>

      {/* PERSON */}
      <section className="section" style={{ background: 'var(--deep)' }}>
        <div className="section-label">Das Gesicht dahinter</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="person-grid">
          <div className="glass-card" style={{ padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="orb orb-accent" style={{ width: 300, height: 300, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.1 }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid rgba(200,255,0,0.4)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                J
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: 8 }}>Jérôme Meier</h2>
              <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex', marginBottom: 20 }}>
                Inhaber & Web Developer
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8 }}>
                WordPress-Experte, Web Designer und persönlicher Ansprechpartner für alle Webprojekte bei schwarzpunkt meier.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24 }}>
                {['WordPress', 'Web Design', 'SEO', 'Konzeption'].map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: 24 }}>Ihr persönlicher<br /><span className="gradient-text">Ansprechpartner.</span></h2>
            <p style={{ marginBottom: 20 }}>
              Bei schwarzpunkt meier haben Sie immer einen direkten Ansprechpartner — Jérôme Meier. Keine Vermittlung, kein Agentur-Overhead, kein Verlust von Informationen.
            </p>
            <p style={{ marginBottom: 40 }}>
              Das nötige Fachwissen und die erforderliche Verantwortung werden in jeder Zusammenarbeit stets erbracht — für einen professionellen Auftritt nach aussen.
            </p>
            <Link to="/kontakt" className="btn-accent">Kennenlernen →</Link>
          </div>
        </div>
        <style>{`@media(max-width:768px){.person-grid{grid-template-columns:1fr !important; gap: 48px !important;}}`}</style>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="section-label">Unsere Werte</div>
        <h2 style={{ marginBottom: 60 }}>Was uns antreibt.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="glass-card card-shine value-card" style={{ padding: '36px 32px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: 16, filter: 'drop-shadow(0 0 12px rgba(200,255,0,0.5))' }}>{icon}</div>
              <h3 style={{ marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT INFO */}
      <section style={{ padding: '0 clamp(24px, 6vw, 120px) 100px' }}>
        <div className="glass-card" style={{ padding: '60px', display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="section-label">Adresse</div>
            <h3 style={{ marginBottom: 16 }}>schwarzpunkt meier</h3>
            <p>Schmittenbach 9<br />8636 Wald ZH<br />Schweiz</p>
          </div>
          <div>
            <div className="section-label">Kontakt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              <a href="tel:+41445277170" style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 600, cursor: 'none' }}>
                +41 44 527 71 70
              </a>
              <a href="http://www.schwarzpunkt.ch" style={{ color: 'var(--accent)', fontSize: '0.95rem', cursor: 'none' }}>
                www.schwarzpunkt.ch
              </a>
            </div>
          </div>
          <Link to="/kontakt" className="btn-accent">Jetzt kontaktieren →</Link>
        </div>
      </section>
    </div>
  );
}
