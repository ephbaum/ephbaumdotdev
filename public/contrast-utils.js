// WCAG Contrast Ratio Calculation Utilities
// Implements WCAG AA standards: 4.5:1 for normal text, 3:1 for large text

/**
 * Convert hex color to RGB values
 * @param {string} hex - Hex color string (e.g., "#ff0000")
 * @returns {object} RGB object with r, g, b values
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate relative luminance of a color
 * @param {object} rgb - RGB object with r, g, b values
 * @returns {number} Relative luminance value (0-1)
 */
function getRelativeLuminance(rgb) {
  const { r, g, b } = rgb;
  
  // Convert to sRGB
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;
  
  // Apply gamma correction
  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1:1 to 21:1)
 */
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    console.warn('Invalid hex colors provided:', color1, color2);
    return 1; // Minimum contrast
  }
  
  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color pair meets WCAG AA standards
 * @param {string} foreground - Foreground color hex
 * @param {string} background - Background color hex
 * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns {boolean} True if meets WCAG AA standards
 */
function meetsWCAGAA(foreground, background, isLargeText = false) {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 3 : 4.5;
  return ratio >= requiredRatio;
}

/**
 * Check if a color pair meets WCAG AAA standards
 * @param {string} foreground - Foreground color hex
 * @param {string} background - Background color hex
 * @param {boolean} isLargeText - Whether text is large (18pt+ or 14pt+ bold)
 * @returns {boolean} True if meets WCAG AAA standards
 */
function meetsWCAGAAA(foreground, background, isLargeText = false) {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 4.5 : 7;
  return ratio >= requiredRatio;
}

/**
 * Determine if text should be considered "large" based on CSS classes
 * @param {Element} element - DOM element
 * @returns {boolean} True if text is large
 */
function isLargeText(element) {
  if (!element) return false;
  
  const classList = element.classList.toString();
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseFloat(computedStyle.fontSize);
  const fontWeight = computedStyle.fontWeight;
  
  // Check for large text classes (common patterns)
  const largeTextClasses = [
    'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
    'text-lg', 'text-size-xl', 'text-size-lg', 'text-size-md'
  ];
  
  const hasLargeClass = largeTextClasses.some(cls => classList.includes(cls));
  const isLargeSize = fontSize >= 18; // 18pt threshold
  const isBoldLarge = fontWeight >= 700 && fontSize >= 14; // 14pt bold threshold
  
  return hasLargeClass || isLargeSize || isBoldLarge;
}

/**
 * Find accessible color pairs from a palette
 * @param {Array} colors - Array of color names
 * @param {Object} colorMap - Object mapping color names to hex values
 * @param {string} defaultForeground - Default foreground color (usually black)
 * @returns {Array} Array of accessible color pairs
 */
function findAccessiblePairs(colors, colorMap, defaultForeground = '#000000') {
  const accessiblePairs = [];
  
  colors.forEach(colorName => {
    const colorHex = colorMap[colorName];
    if (colorHex && meetsWCAGAA(defaultForeground, colorHex, false)) {
      accessiblePairs.push({
        foreground: defaultForeground,
        background: colorHex,
        backgroundName: colorName,
        ratio: getContrastRatio(defaultForeground, colorHex)
      });
    }
  });
  
  return accessiblePairs.sort((a, b) => b.ratio - a.ratio); // Sort by highest contrast first
}

/**
 * Find accessible text/background pairs for colored text scenarios
 * @param {Array} colors - Array of color names
 * @param {Object} colorMap - Object mapping color names to hex values
 * @returns {Array} Array of accessible text/background pairs
 */
function findAccessibleTextPairs(colors, colorMap) {
  const accessiblePairs = [];
  
  colors.forEach(textColorName => {
    const textColorHex = colorMap[textColorName];
    if (!textColorHex) return;
    
    colors.forEach(bgColorName => {
      if (textColorName === bgColorName) return; // Skip same color
      
      const bgColorHex = colorMap[bgColorName];
      if (!bgColorHex) return;
      
      if (meetsWCAGAA(textColorHex, bgColorHex, false)) {
        accessiblePairs.push({
          foreground: textColorHex,
          foregroundName: textColorName,
          background: bgColorHex,
          backgroundName: bgColorName,
          ratio: getContrastRatio(textColorHex, bgColorHex)
        });
      }
    });
  });
  
  return accessiblePairs.sort((a, b) => b.ratio - a.ratio);
}

/**
 * Get a random accessible color for background with black text
 * @param {Array} colors - Array of color names
 * @param {Object} colorMap - Object mapping color names to hex values
 * @param {Array} excludedColors - Colors to exclude
 * @returns {string} Color name that works with black text
 */
function getRandomAccessibleBackground(colors, colorMap, excludedColors = []) {
  const accessiblePairs = findAccessiblePairs(colors, colorMap);
  const availablePairs = accessiblePairs.filter(pair => 
    !excludedColors.includes(pair.backgroundName)
  );
  
  if (availablePairs.length === 0) {
    // Fallback to white if no accessible colors available
    console.warn('No accessible background colors available, using white');
    return 'white';
  }
  
  const randomIndex = Math.floor(Math.random() * availablePairs.length);
  return availablePairs[randomIndex].backgroundName;
}

/**
 * Get a random accessible text/background pair
 * @param {Array} colors - Array of color names
 * @param {Object} colorMap - Object mapping color names to hex values
 * @returns {Object} Object with foregroundName, backgroundName, foreground, background
 */
function getRandomAccessibleTextPair(colors, colorMap) {
  const accessiblePairs = findAccessibleTextPairs(colors, colorMap);
  
  if (accessiblePairs.length === 0) {
    // Fallback to black on white
    console.warn('No accessible text pairs available, using black on white');
    return {
      foregroundName: 'black',
      backgroundName: 'white',
      foreground: '#000000',
      background: '#ffffff'
    };
  }
  
  const randomIndex = Math.floor(Math.random() * accessiblePairs.length);
  return accessiblePairs[randomIndex];
}

// Export functions for use in other scripts
window.ContrastUtils = {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  isLargeText,
  findAccessiblePairs,
  findAccessibleTextPairs,
  getRandomAccessibleBackground,
  getRandomAccessibleTextPair
};
