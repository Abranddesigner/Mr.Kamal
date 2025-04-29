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
  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('show');
      menuToggle.setAttribute('aria-expanded', navbar.classList.contains('show'));
    });
  }

  // Hover Conversion for Title
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    headerTitle.addEventListener('mouseover', () => {
      headerTitle.textContent = headerTitle.getAttribute('data-hover-text');
    });
    headerTitle.addEventListener('mouseout', () => {
      headerTitle.textContent = 'Mr. Kamal Designer';
    });
  }

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
      console.error('Buy Now Error:', error);
    }
  }

  // Show QR Code Popup
  window.showQRPopup = function(product, amount) {
    const qrPopup = document.getElementById('qrPopup');
    const qrCodeImg = document.getElementById('qrCodeImg');
    if (qrPopup && qrCodeImg) {
      qrCodeImg.src = 'https://raw.githubusercontent.com/Abranddesigner/Mr.Kamal/main/QR%20Code.jpg';
      qrCodeImg.onerror = () => {
        alert('Failed to load QR code. Please contact +918440048355 to complete payment.');
        console.error('QR Code failed to load');
      };
      qrPopup.style.display = 'flex';
    } else {
      alert('QR Popup not found. Please contact +918440048355 to complete payment.');
      console.error('QR Popup elements missing');
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
    } else {
      console.error('Send SS button not found');
    }
  }

  // Open Popup for Images
  window.openPopup = function(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      popupImg.src = src;
      popupImg.onerror = () => {
        alert('Failed to load image. Please try again.');
        console.error('Image failed to load:', src);
      };
      popup.style.display = 'flex';
    } else {
      alert('Image popup not available. Please try again.');
      console.error('Popup or popupImg element not found');
    }
  }

  // Close Popup
  window.closePopup = function() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  // Contact Form Submit Button
  const submitButton = document.getElementById('submitButton');
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (submitButton && form && formMessage) {
    submitButton.addEventListener('click', () => {
      console.log('Submit button clicked');
      if (form.checkValidity()) {
        try {
          const name = document.getElementById('name').value.trim();
          const address = document.getElementById('address').value.trim();
          const mobile = document.getElementById('mobile').value.trim();
          const email = document.getElementById('email').value.trim();
          const content = document.getElementById('content').value.trim();

          if (!name || !address || !mobile || !email || !content) {
            throw new Error('All fields are required.');
          }

          let message = `New Order Submission:\n\n` +
                        `Name: ${name}\n` +
                        `Address: ${address}\n` +
                        `Mobile: ${mobile}\n` +
                        `Email: ${email}\n` +
                        `Content: ${content}\n` +
                        `Note: Photos/documents must be sent via WhatsApp in PDF or document format to +918440048355.`;
          const encodedMessage = encodeURIComponent(message);
          const whatsappUrl = `https://wa.me/918440048355?text=${encodedMessage}`;

          console.log('WhatsApp URL:', whatsappUrl);
          window.open(whatsappUrl, '_blank');

          formMessage.style.display = 'block';
          formMessage.textContent = 'Order submitted successfully! Check WhatsApp for details.';
          formMessage.style.color = '#25D366';
          alert('Order data sent to WhatsApp! Please send photos/documents in PDF or document format to +918440048355.');

          form.reset();
        } catch (error) {
          console.error('Form submission error:', error);
          formMessage.style.display = 'block';
          formMessage.textContent = 'Error sending order to WhatsApp. Please try again.';
          formMessage.style.color = '#DC2626';
        }
      } else {
        console.log('Form validation failed');
        formMessage.style.display = 'block';
        formMessage.textContent = 'Please fill all required fields correctly.';
        formMessage.style.color = '#DC2626';
        form.reportValidity();
      }
    });
  } else {
    console.error('Form elements not found: submitButton, form, or formMessage');
  }
});
