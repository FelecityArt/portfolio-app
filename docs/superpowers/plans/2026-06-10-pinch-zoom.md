# Pinch-to-Zoom on Mobile Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable native browser pinch-to-zoom on mobile by removing a dead touch listener that blocks it and explicitly permitting zoom in the viewport meta tag.

**Architecture:** Two surgical edits — one to `index.html` to declare `maximum-scale=5`, one to `src/App.jsx` to remove a `useEffect` containing `touchstart`/`touchmove` listeners that call `e.preventDefault()` with no functional purpose (no horizontal swipe feature exists). Removing these listeners unblocks native browser pinch-to-zoom.

**Tech Stack:** React 19, Vite, plain HTML viewport meta

---

### Task 1: Update viewport meta to permit zoom

**Files:**
- Modify: `index.html:5`

- [ ] **Step 1: Edit the viewport meta tag**

In [index.html](index.html), change line 5 from:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

to:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: allow pinch-to-zoom up to 5x on mobile"
```

---

### Task 2: Remove dead touch listeners that block pinch zoom

**Files:**
- Modify: `src/App.jsx:794-819`

- [ ] **Step 1: Remove the touch-blocking useEffect from App**

In [src/App.jsx](src/App.jsx), the `App` component currently has this at the top:

```jsx
export default function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    let startX = 0
    let startY = 0

    function onTouchStart(e) {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    function onTouchMove(e) {
      const dx = Math.abs(e.touches[0].clientX - startX)
      const dy = Math.abs(e.touches[0].clientY - startY)
      if (dx > dy) e.preventDefault()
    }

    const el = rootRef.current
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <div ref={rootRef} className="flex flex-col ...">
```

Replace it with:

```jsx
export default function App() {
  return (
    <div className="flex flex-col md:flex-row md:h-screen w-full md:overflow-hidden bg-[#121212] font-sans antialiased relative">
```

Also remove the `rootRef` declaration and the `useRef` import if it is no longer used anywhere else in the file. Check by searching for other `useRef` usage before removing the import.

- [ ] **Step 2: Verify the import line**

After removing `rootRef`, check line 1 of `src/App.jsx`. If `useRef` appears nowhere else in the file, update the import from:

```jsx
import React, { useEffect, useRef } from 'react'
```

to:

```jsx
import React, { useEffect } from 'react'
```

If `useRef` is still used elsewhere, leave the import unchanged.

- [ ] **Step 3: Run the dev server and verify no console errors**

```bash
npm run dev
```

Open the app in a browser. Check the console for errors. Expected: no errors related to `rootRef` or touch listeners.

- [ ] **Step 4: Test pinch zoom on mobile (or Chrome DevTools)**

In Chrome DevTools, open the app, switch to a mobile device profile (e.g. iPhone 12), and use two-finger pinch on the trackpad or enable touch simulation. Pinch in: content should scale up. Pinch out: content should scale back down. Expected: native browser zoom works on the full page.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: remove touch listener that was blocking pinch-to-zoom"
```
