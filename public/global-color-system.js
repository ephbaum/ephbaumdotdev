// Global Color System for Dynamic UI Components
// This script manages colors across all components and pages

// Load contrast utilities
if (typeof window.ContrastUtils === 'undefined') {
  console.warn('ContrastUtils not loaded. Loading contrast-utils.js...');
  const script = document.createElement('script');
  script.src = '/contrast-utils.js';
  script.onload = () => {
    console.log('ContrastUtils loaded successfully');
    // Re-initialize colors after contrast utils are loaded
    if (window.BrutalColorSystem) {
      window.BrutalColorSystem.applyAllColors();
    }
  };
  document.head.appendChild(script);
}

// Available colors from the brutal-ui theme
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  "teal",
  "cyan",
  "lime",
  "emerald",
  "fuchsia",
  "violet",
  "rose",
  "sky",
  "amber",
];

// Color mappings to hex values (matching uno.config.ts)
const colorMap = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "#ffff00",
  pink: "#ff69b4",
  purple: "#800080",
  orange: "#ffa500",
  teal: "#008080",
  cyan: "#00ffff",
  lime: "#00ff00",
  emerald: "#50c878",
  fuchsia: "#ff00ff",
  violet: "#8a2be2",
  rose: "#ff69b4",
  sky: "#87ceeb",
  amber: "#ffbf00",
};

// Global color state
let currentColors = {
  primary: null,
  secondary: null,
  accent: null,
  hover: null,
};

// Disco mode state
let discoMode = false;
let discoInterval = null;

// Click tracking for rapid-click detection
let clickTimestamps = [];

// Helper function to get a random color different from excluded colors
function getRandomColorExcluding(excludedColors = []) {
  const availableColors = colors.filter(color => !excludedColors.includes(color));
  if (availableColors.length === 0) {
    // If all colors are excluded, just return a random color
    return colors[Math.floor(Math.random() * colors.length)];
  }
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

// Helper function to get a random accessible background color
function getRandomAccessibleColorExcluding(excludedColors = []) {
  if (typeof window.ContrastUtils === 'undefined') {
    console.warn('ContrastUtils not available, falling back to regular color selection');
    return getRandomColorExcluding(excludedColors);
  }
  
  try {
    return window.ContrastUtils.getRandomAccessibleBackground(colors, colorMap, excludedColors);
  } catch (error) {
    console.warn('Error getting accessible color, falling back to regular selection:', error);
    return getRandomColorExcluding(excludedColors);
  }
}

// Initialize colors
function initializeColors() {
  if (!colors || colors.length === 0) {
    console.warn('Colors array is not defined or empty');
    return;
  }

  currentColors = {
    primary: colors[Math.floor(Math.random() * colors.length)],
    secondary: colors[Math.floor(Math.random() * colors.length)],
    accent: colors[Math.floor(Math.random() * colors.length)],
    hover: colors[Math.floor(Math.random() * colors.length)],
  };
}

// Apply colors to main background elements (gets new random color on each change)
function applyMainBackgroundColors() {
  const mainElements = [
    document.getElementById("main-content"),
    document.getElementById("blog-main-content"),
    document.getElementById("tag-main-content"),
    document.getElementById("error-main-content"),
  ].filter(Boolean);

  mainElements.forEach((element) => {
    if (element) {
      // Remove any existing background color classes
      colors.forEach((color) => {
        element.classList.remove(`bg-${color}`);
      });

      // Add new random background color (changes on each palette button click)
      const mainBgColor = getRandomAccessibleColorExcluding();
      element.classList.add(`bg-${mainBgColor}`);
    }
  });
}

// Helper function to get parent's background color
function getParentBackgroundColor(element) {
  let parent = element.parentElement;
  while (parent) {
    const bgColor = window.getComputedStyle(parent).backgroundColor;
    // Check if it's one of our known colors
    for (const [colorName, colorHex] of Object.entries(colorMap)) {
      const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const rgb = `#${parseInt(rgbMatch[1]).toString(16).padStart(2, '0')}${parseInt(rgbMatch[2]).toString(16).padStart(2, '0')}${parseInt(rgbMatch[3]).toString(16).padStart(2, '0')}`;
        if (rgb.toLowerCase() === colorHex.toLowerCase()) {
          return colorName;
        }
      }
    }
    parent = parent.parentElement;
  }
  return null;
}

