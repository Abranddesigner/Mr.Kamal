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
    button.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Light Mode';
  }
  if (localStorage.getItem('theme') === 'dark') toggleMode();

  // Handle Buy Now Click
  function handleBuyNow(product, amount) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const upiUrl = `upi://pay?pa=8440048355@ybl&pn=Kamal%20Meena&am=${amount}&cu=INR&tn=Purchase%20${encodeURIComponent(product)}`;

    if (isMobile) {
      window.location.href = upiUrl; // Direct UPI app open on mobile
    } else {
      showQRPopup(); // QR popup on PC
    }

    showSendSSButton(product);
  }

  // Show QR Code Popup
  function showQRPopup() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
      const qrCodeImg = document.getElementById('qrCodeImg');
      qrCodeImg.src = 'https://raw.githubusercontent.com/Abranddesigner/Mr.Kamal/refs/heads/main/QR%20Code.jpg';
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
      }, 120000); // 2 minutes
    }
  }

  // Open Popup for Gallery Images
  function openPopup(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    if (popup && popupImg) {
      popupImg.src = src;
      popup.style.display = 'flex';
    }
  }

  function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }
});
