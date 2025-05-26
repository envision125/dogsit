const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('expanded');
  hamburger.classList.toggle('active');
});

// Reset menu state on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 635) {
    navLinks.classList.remove('expanded');
    hamburger.classList.remove('active');
  }
});
