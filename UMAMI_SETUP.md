# Analytics Integration

This blog uses Umami Cloud for analytics and custom events. Vercel Speed Insights
(`@vercel/speed-insights`) is loaded separately for Core Web Vitals; Vercel Web
Analytics is not wired up.

## Current Configuration

### Umami Cloud Analytics
- **Provider**: Umami Cloud
- **Script Loading**: Deferred for optimal performance
- **Privacy**: No cookies, GDPR compliant, no cross-site tracking
- **Data Retention**: Extended retention period
- **Dashboard**: External Umami dashboard

## How It Works

Umami is integrated in `BaseHead.astro`:

### Umami Cloud Integration
```astro
{
  import.meta.env.PUBLIC_UMAMI_WEBSITE_ID && (
    <script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id={import.meta.env.PUBLIC_UMAMI_WEBSITE_ID}
    />
  )
}
```

## Environment Variables

### Umami Cloud
The Umami script only loads when `PUBLIC_UMAMI_WEBSITE_ID` is set in the environment. This means:
- **Local development**: No Umami tracking (unless explicitly enabled)
- **Production**: Umami enabled via Vercel environment variables
- **Staging/Preview**: Can be configured per environment as needed

## Dashboard Access

### Umami Cloud Dashboard
Analytics data is available in the Umami Cloud dashboard. The integration tracks:
- Page views
- Unique visitors
- Referrers
- Device/browser information
- Geographic data (country level)
- Extended data retention

### Custom Event Tracking
Umami tracks custom events for user interactions:
- **Color Palette Clicks**: When users click the color palette button
- **Color Scheme Applications**: When new color schemes are applied to the site
- **Event Data**: Includes action type, component, and color information

Data collection is anonymized and privacy-focused.

## Features

### Umami Cloud
- ✅ **Privacy-focused**: No cookies, GDPR compliant
- ✅ **Lightweight**: Minimal impact on page load times
- ✅ **Self-hostable**: Can be hosted on your own infrastructure
- ✅ **Real-time**: See analytics data in real-time
- ✅ **No tracking**: Respects user privacy with no cross-site tracking
- ✅ **Free forever**: No usage limits

## 🔧 Technical Implementation

Umami is implemented in `src/components/layout/BaseHead.astro`:

### Umami Cloud Integration
```astro
<!-- Umami Analytics -->
{
  import.meta.env.PUBLIC_UMAMI_WEBSITE_ID && (
    <script
      defer
      src={
        import.meta.env.PUBLIC_UMAMI_SCRIPT_URL ||
        "https://cloud.umami.is/script.js"
      }
      data-website-id={import.meta.env.PUBLIC_UMAMI_WEBSITE_ID}
    />
  )
}
```

### Key Features:
- **Conditional Loading**: Umami only loads when environment variables are set
- **Environment-based**: Uses Astro's `import.meta.env` for Umami configuration
- **Performance Optimized**: Deferred, non-blocking script loading
- **Custom Events**: Tracks user interactions like color palette usage

### Custom Event Tracking Implementation
The color palette system includes custom event tracking:

```javascript
// Track color palette button clicks
window.trackEvent('color_palette_click', {
  action: 'change_colors',
  component: 'color_palette_button'
});

// Track color scheme applications
window.trackEvent('color_scheme_applied', {
  action: 'apply_colors',
  component: 'color_system',
  colors: {
    primary: currentColors.primary,
    secondary: currentColors.secondary,
    accent: currentColors.accent,
    hover: currentColors.hover
  }
});
```

## Troubleshooting

### Umami Cloud Issues
- **Script not loading**: Check that `PUBLIC_UMAMI_WEBSITE_ID` is set correctly
- **No data in dashboard**: Ensure the website ID matches exactly
- **Custom instance**: Make sure `PUBLIC_UMAMI_SCRIPT_URL` points to your self-hosted instance
- **Build errors**: Verify environment variables are properly set in both local and production environments

### General Issues
- **Not working**: Check browser console for JavaScript errors
- **Performance concerns**: The script is designed to be lightweight and non-blocking
- **Privacy compliance**: Umami is GDPR compliant and don't use cookies
