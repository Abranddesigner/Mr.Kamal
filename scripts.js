document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Back to Top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
  });

  // Dark/Light Mode Toggle
  function toggleMode() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  }
  if (localStorage.getItem('theme') === 'dark') toggleMode();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
