// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create the overlay element if it doesn't exist
  if (!document.querySelector('.transition-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
  }
  
  // Find all internal links
  document.querySelectorAll('a').forEach(function(link) {
    // Only handle links to the same site that aren't anchor links
    if (link.hostname === window.location.hostname && 
        !link.hasAttribute('target') && 
        !link.getAttribute('href').startsWith('#')) {
        
      link.addEventListener('click', function(e) {
        // Don't handle special clicks (modifier keys)
        if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
          return;
        }
        
        e.preventDefault();
        const destination = link.href;
        
        // Add active class to trigger the overlay
        document.body.classList.add('transition-active');
        
        // Navigate after a slight delay
        setTimeout(function() {
          window.location.href = destination;
        }, 300);
      });
    }
  });
});

// If someone navigates back/forward, we need to hide the overlay
window.addEventListener('pageshow', function(event) {
  // This works for both fresh loads and back-forward cache
  if (document.body.classList.contains('transition-active')) {
    document.body.classList.remove('transition-active');
  }
}); 