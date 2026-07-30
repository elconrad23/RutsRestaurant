const RAIL_LINKS = [
  {
    href: "coffee.html",
    title: "Coffee Menu",
    label: "Coffee & Tea",
    icon: `<path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Zm13 2h2a2 2 0 0 1 0 4h-2M3 22h16M8 5c0-1.2 1-1.7 1-3M12 5c0-1.2 1-1.7 1-3" />`,
  },
  {
    href: "pastry.html",
    title: "Pastry Menu",
    label: "Snacks",
    icon: `<path d="M3 14c2.8-5 6.8-6.5 12-4.5 2.2.8 3.8 2.5 5 5.5-2.5 1.9-5.5 2.8-9 2.8S5.2 16.9 3 14ZM7 13c.5 1.2 1.2 2.4 2.2 3.6M11 10.5c.2 2.2.9 4.4 2 6.5M15 10c-.1 2 .2 3.8 1 5.6" />`,
  },
  {
    href: "index.html#menus-heading",
    title: "Pizzas Menu",
    label: "Pizzas",
    icon: `<circle cx="12" cy="12" r="8" /><circle cx="9" cy="10" r="1" /><circle cx="15" cy="14" r="1" /><circle cx="15" cy="9" r="1" />`,
  },
  {
    href: "index.html#menus-heading",
    title: "Family Corner Menu",
    label: "Family Corner",
    icon: `<circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M3 20c.5-4 2.2-6 5-6s4.5 2 5 6M11 20c.5-4 2.2-6 5-6s4.5 2 5 6" />`,
  },
  {
    href: "index.html#menus-heading",
    title: "Soups Menu",
    label: "Soups",
    icon: `<path d="M4 12h16v2a8 8 0 0 1-16 0v-2ZM8 8c0-1 1-1.5 1-3M12 8c0-1 1-1.5 1-3M16 8c0-1 1-1.5 1-3" />`,
  },
  {
    href: "index.html#menus-heading",
    title: "Kids Delight Menu",
    label: "Kids Delight",
    icon: `<circle cx="12" cy="11" r="7" /><path d="M9 14c1.8 1.3 4.2 1.3 6 0M9 9h.01M15 9h.01" />`,
  },
  {
    href: "index.html#menus-heading",
    title: "Italian Corner Menu",
    label: "Italian Corner",
    icon: `<path d="M5 5h14M5 19h14M7 5l2 14M17 5l-2 14" />`,
  },
  {
    href: "location.html",
    title: "Location & Hours",
    label: "Location",
    icon: `<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" />`,
  },
  {
    href: "contact.html",
    title: "Contact & Reservations",
    label: "Contact",
    icon: `<rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" />`,
  },
];

function renderRail() {
  const mount = document.getElementById("rail-mount");
  if (!mount) return;

  const currentPage = (location.pathname.split("/").pop() || "index.html") || "index.html";

  const linksHtml = RAIL_LINKS.map((link) => {
    const targetPage = link.href.split("#")[0] || "index.html";
    // A link is "active" only when it points at this exact page
    // (the shared #menus-heading anchors on index.html never mark
    // themselves active — matching the original site behavior).
    const isActive = targetPage === currentPage && !link.href.includes("#");
    return `
      <a href="${link.href}" class="rail-link${isActive ? " active" : ""}" title="${link.title}"${isActive ? ' aria-current="page"' : ""}>
        <svg viewBox="0 0 24 24" aria-hidden="true">${link.icon}</svg>
        <span>${link.label}</span>
      </a>`;
  }).join("");

  const railHtml = `
    <aside class="rail" aria-label="Explore Ruts Navigation">
      <div class="rail-brand">
        <a href="index.html" class="rail-logo-link" title="Ruts Cafe &amp; Lounge Home">
          <img src="assets/images/logo.jpeg" alt="Ruts Logo" class="rail-logo-img" />
        </a>
      </div>
      <nav>${linksHtml}</nav>
    </aside>`;

  mount.outerHTML = railHtml;
}

/* ------------------------------------------------------------
   Horizontal menu-scroll controls (index.html "CURATED
   SPECIALTY MENUS" strip). Safe no-ops on pages that don't
   have these elements.
   ------------------------------------------------------------ */
function initMenuScrollControls() {
  const track = document.getElementById("menuScrollTrack");
  const toggleBtn = document.getElementById("menuToggleBtn");
  const leftBtn = document.getElementById("scrollLeftBtn");
  const rightBtn = document.getElementById("scrollRightBtn");

  if (!track) return;

  const stepSize = () => {
    const card = track.querySelector(".menu-card");
    const gap = 22;
    return card ? card.offsetWidth + gap : 320;
  };

  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      track.scrollBy({ left: -stepSize(), behavior: "smooth" });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      track.scrollBy({ left: stepSize(), behavior: "smooth" });
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const collapsed = track.classList.toggle("is-collapsed");
      toggleBtn.setAttribute("aria-expanded", String(!collapsed));
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderRail();
  initMenuScrollControls();
});

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
