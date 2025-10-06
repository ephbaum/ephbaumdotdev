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

// Apply colors to main background elements
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

            // Add new background color
            element.classList.add(`bg-${currentColors.primary}`);
        }
    });
}

// Apply colors to cards
function applyCardColors() {
    const cards = document.querySelectorAll('[data-brutal-card]');
    cards.forEach((card, index) => {
        // Remove existing color classes
        colors.forEach((color) => {
            card.classList.remove(`bg-${color}`, `border-${color}`);
        });

        // Apply new colors (cycle through available colors)
        const cardColor = colors[index % colors.length];
        card.classList.add(`bg-${cardColor}`, `border-${cardColor}`);
    });
}

// Apply colors to buttons and pills
function applyButtonColors() {
    const buttons = document.querySelectorAll('[data-brutal-button]');
    const pills = document.querySelectorAll('[data-brutal-pill]');

    [...buttons, ...pills].forEach((element, index) => {
        // Remove existing color classes
        colors.forEach((color) => {
            element.classList.remove(`bg-${color}`, `text-${color}`, `border-${color}`);
        });

        // Apply new colors
        const elementColor = colors[index % colors.length];
        element.classList.add(`bg-${elementColor}`, `border-${elementColor}`);
    });
}

// Apply dynamic hover effects
function applyHoverEffects() {
    // Update CSS custom properties for hover effects
    const root = document.documentElement;
    root.style.setProperty('--hover-color', colorMap[currentColors.hover]);

    // Apply hover classes to elements with hover effects
    const hoverElements = document.querySelectorAll('[data-brutal-hover]');
    hoverElements.forEach((element) => {
        // Remove existing hover classes
        colors.forEach((color) => {
            element.classList.remove(`hover:bg-${color}`, `hover:text-${color}`);
        });

        // Add new hover class
        element.classList.add(`hover:bg-${currentColors.hover}`);
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
