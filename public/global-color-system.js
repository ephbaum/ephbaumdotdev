// Global Color System for Dynamic UI Components
// This script manages colors across all components and pages

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

// Initialize colors
function initializeColors() {
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
      const mainBgColor = colors[Math.floor(Math.random() * colors.length)];
      element.classList.add(`bg-${mainBgColor}`);
    }
  });
}

// Apply colors to cards (each card gets its own random color)
function applyCardColors() {
  // Target the specific card containers on the homepage
  const cardContainers = document.querySelectorAll('.col-span-4, .col-span-2');

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

    // Apply new random color for each card (background only, keep borders black)
    const cardColor = colors[Math.floor(Math.random() * colors.length)];
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
      const elementColor = colors[Math.floor(Math.random() * colors.length)];
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
    const hoverColor = colors[Math.floor(Math.random() * colors.length)];
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

// Main function to apply all color changes
function applyAllColors() {
  initializeColors();
  applyMainBackgroundColors();
  applyCardColors();
  applyButtonColors();
  applyHoverEffects();
  applySpecialElementColors();

  // Track color application with analytics
  if (typeof window !== 'undefined') {
    // Track with Vercel Analytics
    if (window.va) {
      window.va('event', 'color_scheme_applied');
    }

    // Track with Umami Analytics
    if (window.umami && typeof window.umami === 'function') {
      try {
        window.umami('color_scheme_applied', {
          action: 'apply_colors',
          component: 'color_system',
          colors: {
            primary: currentColors.primary,
            secondary: currentColors.secondary,
            accent: currentColors.accent,
            hover: currentColors.hover
          }
        });
      } catch (error) {
        console.warn('Umami tracking failed:', error);
      }
    }
  }
}

// Export functions for use in other scripts
window.BrutalColorSystem = {
  applyAllColors,
  applyMainBackgroundColors,
  applyCardColors,
  applyButtonColors,
  applyHoverEffects,
  applySpecialElementColors,
  colors,
  colorMap,
  currentColors: () => currentColors,
};
