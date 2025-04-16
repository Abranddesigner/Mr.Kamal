function toggleMenu() {
  document.getElementById('navbar').classList.toggle('show');
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
  const button = document.querySelector('.mode-toggle');
  if (button) {
    button.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
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
});