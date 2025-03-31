import { teamBios } from './bios-data.js';

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
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
      
      document.getElementById('modal-body').innerHTML = modalContent;
      document.getElementById('bio-modal').classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
  // Close modal
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('bio-modal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });
  
  // Close when clicking outside content
  document.getElementById('bio-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.getElementById('bio-modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
});