import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate all .fade-up elements on scroll
 */
export function initFadeUps() {
  gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

/**
 * Parallax effect
 */
export function initParallax(selector = '.parallax', speed = 0.4) {
  gsap.utils.toArray(selector).forEach((el) => {
    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/**
 * Stagger children on enter
 */
export function staggerOnEnter(parent, children = '> *', stagger = 0.1) {
  gsap.fromTo(
    `${parent} ${children}`,
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0, stagger,
      ease: 'power3.out', duration: 0.6,
      scrollTrigger: { trigger: parent, start: 'top 85%', once: true },
    }
  );
}
