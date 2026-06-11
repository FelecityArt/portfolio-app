# Dot Field Cursor Effect — Design Spec

**Date:** 2026-06-08  
**Status:** Approved

---

## Overview

Replace the current static CSS dot-field background in the portfolio with an interactive canvas-based version. When the cursor moves near dots, they swirl outward in a vortex motion and shift color through the Ember gradient palette (Gold → Orange → Rose → Deep Rose). Dots outside the cursor's influence remain static and white at low opacity, identical to the current appearance.

---

## Visual Behavior

### Resting state
- Dots: 1px radius, `rgba(255,255,255,0.12)`, spaced 22×22px grid (matching current CSS)
- No animation; identical to the existing `.dot-field` appearance

### Active state (cursor within radius)
- **Influence radius:** ~90px from the cursor center
- **Proximity factor `t`:** `1 - (distance / radius)`, ranging 0→1 as the dot moves from the edge to the center of the radius
- **Swirl displacement:** each dot is pushed tangentially (perpendicular to the cursor→dot vector, i.e. rotated 90°), scaled by `t * 16px`. A slow sinusoidal time factor (`sin(frame * 0.04 + distance * 0.05)`) makes the swirl feel alive rather than rigid
- **Color:** Ember gradient — `#f59e0b` → `#f97316` → `#ec4899` → `#be185d` — mapped by the angular position of each dot around the cursor (full 360° = full gradient sweep). Alpha: `0.12 + t * 0.75` (fully opaque at center)
- **Dot radius:** `1 + t * 1.5px` (dots grow slightly as they color up)

### Fade mask
The existing radial ellipse mask (`radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%)`) is preserved. It is applied via a CSS `mask-image` on a wrapper `<div>` that contains the canvas, matching the current implementation exactly.

---

## Architecture

### Component: `DotField`

A new React component in `src/DotField.jsx`.

**Responsibilities:**
- Render a `<canvas>` element inside a fixed full-screen wrapper div
- Listen for `window` `mousemove` events and store cursor position in a `ref` (no state — avoids React re-renders)
- Run a `requestAnimationFrame` loop that redraws the canvas each frame when the cursor is active; idle (no movement for >100ms) skips redraws
- On unmount, cancel the animation frame and remove the event listener
- Handle canvas resize via `ResizeObserver`

**Props:** none

**Wrapper div styles:**
```
position: fixed; inset: 0; pointer-events: none; z-index: 0;
mask-image: radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%);
-webkit-mask-image: (same)
```

### Integration

In `App.jsx`, replace:
```jsx
<div className="dot-field" aria-hidden="true" />
```
with:
```jsx
<DotField />
```

Remove the `.dot-field` CSS rule from `index.css` (the canvas replaces it entirely). Keep all other CSS untouched.

---

## Performance

- Canvas draw loop only runs on `requestAnimationFrame`; no `setInterval`
- Mouse position stored in a `useRef` — zero React renders from mouse movement
- Idle detection: if no `mousemove` event fires for 100ms, stop the RAF loop; restart on next move
- Dot count at 1920×1080 with 22px spacing: ~4,000 dots — well within canvas budget for 60fps

---

## Files Changed

| File | Change |
|------|--------|
| `src/DotField.jsx` | New component |
| `src/App.jsx` | Replace `.dot-field` div with `<DotField />` |
| `src/index.css` | Remove `.dot-field` rule |
