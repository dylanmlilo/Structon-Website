document.addEventListener('DOMContentLoaded', function() {
  fetch('/static/files/structured-data.json')  // Hardcoded path
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON (HTTP ' + response.status + ')');
      return response.json();
    })
    .then(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    })
    .catch(error => console.error('Structured data error:', error));
});