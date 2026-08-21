# Analytics Event Tracking Plan

This document outlines the custom events tracked on ephbaum.dev using Umami
Analytics.

## Status

Nine events fire from real code paths, all listed below. This inventory was
derived by grepping `trackEvent(` and `umami.track(` across `src/` and
`public/`, then reading each call site — not by trusting event counts from
elsewhere, since at least one event here used to be dispatched with a
variable name (`eventName`) that a literal-string grep would have missed.
That call site (`color_scheme_initialized` / `color_scheme_applied` in
`applyAllColors()`) has since been removed entirely — see below.

## Event Tracking Function

All nine events route through one function, `trackEvent()` in
`public/analytics.js`:

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

It is exposed as `window.trackEvent` and is genuinely the single route to
Umami now: `public/analytics.js` is the only file left in the codebase that
calls `window.umami.track` directly. Every call site below calls
`window.trackEvent(eventName, properties)`, guarded with
`typeof window.trackEvent === 'function'` so a call before `analytics.js`
has run is a no-op instead of a throw. `trackEvent()` merges in `timestamp`,
`page_url`, and `page_title` automatically — those three fields are on every
event below in addition to the properties listed.

`public/analytics.js` is loaded synchronously in `<head>` (via
`BaseHead.astro`), before any body script, so in practice `window.trackEvent`
is always defined by the time a user can trigger one of these.

## Events

### Blog Interactions

#### `blog_post_click`
- **Trigger**: User clicks a blog post link (`[data-analytics-blog-post]`)
- **Source**: `src/components/blog/BlogSummaryCard.astro`
- **Properties**: `action: "view_post"`, `component: "blog_post_link"`,
  `post_slug`, `post_title`, `post_date`, `post_tags` (array)

#### `blog_tag_click`
- **Trigger**: User clicks a tag link (`[data-analytics-blog-tag]`)
- **Source**: `src/components/blog/BlogSummaryCard.astro`
- **Properties**: `action: "filter_by_tag"`, `component: "blog_tag_link"`,
  `tag_name`, `tag_url`, `source_page`

### Navigation & Links

#### `menu_navigation`
- **Trigger**: User clicks a main nav item (`[data-analytics-menu-nav]`)
- **Source**: `src/components/layout/BaseNavigation.astro`
- **Properties**: `action: "navigate"`, `component: "main_navigation"`,
  `destination`, `destination_url`

#### `external_link_click`
- **Trigger**: User clicks a link marked as external
  (`[data-analytics-external-link]`)
- **Source**: `src/components/layout/BaseNavigation.astro`
- **Properties**: `action: "click_external_link"`, `component: "content_link"`,
  `destination_domain`, `destination_url`, `source_context`

#### `footer_link_click`
- **Trigger**: User clicks a footer link (`[data-analytics-footer-link]`)
- **Source**: `src/components/layout/BaseFooter.astro`
- **Properties**: `action: "click_footer_link"`, `component: "footer"`,
  `link_type`, `link_destination`, `link_url`

#### `rss_feed_click`
- **Trigger**: User clicks the RSS feed link (`[data-analytics-rss-feed]`)
- **Source**: `src/components/layout/BaseHead.astro`
- **Properties**: `action: "subscribe_rss"`, `component: "rss_link"`,
  `feed_url`

### Color System

#### `color_palette_click`
- **Trigger**: User clicks the palette button, and disco mode is not active
  (a click while disco is running stops disco instead — see below, and does
  not also fire this event)
- **Source**: `src/components/ColorChangeButton.astro`
- **Properties**: `action: "change_colors"`, `component: "color_palette_button"`

There is no separate "applied" event: colours repaint synchronously in the
same handler, so an applied-event at that site would share this one's trigger
and timing without adding information.

One click can still produce two events. The fifth click of a rapid sequence
starts disco *and* falls through to `color_palette_click`, because the handler
fires it unconditionally after `trackColorButtonClick()`. So that click emits
both `disco_mode_activated` and `color_palette_click`. The click that *stops*
disco returns early and emits only `disco_mode_deactivated`.

#### `disco_mode_activated`
- **Trigger**: Disco mode starts — 5 palette-button clicks within 1 second,
  or the Konami code
- **Source**: `public/global-color-system.js`, `startDiscoMode()`
- **Properties**: `action: "activate_disco_mode"`, `component: "color_system"`

#### `disco_mode_deactivated`
- **Trigger**: Disco mode stops — palette button clicked again, or the
  Konami code toggled while active
- **Source**: `public/global-color-system.js`, `stopDiscoMode()`
- **Properties**: `action: "deactivate_disco_mode"`, `component: "color_system"`

One event per activation/deactivation, regardless of how long disco mode
runs. While active, colours repaint every 200ms via `applyAllColors()`, but
`applyAllColors()` is paint-only and fires no event of its own — it used to
(`color_scheme_applied`, once per repaint), which meant a 30-second disco run
produced roughly 150 spurious events. Fixed in #42.

### Removed

#### `color_scheme_initialized` (removed, #42)
Used to fire unconditionally from `applyAllColors()` on every page load. It
carried no information a pageview doesn't already have, and roughly doubled
baseline event volume across all traffic. Not relocated — deleted outright,
per #42.

#### `color_scheme_applied` (removed from the render path, #42)
Used to fire from `applyAllColors()` on every repaint, including every 200ms
disco tick. `applyAllColors()` is now paint-only. The one legitimate
"user changed the colours" signal is `color_palette_click` above; disco
start/stop are `disco_mode_activated` / `disco_mode_deactivated`.

#### `search_query` (removed, #41)
Documented here previously as "if implemented," but no search feature exists
in this codebase — `grep -rn "search_query" src/ public/` returns nothing.
Search is tracked separately as issue #43; that feature will add its own
tracking when it ships.

## Data Considerations

- **Privacy**: No personal data, only behavioral analytics
- **Performance**: Events are lightweight and fire only on user action —
  see the color-system removals above for what "on user action" is meant to
  rule out
- **Reliability**: `trackEvent()` guards on `window.umami` and wraps the call
  in try/catch; every call site additionally guards on
  `typeof window.trackEvent === 'function'`

## Current Analytics Setup

- **Umami Analytics**: Privacy-focused, cookie-free custom event tracking
- **Vercel Speed Insights**: Performance monitoring and Core Web Vitals,
  production only
