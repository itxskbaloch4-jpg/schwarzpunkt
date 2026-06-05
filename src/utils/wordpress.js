// WordPress REST API utility
// Base URL comes from .env → REACT_APP_WP_API
const BASE = process.env.REACT_APP_WP_API;

// ─── Generic fetcher ───────────────────────────────────────────────
async function wpFetch(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`WP API error: ${res.status} ${endpoint}`);
  return res.json();
}

// ─── HERO (WordPress Page: slug "home") ───────────────────────────
// Expected ACF fields on the Home page:
//   hero_title        (text)
//   hero_subtitle     (textarea)
export async function fetchHero() {
  try {
    // fetch page by slug, with ACF fields embedded
    const pages = await wpFetch('/pages?slug=home&acf_format=standard&_fields=acf');
    if (!pages.length) return null;
    const acf = pages[0].acf || {};
    return {
      title: acf.hero_title || null,
      subtitle: acf.hero_subtitle || null,
    };
  } catch (e) {
    console.warn('[WP] fetchHero failed:', e.message);
    return null;
  }
}

// ─── SERVICES (Custom Post Type: "service") ────────────────────────
// Expected ACF fields on each Service post:
//   service_icon      (text, e.g. "◈")
//   service_color     (text, hex e.g. "#c8ff00")
//   service_desc      (textarea)
export async function fetchServices() {
  try {
    const posts = await wpFetch('/service?acf_format=standard&per_page=20&_fields=id,title,acf&orderby=menu_order&order=asc');
    return posts.map((p) => ({
      id: p.id,
      title: p.title?.rendered || '',
      icon: p.acf?.service_icon || '◈',
      color: p.acf?.service_color || '#c8ff00',
      desc: p.acf?.service_desc || '',
    }));
  } catch (e) {
    console.warn('[WP] fetchServices failed:', e.message);
    return null;
  }
}

// ─── CONTACT INFO (WordPress Page: slug "kontakt") ────────────────
// Expected ACF fields on Kontakt page:
//   contact_address   (textarea)
//   contact_phone     (text)
//   contact_website   (url)
//   contact_quote     (textarea)
//   contact_quote_author (text)
export async function fetchContactInfo() {
  try {
    const pages = await wpFetch('/pages?slug=kontakt&acf_format=standard&_fields=acf');
    if (!pages.length) return null;
    const acf = pages[0].acf || {};
    return {
      address: acf.contact_address || null,
      phone: acf.contact_phone || null,
      website: acf.contact_website || null,
      quote: acf.contact_quote || null,
      quoteAuthor: acf.contact_quote_author || null,
    };
  } catch (e) {
    console.warn('[WP] fetchContactInfo failed:', e.message);
    return null;
  }
}

// ─── CONTACT FORM SUBMIT (WPForms / CF7 via REST) ─────────────────
// Uses Contact Form 7 REST API (plugin: CF7 to REST API)
// Form ID must match what's in WordPress
export async function submitContactForm({ name, email, phone, subject, message }) {
  try {
    const WP_BASE = BASE.replace('/wp/v2', '');
    const body = new FormData();
    body.append('your-name', name);
    body.append('your-email', email);
    body.append('your-phone', phone || '');
    body.append('your-subject', subject || '');
    body.append('your-message', message);

    const res = await fetch(`${WP_BASE}/contact-form-7/v1/contact-forms/1/feedback`, {
      method: 'POST',
      body,
    });
    const data = await res.json();
    // CF7 returns status "mail_sent" on success
    return data.status === 'mail_sent';
  } catch (e) {
    console.warn('[WP] submitContactForm failed:', e.message);
    return false;
  }
}
