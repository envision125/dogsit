const slides = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dots span');
let currentIndex = 0;
let timer = null;
const slideInterval = 2000;

function goToSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
    dots[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    dots[i].setAttribute('tabindex', i === index ? '0' : '-1');
  });
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  goToSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  goToSlide(prevIndex);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(nextSlide, slideInterval);
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetTimer();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetTimer();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetTimer();
  });
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToSlide(i);
      resetTimer();
    }
  });
});

// Auto slide
timer = setInterval(nextSlide, slideInterval);

// Optional: Pause on hover
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
  clearInterval(timer);
});
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  resetTimer();
});
