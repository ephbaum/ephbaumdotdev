# Umami Analytics Integration

This blog uses Umami for privacy-focused analytics. The integration is already configured and working.

## Current Configuration

- **Analytics Provider**: Umami Cloud
- **Script Loading**: Deferred for optimal performance
- **Privacy**: No cookies, GDPR compliant, no cross-site tracking

## How It Works

The analytics script is conditionally loaded in `BaseHead.astro`:

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

The script only loads when `PUBLIC_UMAMI_WEBSITE_ID` is set in the environment. This means:
- **Local development**: No analytics tracking (unless explicitly enabled)
- **Production**: Analytics enabled via Vercel environment variables
- **Staging/Preview**: Can be configured per environment as needed

## Dashboard Access

Analytics data is available in the Umami Cloud dashboard. The integration tracks:
- Page views
- Unique visitors
- Referrers
- Device/browser information
- Geographic data (country level)

All data is anonymized and privacy-focused.

## Features

- ✅ **Privacy-focused**: Umami doesn't use cookies and is GDPR compliant
- ✅ **Lightweight**: Minimal impact on page load times
- ✅ **Self-hostable**: Can be hosted on your own infrastructure
- ✅ **Real-time**: See analytics data in real-time
- ✅ **No tracking**: Respects user privacy with no cross-site tracking

## 🔧 Technical Implementation

The Umami integration is implemented in `src/components/layout/BaseHead.astro`:

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
- **Conditional Loading**: Only loads when environment variables are set
- **Environment-based**: Uses Astro's `import.meta.env` for configuration
- **Performance Optimized**: Uses `defer` attribute for non-blocking loading
- **Flexible**: Supports both Umami Cloud and self-hosted instances

## Troubleshooting

- **Script not loading**: Check that `PUBLIC_UMAMI_WEBSITE_ID` is set correctly
- **No data in dashboard**: Ensure the website ID matches exactly
- **Custom instance**: Make sure `PUBLIC_UMAMI_SCRIPT_URL` points to your self-hosted instance
- **Build errors**: Verify environment variables are properly set in both local and production environments