// Apply colors to cards (each card gets its own random color)
function applyCardColors() {
  // Target the specific card containers on the homepage
  const cardContainers = document.querySelectorAll('.col-span-4, .col-span-2');

  // Target blog post cards specifically
  const blogCards = document.querySelectorAll('[data-brutal-card]');

  // Target the Recent Blog Posts card
  const recentBlogPostsCard = document.querySelectorAll('[data-recent-blog-posts]');

  // Process homepage card containers
  cardContainers.forEach((container) => {
    // Find the card element within each container
    const card = container.querySelector('div, section, article') || container;

    // Skip if it's a button or pill
    if (card.hasAttribute('data-brutal-button') || card.hasAttribute('data-brutal-pill')) {
      return;
    }

    // Remove existing color classes
    colors.forEach((color) => {
      card.classList.remove(`bg-${color}`, `border-${color}`);
    });

    // Get parent background color and avoid using it
    const parentColor = getParentBackgroundColor(card);
    const cardColor = getRandomAccessibleColorExcluding(parentColor ? [parentColor] : []);
    card.classList.add(`bg-${cardColor}`);

    // Also apply the color directly as inline style to override any CSS specificity issues
    card.style.backgroundColor = colorMap[cardColor];
  });

  // Process blog post cards separately to avoid conflicts
  blogCards.forEach((card) => {
    // Skip if it's a button or pill
    if (card.hasAttribute('data-brutal-button') || card.hasAttribute('data-brutal-pill')) {
      return;
    }

    // Remove existing color classes
    colors.forEach((color) => {
      card.classList.remove(`bg-${color}`, `border-${color}`);
    });

    // Get parent background color and avoid using it
    const parentColor = getParentBackgroundColor(card);
    const cardColor = getRandomAccessibleColorExcluding(parentColor ? [parentColor] : []);
    card.classList.add(`bg-${cardColor}`);

    // Also apply the color directly as inline style to override any CSS specificity issues
    card.style.backgroundColor = colorMap[cardColor];
  });

  // Process Recent Blog Posts card
  recentBlogPostsCard.forEach((wrapper) => {
    // Find the Card component inside the wrapper
    const card = wrapper.querySelector('div, section, article') || wrapper;

    // Remove existing color classes
    colors.forEach((color) => {
      card.classList.remove(`bg-${color}`, `border-${color}`);
    });

    // Get parent background color and avoid using it
    const parentColor = getParentBackgroundColor(card);
    const cardColor = getRandomAccessibleColorExcluding(parentColor ? [parentColor] : []);
    card.classList.add(`bg-${cardColor}`);

    // Also apply the color directly as inline style to override any CSS specificity issues
    card.style.backgroundColor = colorMap[cardColor];
  });
}

// Apply colors to buttons and pills (each gets its own random color)
function applyButtonColors() {
  const buttons = document.querySelectorAll('[data-brutal-button]');
  const pills = document.querySelectorAll('[data-brutal-pill]');

  [...buttons, ...pills].forEach((element) => {
    // Remove existing color classes
    colors.forEach((color) => {
      element.classList.remove(`bg-${color}`, `text-${color}`, `border-${color}`);
    });

    // Also remove any existing inline border color styles
    element.style.borderColor = '';

    // For buttons, no default colors (background only on hover, borders stay black)
    if (element.hasAttribute('data-brutal-button')) {
      // Explicitly set border to black to override any existing border colors
      element.style.borderColor = '#000000';
    } else {
      // For pills, apply background color only (borders stay black)
      const elementColor = getRandomAccessibleColorExcluding();
      element.classList.add(`bg-${elementColor}`);
      element.style.backgroundColor = colorMap[elementColor];
    }
  });
}

// Apply dynamic hover effects
function applyHoverEffects() {
  // Update CSS custom properties for hover effects
  const root = document.documentElement;
  root.style.setProperty('--hover-color', colorMap[currentColors.hover]);

  // Apply hover classes to buttons and pills (background colors)
  const buttonHoverElements = document.querySelectorAll('[data-brutal-button][data-brutal-hover], [data-brutal-pill][data-brutal-hover]');
  buttonHoverElements.forEach((element) => {
    // Remove existing hover classes
    colors.forEach((color) => {
      element.classList.remove(`hover:bg-${color}`, `hover:text-${color}`);
    });

    // Add new random hover class
    const hoverColor = getRandomAccessibleColorExcluding();
    element.classList.add(`hover:bg-${hoverColor}`);
  });

  // Apply hover text colors to header navigation links (no background)
  const headerLinks = document.querySelectorAll('nav a:not([data-brutal-button]):not([data-brutal-pill])');
  headerLinks.forEach((element) => {
    // Remove existing hover text classes
    colors.forEach((color) => {
      element.classList.remove(`hover:text-${color}`);
    });

    // Add new random hover text color (no background)
    const hoverTextColor = colors[Math.floor(Math.random() * colors.length)];
    element.classList.add(`hover:text-${hoverTextColor}`);
  });
}

// Apply colors to draft badges and other special elements
function applySpecialElementColors() {
  const draftBadges = document.querySelectorAll('[data-brutal-draft]');
  draftBadges.forEach((badge) => {
    // Remove existing color classes
    colors.forEach((color) => {
      badge.classList.remove(`bg-${color}`);
    });

    // Apply new color
    badge.classList.add(`bg-${currentColors.accent}`);
  });
}

// Apply colors to footer links
function applyFooterColors() {
  const footer = document.querySelector('[data-brutal-footer]');
  if (!footer) return;

  // Get all links in the footer
  const footerLinks = footer.querySelectorAll('a');
  
  footerLinks.forEach((link) => {
    // Remove existing color classes
    colors.forEach((color) => {
      link.classList.remove(`text-${color}`);
    });

    // Get an accessible color for the link text
    const linkColor = getRandomAccessibleColorExcluding();
    link.classList.add(`text-${linkColor}`);
    
    // Also apply the color directly as inline style to override any CSS specificity issues
    link.style.color = colorMap[linkColor];
  });
}

