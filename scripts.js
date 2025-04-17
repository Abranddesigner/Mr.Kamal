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
  }
    function toggleMenu() {
      document.getElementById('navbar').classList.toggle('show');
    }

    function toggleMode() {
      document.body.classList.toggle('dark-mode');
      const button = document.querySelector('.mode-toggle');
      button.textContent = document.body.classList.contains('dark-mode')
        ? 'Switch to Light Mode'
        : 'Switch to Dark Mode';
    }

    function confirmPurchase(button, type, amount) {
      if (confirm(Proceed to pay ₹${amount} for ${type} CDR file?)) {
        const upiLink = upi://pay?pa=8440048355@ybl&pn=Kamal&am=${amount}&cu=INR;
        window.location.href = upiLink;

        let timeLeft = 1 * 60; // 1 minutes
        button.disabled = true;

        const timer = setInterval(() => {
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          button.textContent = ⏳ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')};
          timeLeft--;

          if (timeLeft < 0) {
            clearInterval(timer);
            button.textContent = 'Buy Now';
            button.disabled = false;
            const whatsappBtn = document.createElement('a');
            whatsappBtn.className = 'buy-btn';
            whatsappBtn.href = `https://wa.me/918440048355?text=${encodeURIComponent(
              Hello, I have paid for the ${type} CDR file. Please check screenshot.
            )}`;
            whatsappBtn.target = '_blank';
            whatsappBtn.textContent = 'Send Screenshot';
            whatsappBtn.style.marginLeft = '10px';
            button.parentNode.appendChild(whatsappBtn);
          }
        }, 1000);
      }
    }
  });
});
