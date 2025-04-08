import { teamBios } from './bios-data.js';

function initProfileBios() {
  // Check if required elements exist
  const bioModal = document.getElementById('bio-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');
  
  // Exit if not on a page with the modal
  if (!bioModal || !modalBody || !closeModal) return;

  // Modal toggle functionality
  document.querySelectorAll('.bio-toggle').forEach(button => {
    button.addEventListener('click', function() {
      const memberId = this.getAttribute('data-member');
      const member = teamBios[memberId];
      
      const modalContent = `
        <div class="modal-header">
          <h3>${member.name}</h3>
          <p class="position">${member.position}</p>
        </div>
        <div class="modal-bio">
          <p>${member.bio}</p>
        </div>
        ${member.social ? `
        <div class="modal-social">
          ${member.social.linkedin ? `<a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
          ${member.social.email ? `<a href="mailto:${member.social.email}"><i class="fas fa-envelope"></i> Email</a>` : ''}
        </div>
        ` : ''}
      `;
      
      modalBody.innerHTML = modalContent;
      bioModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
    bioModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close when clicking outside content
  bioModal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && bioModal.classList.contains('active')) {
      bioModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Wait for full page load
window.addEventListener('load', initProfileBios);