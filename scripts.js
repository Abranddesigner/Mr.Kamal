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

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('#navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
  });

  // Hover Conversion for Title
  const headerTitle = document.getElementById('header-title');
  headerTitle.addEventListener('mouseover', () => {
    headerTitle.textContent = headerTitle.getAttribute('data-hover-text');
  });
  headerTitle.addEventListener('mouseout', () => {
    headerTitle.textContent = 'Mr. Kamal Designer';
  });

  // Handle Buy Now Click
  window.handleBuyNow = function(product, amount) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const upiUrl = `upi://pay?pa=8440048355@ybl&pn=Kamal%20Meena&am=${amount}&cu=INR&tn=Purchase%20${encodeURIComponent(product)}`;

    try {
      if (isMobile) {
        window.location.href = upiUrl;
      } else {
        showQRPopup(product, amount);
      }
      showSendSSButton(product);
    } catch (error) {
      alert('Payment initiation failed. Please try again or contact support at +918440048355.');
      console.error(error);
    }
  }

  // Show QR Code Popup
  window.showQRPopup = function(product, amount) {
    const qrPopup = document.getElementById('qrPopup');
    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrPopup && qrCodeImg) {
      qrCodeImg.src = 'https://raw.githubusercontent.com/Abranddesigner/Mr.Kamal/main/QR%20Code.jpg';
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

  // Show Send SS on WhatsApp Button
  window.showSendSSButton = function(product) {
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) {
      sendSSButton.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20here’s%20the%20payment%20screenshot%20for%20${encodeURIComponent(product)}.`;
      sendSSButton.style.display = 'block';
    }
  }

  // Open Popup for Images
  window.openPopup = function(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      popupImg.src = src;
      popup.style.display = 'flex';
    } else {
      console.error('Popup or popupImg element not found!');
    }
  }

  // Close Popup
  window.closePopup = function() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Collect form data
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const mobile = document.getElementById('mobile').value;
      const email = document.getElementById('email').value;
      const content = document.getElementById('content').value;
      const photos = document.getElementById('photos').files;

      // Create message for WhatsApp
      let message = `New Contact Form Submission:\n\n` +
                    `Name: ${name}\n` +
                    `Address: ${address}\n` +
                    `Mobile: ${mobile}\n` +
                    `Email: ${email}\n` +
                    `Content: ${content}\n` +
                    `Photos: ${photos.length} file(s) uploaded`;

      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918440048355?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Alert user to send photos separately
      alert('Form submitted! Please send the uploaded photos directly via WhatsApp to +918440048355.');

      // Reset form
      contactForm.reset();
    });
  }

  // Testimonials Slider
  let currentIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const totalTestimonials = testimonials.length;
  const testimonialsSlider = document.getElementById('testimonials-slider');

  function updateTestimonials() {
    testimonials.forEach((card, index) => {
      card.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
  }

  window.slideLeft = function() {
    currentIndex = Math.max(0, currentIndex - 1);
    updateTestimonials();
  }

  window.slideRight = function() {
    currentIndex = Math.min(totalTestimonials - 1, currentIndex + 1);
    updateTestimonials();
  }

  // Auto-slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalTestimonials;
    updateTestimonials();
  }, 5000);

  // Initialize testimonials
  updateTestimonials();
});
