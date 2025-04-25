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
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    const button = document.querySelector('.mode-toggle');
    button.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
  if (localStorage.getItem('theme') === 'dark') toggleMode();

  // Header Title Hover Effect
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    headerTitle.addEventListener('mouseenter', () => {
      headerTitle.textContent = 'कमल डिज़ाइनर';
      headerTitle.style.color = '#DC2626';
    });
    headerTitle.addEventListener('mouseleave', () => {
      headerTitle.textContent = 'Mr. Kamal Designer';
      headerTitle.style.color = '#DC2626';
    });
  }

  // Handle Buy Now Click
  function handleBuyNow(product, amount) {
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
  function showQRPopup(product, amount) {
    const qrPopup = document.getElementById('qrPopup');
    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrPopup && qrCodeImg) {
      qrPopup.style.display = 'flex';
    }
  }

  // Close QR Code Popup
  function closeQRPopup() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
      qrPopup.style.display = 'none';
    }
  }

  // Show Send SS on WhatsApp Button after 2 minutes
  function showSendSSButton(product) {
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) {
      sendSSButton.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20here’s%20the%20payment%20screenshot%20for%20${encodeURIComponent(product)}.`;
      setTimeout(() => {
        sendSSButton.style.display = 'block';
      }, 120000);
    }
  }

  // Open Popup for Images
  function openPopup(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      let cleanSrc = src.replace(/%20/g, ' ').replace('?raw=true', '');
      popupImg.src = cleanSrc.includes('github.com') ? cleanSrc + '?raw=true' : cleanSrc;
      popup.style.display = 'flex';
    }
  }

  function closePopup() {
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
      } else {
        card.classList.remove('active');
      }
    });
    if (testimonialsSlider) {
      testimonialsSlider.style.transform = `translateX(-${currentIndex * (300 + 20)}px)`;
    }
  }

  function slideLeft() {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
  }

  function slideRight() {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonials();
  }

  // Initialize testimonials
  updateTestimonials();
  setInterval(() => {
    slideRight();
  }, 5000);
});
