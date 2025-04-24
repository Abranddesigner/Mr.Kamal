document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Sections
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));

  // Back to Top
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
    });
  }

  // Dark/Light Mode Toggle
  function toggleMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    const button = document.querySelector('.mode-toggle');
    if (button) {
      button.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    }
  }
  if (localStorage.getItem('theme') === 'dark') toggleMode();
  document.querySelector('.mode-toggle')?.addEventListener('click', toggleMode);

  // Buy Now
  window.handleBuyNow = (product, amount) => {
    const button = event.target;
    button.classList.add('loading');
    button.textContent = 'Processing...';

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const upiUrl = `upi://pay?pa=8440048355@ybl&pn=Kamal%20Meena&am=${amount}&cu=INR&tn=Purchase%20${encodeURIComponent(product)}`;
    const fallbackUrl = `https://wa.me/918440048355?text=Hi%20Kamal,%20I%20want%20to%20pay%20₹${amount}%20for%20${encodeURIComponent(product)}.`;

    try {
      if (isMobile) {
        const startTime = Date.now();
        window.location.href = upiUrl;
        setTimeout(() => {
          button.classList.remove('loading');
          button.textContent = 'Buy Now';
          if (Date.now() - startTime < 1000) {
            alert('UPI app not found. Redirecting to WhatsApp.');
            window.location.href = fallbackUrl;
          }
        }, 2000);
      } else {
        showQRPopup();
        setTimeout(() => {
          button.classList.remove('loading');
          button.textContent = 'Buy Now';
        }, 1000);
      }
      showSendSSButton(product);
    } catch (error) {
      alert('Payment error. Try via WhatsApp.');
      window.location.href = fallbackUrl;
      button.classList.remove('loading');
      button.textContent = 'Buy Now';
    }
  };

  // QR Popup
  function showQRPopup() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
      document.getElementById('qrCodeImg').src = 'https://raw.githubusercontent.com/Abranddesigner/Mr.Kamal/refs/heads/main/QR%20Code.jpg?raw=true';
      qrPopup.classList.add('show');
      qrPopup.style.display = 'flex';
      alert('Scan the QR code with any UPI app.');
    }
  }

  window.closeQRPopup = () => {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
      qrPopup.classList.remove('show');
      setTimeout(() => qrPopup.style.display = 'none', 300);
    }
  };

  // Send SS Button
  function showSendSSButton(product) {
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) {
      sendSSButton.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20here’s%20the%20payment%20screenshot%20for%20${encodeURIComponent(product)}.`;
      setTimeout(() => {
        sendSSButton.style.display = 'block';
        alert('Send SS button visible. Please share the payment screenshot.');
      }, 30000);
    }
  }

  // Image Popup
  window.openPopup = (src) => {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      popupImg.src = src;
      popup.classList.add('show');
      popup.style.display = 'flex';
    }
  };

  window.closePopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.classList.remove('show');
      setTimeout(() => popup.style.display = 'none', 300);
    }
  };

  // Testimonials Slider
  let currentIndex = 2;
  const testimonials = document.querySelectorAll('.testimonial');
  const totalTestimonials = testimonials.length;

  function updateTestimonials() {
    testimonials.forEach((card, index) => {
      card.classList.remove('active');
      const offset = (index - currentIndex + totalTestimonials) % totalTestimonials;
      if (offset === 0) {
        card.classList.add('active');
        card.style.opacity = '1';
        card.style.filter = 'none';
      } else if (offset === 1 || offset === totalTestimonials - 1) {
        card.style.opacity = '0.7';
        card.style.filter = 'blur(3px)';
      } else {
        card.style.opacity = '0';
        card.style.filter = 'blur(3px)';
      }
    });
  }

  window.slideLeft = () => {
    currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
    updateTestimonials();
  };

  window.slideRight = () => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonials();
  };

  setInterval(slideRight, 6000);
  document.querySelector('.arrow-left')?.addEventListener('click', slideLeft);
  document.querySelector('.arrow-right')?.addEventListener('click', slideRight);
  updateTestimonials();
});
