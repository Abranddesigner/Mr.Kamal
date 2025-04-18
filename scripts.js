function toggleMenu() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  navbar.classList.toggle('show');
  const isExpanded = navbar.classList.contains('show');
  menuToggle.setAttribute('aria-expanded', isExpanded);
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  const button = document.querySelector('.mode-toggle');
  const isDarkMode = document.body.classList.contains('dark-mode');
  button.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
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
});

document.addEventListener('DOMContentLoaded', () => {
  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
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
