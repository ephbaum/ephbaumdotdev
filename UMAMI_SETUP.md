# Analytics Integration

This blog uses dual analytics systems for comprehensive website insights: Umami Cloud and Vercel Web Analytics.

## Current Configuration

### Umami Cloud Analytics
- **Provider**: Umami Cloud
- **Script Loading**: Deferred for optimal performance
- **Privacy**: No cookies, GDPR compliant, no cross-site tracking
- **Data Retention**: Extended retention period
- **Dashboard**: External Umami dashboard

### Vercel Web Analytics
- **Provider**: Vercel Web Analytics
- **Script Loading**: Automatic injection via @vercel/analytics
- **Privacy**: No cookies, GDPR compliant
- **Data Retention**: 30 days (free tier)
- **Dashboard**: Built into Vercel project dashboard

## How It Works

Both analytics systems are integrated in `BaseHead.astro`:

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

### Vercel Analytics Integration
```astro
<script>
  import { inject } from "@vercel/analytics";
  inject();
</script>
```

## Environment Variables

### Umami Cloud
The Umami script only loads when `PUBLIC_UMAMI_WEBSITE_ID` is set in the environment. This means:
- **Local development**: No Umami tracking (unless explicitly enabled)
- **Production**: Umami enabled via Vercel environment variables
- **Staging/Preview**: Can be configured per environment as needed

### Vercel Analytics
Vercel Analytics automatically loads when deployed to Vercel:
- **Local development**: No Vercel analytics tracking
- **Production**: Automatically enabled on Vercel deployments
- **Preview deployments**: Enabled on Vercel preview URLs

## Dashboard Access

### Umami Cloud Dashboard
Analytics data is available in the Umami Cloud dashboard. The integration tracks:
- Page views
- Unique visitors
- Referrers
- Device/browser information
- Geographic data (country level)
- Extended data retention

### Vercel Analytics Dashboard
Analytics data is available in the Vercel project dashboard under the "Analytics" tab. The integration tracks:
- Page views
- Unique visitors
- Performance metrics
- Deployment-related insights
- 30-day data retention (free tier)

Both systems provide anonymized and privacy-focused data collection.

## Features

### Umami Cloud
- ✅ **Privacy-focused**: No cookies, GDPR compliant
- ✅ **Lightweight**: Minimal impact on page load times
- ✅ **Self-hostable**: Can be hosted on your own infrastructure
- ✅ **Real-time**: See analytics data in real-time
- ✅ **No tracking**: Respects user privacy with no cross-site tracking
- ✅ **Free forever**: No usage limits

### Vercel Analytics
- ✅ **Privacy-focused**: No cookies, GDPR compliant
- ✅ **Built-in**: Integrated with Vercel dashboard
- ✅ **Performance insights**: Deployment and performance metrics
- ✅ **Free tier**: Up to 50k events/month
- ✅ **Real-time**: Immediate data availability
- ✅ **Redundancy**: Backup analytics system

## 🔧 Technical Implementation

Both analytics systems are implemented in `src/components/layout/BaseHead.astro`:

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

### Vercel Analytics Integration
```astro
<!-- Vercel Analytics -->
<script>
  import { inject } from "@vercel/analytics";
  inject();
</script>
```

### Key Features:
- **Dual Analytics**: Both systems run simultaneously for comprehensive insights
- **Conditional Loading**: Umami only loads when environment variables are set
- **Environment-based**: Uses Astro's `import.meta.env` for Umami configuration
- **Performance Optimized**: Both use non-blocking loading strategies
- **Redundancy**: Backup analytics system ensures data continuity

## Troubleshooting

### Umami Cloud Issues
- **Script not loading**: Check that `PUBLIC_UMAMI_WEBSITE_ID` is set correctly
- **No data in dashboard**: Ensure the website ID matches exactly
- **Custom instance**: Make sure `PUBLIC_UMAMI_SCRIPT_URL` points to your self-hosted instance
- **Build errors**: Verify environment variables are properly set in both local and production environments

### Vercel Analytics Issues
- **No data in Vercel dashboard**: Ensure Web Analytics is enabled in your Vercel project settings
- **Analytics not showing**: Check that you're viewing the correct project in Vercel dashboard
- **Build errors**: Verify `@vercel/analytics` package is properly installed
- **Preview deployments**: Analytics should work automatically on Vercel preview URLs

### General Issues
- **Both systems not working**: Check browser console for JavaScript errors
- **Performance concerns**: Both systems are designed to be lightweight and non-blocking
- **Privacy compliance**: Both systems are GDPR compliant and don't use cookies
