document.addEventListener('DOMContentLoaded', function() {
  // Image URLs
  const images = [
    '../static/images/e-moyo-plan-1.png',
    '../static/images/construction.jpg',
    '../static/images/r2-full.png',
    '../static/images/nice-house.png',
    '../static/images/engineers-onsite.jpg',
    '../static/images/workers-placing-new-coating-asphalt-road.jpg',
    '../static/images/excavator-digging.jpg',
    '../static/images/recently-finished-house2.jpg'
  ];
  
  // Shuffle the images array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const shuffledImages = shuffleArray([...images]); // Create a shuffled copy
  
  const slider = document.querySelector('.hero-slider');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds
  
  // Create slides and dots using SHUFFLED images
  shuffledImages.forEach((image, index) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.backgroundImage = `url(${image})`;
    if (index === 0) slide.classList.add('active');
    slider.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  // Next slide function
  function nextSlide() {
    goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }
  
  // Previous slide function
  function prevSlide() {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }
  
  // Go to specific slide
  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetInterval();
  }
  
  // Reset the autoplay interval
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Start autoplay
  slideInterval = setInterval(nextSlide, intervalTime);
  
  // Pause on hover (optional)
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', resetInterval);
});