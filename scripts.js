function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('show');
}

function openPopup(src) {
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popupImg');
  popupImg.src = src;
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

function showQR(plan, amount) {
  const qrPopupLeft = document.getElementById('qrPopupLeft');
  const qrPopupRight = document.getElementById('qrPopupRight');
  qrPopupLeft.style.display = 'flex';
  qrPopupRight.style.display = 'flex';
}

function closeQR() {
  const qrPopupLeft = document.getElementById('qrPopupLeft');
  const qrPopupRight = document.getElementById('qrPopupRight');
  qrPopupLeft.style.display = 'none';
  qrPopupRight.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitButton');
  const formMessage = document.getElementById('formMessage');

  submitButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const content = document.getElementById('content').value;

    if (name && address && mobile && email && content) {
      formMessage.style.display = 'block';
      formMessage.textContent = 'Order placed successfully! We will contact you soon.';
      form.reset();
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    } else {
      formMessage.style.display = 'block';
      formMessage.textContent = 'Please fill all fields!';
    }
  });

  const handleBuyNow = (plan, amount) => {
    window.location.href = `https://wa.me/918440048355?text=Hi%20Kamal,%20I%20want%20to%20buy%20the%20${plan}%20for%20₹${amount}`;
  };

  window.handleBuyNow = handleBuyNow;
});
