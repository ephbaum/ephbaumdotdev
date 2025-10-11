/**
 * Centralized Analytics Tracking Function
 * 
 * This function provides analytics tracking using Umami Analytics only.
 * 
 * @param {string} eventName - The name of the event to track
 * @param {Object} properties - Additional properties to include with the event
 */
function trackEvent(eventName, properties = {}) {
    // Umami Analytics only
    if (window.umami && typeof window.umami.track === 'function') {
        try {
            window.umami.track(eventName, {
                timestamp: new Date().toISOString(),
                page_url: window.location.href,
                page_title: document.title,
                ...properties
            });
        } catch (error) {
            console.warn('Umami tracking failed:', error);
        }
    }
}

// Make trackEvent available globally
window.trackEvent = trackEvent;

// TypeScript declaration for global window object
if (typeof window !== 'undefined') {
    window.trackEvent = trackEvent;
}
