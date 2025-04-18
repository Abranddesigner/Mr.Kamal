function toggleMenu() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  navbar.classList.toggle('show');
  const isExpanded = navbar.classList.contains('show');
  menuToggle.setAttribute('aria-expanded', isExpanded);
}

function toggleMode() {
  document.body.classList.toggle('dark-theme');
  const button = document.querySelector('.mode-toggle');
  const isDarkTheme = document.body.classList.contains('dark-theme');
  button.textContent = isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

function openPopup(src) {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popupImg');
  popupImg.src = src;
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.classList.toggle('show', window.scrollY > 300);
  }

  // Intersection Observer for section animations
  const sections = document.querySelectorAll('.section, .about, .portfolio-grid, .gallery-grid, .carousel-wrapper, .payment-info, footer');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.querySelector('.mode-toggle').textContent = 'Switch to Dark Mode';
  } else {
    document.body.classList.add('dark-theme');
    document.querySelector('.mode-toggle').textContent = 'Switch to Light Mode';
  }

  // Typing animation for welcome text
  const typingElements = document.querySelectorAll('.typing');
  typingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 3}s`;
  });

  // Carousel Logic
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('dots');
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        carousel.scrollTo({ left: testimonials[i].offsetLeft, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    });
    carousel.addEventListener('scroll', () => {
      const scrollLeft = carousel.scrollLeft;
      const width = testimonials[0].offsetWidth + 20;
      const index = Math.round(scrollLeft / width);
      document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === index));
    });
  }

  // Active Nav Link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('#navbar a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
