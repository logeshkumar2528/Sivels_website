const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (!link.closest('.nav-dropdown') || window.matchMedia('(max-width: 860px)').matches) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  if (note) note.textContent = 'Thanks for your enquiry. This template form needs an approved Sivels Finance form endpoint before it can send your details.';
});
const header = document.querySelector('.site-header');
const backToTop = document.createElement('a');
backToTop.className = 'back-to-top';
backToTop.href = '#';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

const mobileCta = document.createElement('div');
mobileCta.className = 'mobile-cta';
mobileCta.innerHTML = '<a class="mobile-cta-link" href="index.html#products">Our loans</a>'
  + '<a class="button" href="index.html#contact">Apply now <span>↗</span></a>';
document.body.appendChild(mobileCta);
document.body.classList.add('has-mobile-cta');

const onScroll = () => {
  const y = window.scrollY;
  if (header) header.classList.toggle('is-scrolled', y > 24);
  backToTop.classList.toggle('is-shown', y > 600);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealTargets = document.querySelectorAll([
  '.product-card', '.option-grid > *', '.benefit-list > div', '.steps article', '.audience-grid > div',
  '.values-grid > div', '.faq-list details', '.testimonial-box', '.vision-cards article', '.document-card',
  '.feature-facts > div', '.mini-steps > div', '.contact-form', '.numbers-grid > div', '.lap-types > div',
  '.funds-list > div', '.reason-grid > div', '.micro-audience > div', '.nextgen-cards > div',
  '.variant-detail-card', '.regulatory-card', '.grievance-card', 'main h2'
].join(','));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
    const settle = event => {
      if (event.target !== element || event.propertyName !== 'opacity') return;
      element.removeEventListener('transitionend', settle);
      element.classList.remove('reveal', 'is-visible');
      element.style.removeProperty('--reveal-delay');
    };
    element.addEventListener('transitionend', settle);
    revealObserver.observe(element);
  });
}
