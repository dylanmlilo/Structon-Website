import { projectsData } from './projects-data.js';

document.addEventListener('DOMContentLoaded', function() {
    // Main projects initialization
    function initProjects() {
      // Initialize all project cards
      document.querySelectorAll('.project-item').forEach(item => {
        const projectId = item.id;
        const projectData = projectsData[projectId];
        
        if (!projectData) return;
        
        // Inject images
        const swiperWrapper = item.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = projectData.images.map(imgSrc => 
          `<div class="swiper-slide"><img src="${imgSrc}" alt="${projectData.title}"></div>`
        ).join('');
        
        // Initialize Swiper
        new Swiper(item.querySelector('.project-swiper'), {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: item.querySelector('.swiper-pagination'),
            clickable: true,
          },
          navigation: {
            nextEl: item.querySelector('.swiper-button-next'),
            prevEl: item.querySelector('.swiper-button-prev'),
          },
        });
      });
  
      // Filter functionality
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Update active button
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // Filter projects
          const filterValue = this.dataset.filter;
          document.querySelectorAll('.project-item').forEach(item => {
            item.style.display = (filterValue === 'all' || item.dataset.category === filterValue) 
              ? 'block' 
              : 'none';
          });
        });
      });
    }
  
    // Stats counter animation
    function initStatsCounter() {
      const statsSection = document.querySelector('.stats-section');
      if (!statsSection) return;
  
      const statNumbers = document.querySelectorAll('.stat-number');
      if (statNumbers.length === 0) return;
  
      function animateStats() {
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
          statNumbers.forEach(stat => {
            const target = +stat.dataset.count;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                clearInterval(counter);
                stat.textContent = target.toLocaleString(); // Format numbers
              } else {
                stat.textContent = Math.floor(current).toLocaleString();
              }
            }, 16);
          });
          
          // Remove event listener after animation
          window.removeEventListener('scroll', animateStats);
        }
      }
  
      // Initialize on scroll
      window.addEventListener('scroll', animateStats);
      // Run immediately if already in view
      animateStats();
    }
  
    // Initialize all functionality
    initProjects();
    initStatsCounter();
  });