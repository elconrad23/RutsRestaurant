// Ruts Cafe & Lounge - Interactive Controller

document.addEventListener('DOMContentLoaded', () => {
  initActiveSidebarLink();
  initHorizontalMenuScroll();
  initHeroAnimations();
});

// 1. Sidebar Active State & Navigation Handling
function initActiveSidebarLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const railLinks = document.querySelectorAll('.rail-link');

  railLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check if link matches current HTML page or anchor
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href.startsWith('#') && (currentPath === 'index.html' || currentPath === '')) {
      link.addEventListener('click', () => {
        railLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    }
  });
}

// 2. Sideways Scrolling Menu Controls
function initHorizontalMenuScroll() {
  const scrollTrack = document.getElementById('menuScrollTrack');
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');

  if (!scrollTrack) return;

  const scrollAmount = 320; // width of one menu card + gap

  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => {
      scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => {
      scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Keyboard accessibility for scrolling track
  scrollTrack.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  });
}

// 3. Hero & Page Micro-interactions
function initHeroAnimations() {
  const heroCopy = document.querySelector('.hero-copy');
  const heroImage = document.querySelector('.hero-image');

  if (heroCopy) {
    heroCopy.style.opacity = '1';
  }
  if (heroImage) {
    heroImage.style.opacity = '1';
  }
}
