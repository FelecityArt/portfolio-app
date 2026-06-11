# Pinch-to-Zoom on Mobile — Design Spec

**Date:** 2026-06-10

## Problem

Native browser pinch-to-zoom is blocked on mobile. The root `App` component registers a non-passive `touchmove` listener that calls `e.preventDefault()` on horizontal swipes. Even though the app has no horizontal swipe feature, this listener prevents the browser from handling pinch gestures.

## Solution

Two minimal changes to restore native browser pinch-to-zoom:

### 1. `index.html` — viewport meta

Add `maximum-scale=5` to the viewport meta tag. This explicitly permits users to zoom up to 5×, which some browsers require even when no JS is blocking zoom.

**Before:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**After:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
```

### 2. `src/App.jsx` — remove dead touch listeners

The `touchstart` and `touchmove` listeners in the `App` `useEffect` were added to prevent horizontal scrolling during swipes. Since the app has no horizontal swipe feature, they serve no purpose and only block pinch zoom. Remove both listeners and the `useEffect` entirely.

## What changes

- Users on mobile can pinch in/out to zoom the full app (text, layout, sidebar, everything)
- Standard iOS/Android zoom behavior: momentum, double-tap reset, etc.
- No new dependencies, no new abstractions

## What stays the same

- Lightbox, gallery, fullscreen image view — unaffected
- Desktop layout — unaffected
- All existing functionality — unaffected
