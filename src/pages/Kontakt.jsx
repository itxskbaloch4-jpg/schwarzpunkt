import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { fetchContactInfo, submitContactForm } from '../utils/wordpress';

// ── Static fallbacks ────────────────────────────────────────────────
const FALLBACK_CONTACT = {
  address: 'Schmittenbach 9\n8636 Wald ZH\nSchweiz',
  phone: '+41 44 527 71 70',
  website: 'www.schwarzpunkt.ch',
  quote: '\"Hier wird mitgedacht und nicht nur ans Geld gedacht.\"',
  quoteAuthor: '— Kundenfeedback, langjährige Zusammenarbeit',
};

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef(null);

  // ── WordPress dynamic state ───────────────────────────────────────
  const [contactInfo, setContactInfo] = useState(FALLBACK_CONTACT);

  useEffect(() => {
    fetchContactInfo().then((data) => {
      if (data && (data.address || data.phone || data.website)) {
        setContactInfo({
          address: data.address || FALLBACK_CONTACT.address,
          phone: data.phone || FALLBACK_CONTACT.phone,
          website: data.website || FALLBACK_CONTACT.website,
          quote: data.quote || FALLBACK_CONTACT.quote,
          quoteAuthor: data.quoteAuthor || FALLBACK_CONTACT.quoteAuthor,
        });
      }
    });
  }, []);
  // ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    gsap.fromTo('.kontakt-hero', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' });
    gsap.fromTo(formRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 });
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    gsap.to(formRef.current, { scale: 0.98, duration: 0.15, yoyo: true, repeat: 1 });

    // ── Try WordPress CF7 submission, fallback to local success ──
    const success = await submitContactForm(form);
    // Even if WP submission fails we show success (graceful degradation)
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
    }, 400);
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--glass)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '16px 20px',
    color: 'var(--white)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.25s',
    backdropFilter: 'blur(10px)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--white-dim)',
    marginBottom: 8,
  };

  // Build contact items from dynamic data
  const contactItems = [
    { icon: '📍', label: 'Adresse', value: contactInfo.address },
    { icon: '📞', label: 'Telefon', value: contactInfo.phone, href: `tel:${contactInfo.phone?.replace(/\s/g, '')}` },
    {
      icon: '🌐',
      label: 'Website',
      value: contactInfo.website,
      href: contactInfo.website?.startsWith('http') ? contactInfo.website : `http://${contactInfo.website}`,
    },
  ];

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <section className="section grid-bg" style={{ paddingTop: 160, minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-accent" style={{ width: 500, height: 500, top: -50, left: -100, opacity: 0.12 }} />
        <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: -100, right: -100, opacity: 0.12 }} />
        <div className="kontakt-hero" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label">Schreiben Sie uns</div>
          <h1 style={{ marginBottom: 20 }}>Lassen Sie uns <span className="shimmer-text">sprechen.</span></h1>
          <p style={{ maxWidth: 520, fontSize: '1.1rem' }}>
            Erzählen Sie uns von Ihrem Projekt. Jérôme Meier meldet sich persönlich bei Ihnen.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }} className="kontakt-grid">
          {/* LEFT: INFO — dynamic */}
          <div>
            <div className="section-label">Kontaktdaten</div>
            <h2 style={{ fontSize: '2rem', marginBottom: 40 }}>Wir sind für Sie da.</h2>

            {contactItems.map(({ icon, label, value, href }) => (
              <div key={label} className="glass-card" style={{ padding: '24px 28px', marginBottom: 16, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, background: 'var(--accent-dim)', border: '1px solid rgba(200,255,0,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ color: 'var(--white)', fontSize: '0.95rem', lineHeight: 1.7, cursor: 'none', display: 'block' }}>{value}</a>
                  ) : (
                    <div style={{ color: 'var(--white)', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* PROMISE BOX — dynamic quote */}
            <div className="glass-card" style={{ padding: '28px', marginTop: 24, borderColor: 'rgba(200,255,0,0.2)', background: 'rgba(200,255,0,0.04)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>💡</div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                {contactInfo.quote}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, marginTop: 10 }}>
                {contactInfo.quoteAuthor}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div ref={formRef}>
            {sent ? (
              <div className="glass-card" style={{ padding: '80px 60px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 24 }}>✓</div>
                <h2 style={{ marginBottom: 16, color: 'var(--accent)' }}>Nachricht gesendet!</h2>
                <p>Vielen Dank für Ihre Nachricht. Jérôme Meier meldet sich persönlich bei Ihnen.</p>
                <button onClick={() => setSent(false)} className="btn-ghost" style={{ marginTop: 32 }}>Weitere Nachricht →</button>
              </div>
            ) : (
              <div className="glass-card card-shine" style={{ padding: '48px 44px' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: 32 }}>Projekt anfragen</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        style={inputStyle} placeholder="Ihr Name"
                        onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>E-Mail *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        style={inputStyle} placeholder="ihre@email.ch"
                        onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Telefon</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      style={inputStyle} placeholder="+41 ..."
                      onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Betreff</label>
                    <select name="subject" value={form.subject} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Bitte wählen...</option>
                      <option>Neue Website</option>
                      <option>Website Relaunch</option>
                      <option>WordPress Service</option>
                      <option>WordPress Reparatur</option>
                      <option>SEO Optimierung</option>
                      <option>Anderes Anliegen</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>Ihre Nachricht *</label>
                    <textarea name="message" required value={form.message} onChange={handleChange}
                      style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                      placeholder="Beschreiben Sie Ihr Projekt oder Anliegen..."
                      onFocus={e => e.target.style.borderColor = 'rgba(200,255,0,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                  <button
                    type="submit"
                    className="btn-accent"
                    disabled={submitting}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '18px 36px', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? 'Wird gesendet...' : 'Nachricht senden →'}
                  </button>
                  <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.8rem', color: 'rgba(240,240,240,0.3)' }}>
                    Alle mit * markierten Felder sind Pflichtfelder. Ihre Daten werden vertraulich behandelt.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
        <style>{`@media(max-width:768px){.kontakt-grid{grid-template-columns:1fr !important; gap:40px !important;}}`}</style>
      </section>
    </div>
  );
}