// Main function to apply all color changes
function applyAllColors() {
  initializeColors();
  applyMainBackgroundColors();
  applyCardColors();
  applyButtonColors();
  applyFooterColors();
  applyHoverEffects();
  applySpecialElementColors();

  // Track color application with analytics
  if (typeof window !== 'undefined') {
    // Determine if this is the initial load or a color change
    const isInitialLoad = !window.colorSchemeInitialized;
    const eventName = isInitialLoad ? 'color_scheme_initialized' : 'color_scheme_applied';
    const action = isInitialLoad ? 'initialize_colors' : 'apply_colors';
    const source = isInitialLoad ? 'page_load' : 'user_interaction';

    // Mark as initialized after first load
    if (isInitialLoad) {
      window.colorSchemeInitialized = true;
    }

    // Track with Umami Analytics
    if (window.umami) {
      try {
        // Try newer API first (umami.track)
        if (typeof window.umami.track === 'function') {
          window.umami.track(eventName, {
            action: action,
            component: 'color_system',
            colors: currentColors ? {
              primary: currentColors.primary,
              secondary: currentColors.secondary,
              accent: currentColors.accent,
              hover: currentColors.hover
            } : null,
            source: source,
            page_url: window.location.pathname
          });
        }
        // Fallback to older API (umami as function)
        else if (typeof window.umami === 'function') {
          window.umami(eventName, {
            action: action,
            component: 'color_system',
            colors: currentColors ? {
              primary: currentColors.primary,
              secondary: currentColors.secondary,
              accent: currentColors.accent,
              hover: currentColors.hover
            } : null,
            source: source,
            page_url: window.location.pathname
          });
        }
      } catch (error) {
        console.warn('Umami tracking failed:', error);
      }
    }
  }
}

// Disco mode functions
function startDiscoMode() {
  if (discoMode) return; // Already in disco mode

  discoMode = true;
  console.log('🕺 DISCO MODE ACTIVATED! 🕺');

  // Show a fun notification
  showDiscoNotification('🕺 DISCO MODE ACTIVATED! 🕺<br>Click the palette button again to stop');

  // Change colors every 200ms for a groovy effect
  discoInterval = setInterval(() => {
    applyAllColors();
  }, 200);

  // Track disco mode activation
  if (window.umami) {
    try {
      if (typeof window.umami.track === 'function') {
        window.umami.track('disco_mode_activated', {
          action: 'activate_disco_mode',
          component: 'color_system'
        });
      }
    } catch (error) {
      console.warn('Umami tracking failed:', error);
    }
  }
}

function stopDiscoMode() {
  if (!discoMode) return;

  discoMode = false;
  console.log('🛑 Disco mode stopped');

  // Show notification
  showDiscoNotification('🛑 Disco mode stopped');

  if (discoInterval) {
    clearInterval(discoInterval);
    discoInterval = null;
  }

  // Track disco mode deactivation
  if (window.umami) {
    try {
      if (typeof window.umami.track === 'function') {
        window.umami.track('disco_mode_deactivated', {
          action: 'deactivate_disco_mode',
          component: 'color_system'
        });
      }
    } catch (error) {
      console.warn('Umami tracking failed:', error);
    }
  }
}

// Show a temporary notification
function showDiscoNotification(message) {
  // Remove any existing notification
  const existing = document.getElementById('disco-notification');
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'disco-notification';
  notification.innerHTML = message;
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    color: black;
    padding: 2rem 3rem;
    border: 4px solid black;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    z-index: 10000;
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 1);
    animation: disco-bounce 0.3s ease-in-out;
  `;

  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes disco-bounce {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.1); }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function toggleDiscoMode() {
  if (discoMode) {
    stopDiscoMode();
  } else {
    startDiscoMode();
  }
}

// Rapid-click detection
function trackColorButtonClick() {
  const now = Date.now();
  clickTimestamps.push(now);

  // Remove clicks older than 1 second
  clickTimestamps = clickTimestamps.filter(timestamp => now - timestamp <= 1000);

  // Check if we have 5 clicks within 1 second
  if (clickTimestamps.length >= 5) {
    toggleDiscoMode();
    clickTimestamps = []; // Reset click tracking
  }
}

// Konami code detection
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      toggleDiscoMode();
      konamiIndex = 0; // Reset
    }
  } else {
    konamiIndex = 0; // Reset if wrong key
  }
});

// Export functions for use in other scripts
window.BrutalColorSystem = {
  applyAllColors,
  applyMainBackgroundColors,
  applyCardColors,
  applyButtonColors,
  applyFooterColors,
  applyHoverEffects,
  applySpecialElementColors,
  startDiscoMode,
  stopDiscoMode,
  toggleDiscoMode,
  trackColorButtonClick,
  colors,
  colorMap,
  currentColors: () => currentColors,
  isDiscoMode: () => discoMode,
};
