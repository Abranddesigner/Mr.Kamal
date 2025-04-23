document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const backToTop = document.querySelector('.back-to-top');
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('.nav ul');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
  });
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  menuToggle.addEventListener('click', () => navUl.classList.toggle('active'));
  document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  const slides = document.querySelector('.slides');
  if (slides) {
    const images = slides.querySelectorAll('img');
    let currentSlide = 0;
    document.querySelector('.next').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % images.length;
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
    document.querySelector('.prev').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  function updateTestimonials() {
    testimonials.forEach((t, i) => {
      t.classList.remove('active');
      const offset = (i - currentTestimonial + testimonials.length) % testimonials.length;
      if (offset === 0) {
        t.classList.add('active');
        t.style.transform = 'translateX(0)';
      } else if (offset === 1) {
        t.style.transform = 'translateX(320px)';
      } else if (offset === testimonials.length - 1) {
        t.style.transform = 'translateX(-320px)';
      } else {
        t.style.transform = 'translateX(1000px)';
      }
    });
  }
  if (testimonials.length) {
    updateTestimonials();
    document.querySelector('.arrow.right').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonials();
    });
    document.querySelector('.arrow.left').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonials();
    });
  }
  document.querySelectorAll('.slides img, .gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      const popup = document.querySelector('.popup');
      popup.querySelector('img').src = img.src;
      popup.style.display = 'flex';
    });
  });
  document.querySelector('.close-popup').addEventListener('click', () => {
    document.querySelector('.popup').style.display = 'none';
  });
  function showQRPopup(product, price) {
    console.log(`Showing QR for ${product} at ₹${price}`);
    const qrPopup = document.querySelector('.qr-popup');
    qrPopup.style.display = 'flex';
    alert(`Please scan the QR code to pay ₹${price} for ${product}.`);
    showSendSSButton(product);
  }
  function showSendSSButton(product) {
    console.log(`Scheduling Send SS button for ${product}`);
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) {
      sendSSButton.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20here’s%20the%20payment%20screenshot%20for%20${encodeURIComponent(product)}.`;
      setTimeout(() => {
        sendSSButton.style.display = 'block';
        console.log('Send SS button displayed');
        alert('Send SS button is now visible. Please send the payment screenshot.');
      }, 120000);
    } else {
      console.error('Send SS button element not found');
      alert('Error: Send SS button not found. Please contact via WhatsApp.');
    }
  }
  function closeQRPopup() {
    document.querySelector('.qr-popup').style.display = 'none';
    const sendSSButton = document.getElementById('sendSSButton');
    if (sendSSButton) sendSSButton.style.display = 'none';
  }
  function handleBuyNow(product, price) {
    console.log(`Initiating purchase for ${product} at ₹${price}`);
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      const upiUrl = `upi://pay?pa=your-upi-id@upi&pn=Kamal%20Meena&am=${price}&cu=INR&tn=Payment%20for%20${encodeURIComponent(product)}`;
      console.log(`Attempting UPI payment: ${upiUrl}`);
      const startTime = Date.now();
      window.location.href = upiUrl;
      setTimeout(() => {
        if (Date.now() - startTime < 1000) {
          console.log('UPI app not detected, falling back to WhatsApp');
          window.location.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20I%20want%20to%20buy%20${encodeURIComponent(product)}%20for%20₹${price}.%20Please%20share%20payment%20details.`;
        }
      }, 500);
    } else {
      showQRPopup(product, price);
    }
  }
  document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.dataset.product;
      const price = button.dataset.price;
      handleBuyNow(product, price);
    });
  });
  document.querySelector('.close-qr').addEventListener('click', closeQRPopup);
});
