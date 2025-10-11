# Analytics Event Tracking Plan

This document outlines the custom events we track for comprehensive analytics on ephbaum.dev using Umami Analytics.

## Current Implementation

### ✅ All Events Implemented

#### Color Palette Button Click
- **Event Name**: `color_palette_click`
- **Trigger**: When user clicks the color palette button
- **Data Properties**:
  ```javascript
  {
    action: "change_colors",
    component: "color_palette_button"
  }
  ```

#### Color Scheme Applied
- **Event Name**: `color_scheme_applied`
- **Trigger**: When color scheme is applied to the site
- **Data Properties**:
  ```javascript
  {
    action: "apply_colors",
    component: "color_system",
    colors: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4", 
      accent: "#45b7d1",
      hover: "#96ceb4"
    }
  }
  ```

#### Color Scheme Initialized
- **Event Name**: `color_scheme_initialized`
- **Trigger**: When color scheme is loaded/applied on page load
- **Data Properties**:
  ```javascript
  {
    action: "initialize_colors",
    component: "color_system",
    colors: {
      primary: "#ff6b6b",
      secondary: "#4ecdc4", 
      accent: "#45b7d1",
      hover: "#96ceb4"
    },
    source: "page_load", // or "user_interaction", "local_storage"
    page_url: "/blog/migrating-from-ghost-cms-to-astro/"
  }
  ```

### 1. Blog Post Interactions

#### Blog Post Click
- **Event Name**: `blog_post_click`
- **Trigger**: When user clicks on a blog post title or "Read More" link
- **Data Properties**:
  ```javascript
  {
    action: "view_post",
    component: "blog_post_link",
    post_slug: "migrating-from-ghost-cms-to-astro",
    post_title: "Migrating from Ghost CMS to Astro",
    post_date: "2024-01-15",
    post_tags: ["astro", "migration", "ghost-cms"]
  }
  ```

#### Blog Post Tag Click
- **Event Name**: `blog_tag_click`
- **Trigger**: When user clicks on a tag link
- **Data Properties**:
  ```javascript
  {
    action: "filter_by_tag",
    component: "blog_tag_link",
    tag_name: "astro",
    tag_url: "/blog/tags/astro/",
    source_page: "blog_index" // or "blog_post" or "tag_page"
  }
  ```

### 2. Navigation Events

#### Menu Navigation
- **Event Name**: `menu_navigation`
- **Trigger**: When user clicks on main navigation items
- **Data Properties**:
  ```javascript
  {
    action: "navigate",
    component: "main_navigation",
    destination: "blog", // or "about", "home", etc.
    destination_url: "/blog/"
  }
  ```

#### Footer Link Click
- **Event Name**: `footer_link_click`
- **Trigger**: When user clicks on footer links
- **Data Properties**:
  ```javascript
  {
    action: "click_footer_link",
    component: "footer",
    link_type: "social", // or "external", "internal"
    link_destination: "github",
    link_url: "https://github.com/ephbaum"
  }
  ```

### 3. Content Engagement

#### External Link Click
- **Event Name**: `external_link_click`
- **Trigger**: When user clicks links that go off-site
- **Data Properties**:
  ```javascript
  {
    action: "click_external_link",
    component: "content_link",
    destination_domain: "github.com",
    destination_url: "https://github.com/ephbaum/ephbaumdotdev",
    source_context: "blog_post" // or "about", "footer", etc.
  }
  ```

#### RSS Feed Click
- **Event Name**: `rss_feed_click`
- **Trigger**: When user clicks on RSS feed link
- **Data Properties**:
  ```javascript
  {
    action: "subscribe_rss",
    component: "rss_link",
    feed_url: "https://ephbaum.dev/blog.xml"
  }
  ```

### 4. Search & Discovery

#### Search Query (if implemented)
- **Event Name**: `search_query`
- **Trigger**: When user performs a search
- **Data Properties**:
  ```javascript
  {
    action: "search",
    component: "search_box",
    query: "astro migration",
    results_count: 5,
    search_type: "blog_posts"
  }
  ```

## Implementation Notes

### Event Tracking Function
Centralized tracking function using Umami Analytics only:

```javascript
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
```

### Implementation Status

1. **✅ High Priority** (Completed):
   - Blog post clicks
   - Tag clicks
   - External link clicks

2. **✅ Medium Priority** (Completed):
   - Menu navigation
   - Footer link clicks
   - RSS feed clicks

3. **✅ Low Priority** (Completed):
   - Color scheme initialization
   - Color palette interactions

4. **⏳ Future** (Not Implemented):
   - Search queries (when search is implemented)

### Data Considerations

- **Privacy**: No personal data, only behavioral analytics
- **Performance**: Events should be lightweight and non-blocking
- **Reliability**: Use try-catch blocks and graceful degradation
- **Consistency**: Standardize event naming and property structure

### Testing

For each event:
1. Verify it fires in browser console
2. Check Umami dashboard for data
3. Test with ad blockers enabled/disabled
4. Test on mobile devices
5. Verify event data includes all expected properties

## Current Analytics Setup

- **Umami Analytics**: Privacy-focused analytics with comprehensive custom event tracking
- **Cost-effective**: Single analytics system to avoid additional charges
- **Privacy-first**: No cookies, GDPR compliant, no cross-site tracking
- **Comprehensive**: All user interactions tracked with detailed metadata

## Implemented Events Summary

All events are now fully implemented and working with Umami Analytics:

### ✅ Blog Interactions
- `blog_post_click` - When users click "Read post" buttons
- `blog_tag_click` - When users click on tag links

### ✅ Navigation & Links
- `menu_navigation` - When users click main navigation items
- `footer_link_click` - When users click footer links
- `external_link_click` - When users click external/social links
- `rss_feed_click` - When users click RSS feed links

### ✅ Color System
- `color_palette_click` - When users click the color palette button
- `color_scheme_applied` - When color schemes are applied
- `color_scheme_initialized` - When colors are loaded on page load

### 📊 Event Data Structure
Each event includes:
- **Timestamp**: When the event occurred
- **Page Context**: Current URL and page title
- **Event-specific Data**: Relevant metadata (post titles, tags, URLs, etc.)
- **Component Information**: Which UI element was interacted with
- **Action Details**: What the user did

All events are sent to your Umami dashboard for comprehensive analytics insights!
