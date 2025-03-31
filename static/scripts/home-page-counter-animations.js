// Stats Counter Animation
function initStatsCounter() {
  const statsSection = document.querySelector('.stat-card-container');
  if (!statsSection) return;

  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let hasAnimated = false;

  function animateStats() {
    if (hasAnimated) return;
    
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
      hasAnimated = true;
      
      statNumbers.forEach(stat => {
        // Store original content before modifying
        const originalContent = stat.textContent;
        
        // Extract the first number found (ignoring + signs and commas)
        const numberMatch = originalContent.match(/\d+/);
        if (!numberMatch) {
          console.warn('No number found in counter:', stat);
          return;
        }
        
        const target = parseInt(numberMatch[0], 10);
        if (isNaN(target)) {
          console.warn('Invalid number in counter:', originalContent);
          return;
        }
        
        const duration = 2000;
        const startTime = performance.now();
        const hasPlus = originalContent.includes('+');
        
        const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const currentValue = Math.floor(progress * target);
          
          // Update the display - preserve all non-numeric characters
          stat.textContent = originalContent.replace(/\d+/, currentValue);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Ensure we end with the exact original content
            stat.textContent = originalContent;
          }
        };
        
        // Start the animation from 0
        stat.textContent = originalContent.replace(/\d+/, '0');
        requestAnimationFrame(animate);
      });
    }
  }

  // Initialize
  animateStats();
  
  // Scroll listener with debounce
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(animateStats, 50);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initStatsCounter);