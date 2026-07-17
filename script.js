// =========================================
// MOBILE MENU
// =========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================
// ACTIVE NAV LINK ON SCROLL
// =========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

// =========================================
// NAV BACKGROUND ON SCROLL + BACK TO TOP
// =========================================
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const scrolled = window.scrollY > 40;
  nav.style.boxShadow = scrolled ? '0 8px 30px -12px rgba(0,0,0,0.5)' : 'none';
  backToTop.classList.toggle('visible', window.scrollY > 500);
  setActiveLink();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================
const revealTargets = document.querySelectorAll(
  '.section-title, .section-sub, .card, .project-card, .about-copy, .skills-grid, .contact-form, .contact-info'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// =========================================
// SKILL BARS FILL ON VIEW
// =========================================
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('filled');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(el => skillObserver.observe(el));

// =========================================
// CONTACT FORM SUBMISSION (Formspree / Web3Forms / EmailJS compatible)
// =========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('.form-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const originalText = btnText.textContent;

  submitBtn.disabled = true;
  btnText.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = "Message sent — I'll get back to you soon.";
      formStatus.classList.add('success');
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    formStatus.textContent = 'Something went wrong. Please email me directly instead.';
    formStatus.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = originalText;
  }
});

// =========================================
// FOOTER YEAR
// =========================================
document.getElementById('year').textContent = new Date().getFullYear();