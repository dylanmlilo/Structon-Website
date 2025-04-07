// accordiom.js

import { projects } from './ref-projects.js';

document.addEventListener('DOMContentLoaded', function() {
    
    // Render Projects
    function renderProjects() {
      const accordion = document.querySelector('.accordion');
      
      projects.forEach(project => {
        accordion.innerHTML += `
          <div class="accordion-item">
            <button class="accordion-header">
              <span>${project.title}</span>
              <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
              <div class="project-detail">
                <p><strong>Site:</strong> ${project.site}</p>
                <p><strong>Client:</strong> ${project.client}</p>
                <p><strong>Contact Person:</strong> ${project.contactPerson}</p>
                <p><strong>Contact Details:</strong> ${project.contactDetails}</p>
              </div>
            </div>
          </div>
        `;
      });
  
      // Initialize Accordion Functionality
      document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', function() {
          const item = this.parentElement;
          const content = this.nextElementSibling;
          
          // Close all other open items
          document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.querySelector('.accordion-header').classList.remove('active');
              otherItem.querySelector('.accordion-content').style.maxHeight = null;
            }
          });
          
          // Toggle current item
          this.classList.toggle('active');
          content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        });
      });
    }
  
    // Start the process
    renderProjects();
  });