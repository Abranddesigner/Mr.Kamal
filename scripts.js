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

  // Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
  });

  // Dark/Light Mode Toggle
  function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    const button = document.querySelector('.mode-toggle');
    button.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
  if (localStorage.getItem('theme') === 'dark') toggleMode();

  // Handle Buy Now Click
  window.handleBuyNow = function(product, amount) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const upiUrl = `upi://pay?pa=8440048355@ybl&pn=Kamal%20Meena&am=${amount}&cu=INR&tn=Purchase%20${encodeURIComponent(product)}`;

    if (isMobile) {
      window.location.href = upiUrl;
    } else {
      showQRPopup(product, amount);
    }

    showSendSSButton(product);
  }

  // Show QR Code Popup
  window.showQRPopup = function(product, amount) {
    const qrPopup = document.getElementById('qrPopup');
    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrPopup && qrCodeImg) {
      qrCodeImg.src = 'https://raw.githubusercontent.com/Abranddesigner/Mr.Kamal/refs/heads/main/QR%20Code.jpg';
      qrPopup.style.display = 'flex';
    }
  }

  // Close QR Code Popup
  window.closeQRPopup = function() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
      qrPopup.style.display = 'none';
    }
  }

  // Show Send SS on WhatsApp Button after 2 minutes
  window.showSendSSButton = function(product) {
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) {
      sendSSButton.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20here’s%20the%20payment%20screenshot%20for%20${encodeURIComponent(product)}.`;
      setTimeout(() => {
        sendSSButton.style.display = 'block';
      }, 120000);
    }
  }

  // Open Popup for Images
  window.openPopup = function(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      let cleanSrc = src.replace(/%20/g, ' ').replace('?raw=true', '');
      popupImg.src = cleanSrc.includes('github.com') ? cleanSrc + '?raw=true' : cleanSrc;
      popup.style.display = 'flex';
    } else {
      console.error('Popup or popupImg element not found!');
    }
  }

  window.closePopup = function() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  // Testimonials Slider
  let currentIndex = 2;
  const testimonials = document.querySelectorAll('.testimonial');
  const totalTestimonials = testimonials.length;
  const testimonialsSlider = document.getElementById('testimonials-slider');

  function updateTestimonials() {
    testimonials.forEach((card, index) => {
      card.classList.remove('active');
      const offset = (index - currentIndex + totalTestimonials) % totalTestimonials;
      if (offset === 0) {
        card.classList.add('active');
      }
    });

    if (testimonialsSlider) {
      const testimonialWidth = testimonials[0].offsetWidth + 20; // Include gap
      const centerOffset = (testimonialsSlider.offsetWidth - testimonialWidth) / 2;
      testimonialsSlider.style.transform = `translateX(${centerOffset - (currentIndex * testimonialWidth)}px)`;
    }
  }

  window.slideLeft = function() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
  }

  window.slideRight = function() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonials();
  }

  // Initialize testimonials
  updateTestimonials();
  setInterval(() => {
    slideRight();
  }, 5000);
});
