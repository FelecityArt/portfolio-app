# Dot Field Cursor Effect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static CSS dot-field background with an interactive canvas that swirls and colors dots with the Ember gradient when the cursor is nearby.

**Architecture:** A single `DotField` React component renders a fixed full-screen `<canvas>`. Mouse position is tracked via a `window` event listener stored in a ref (no re-renders). A `requestAnimationFrame` loop redraws only while the cursor is active.

**Tech Stack:** React 19, Vite, vanilla Canvas 2D API

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/DotField.jsx` | Canvas component — all drawing logic |
| Modify | `src/App.jsx` | Swap `.dot-field` div for `<DotField />` |
| Modify | `src/index.css` | Remove the `.dot-field` CSS rule |

---

## Task 1: Create the DotField canvas component

**Files:**
- Create: `src/DotField.jsx`

- [ ] **Step 1: Create `src/DotField.jsx` with this exact content**

```jsx
import { useEffect, useRef } from 'react'

const DOT_GAP = 22
const RADIUS = 90
const EMBER = ['#f59e0b', '#f97316', '#ec4899', '#be185d']

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ]
}

function lerpChannel(a, b, t) {
  return Math.round(a + (b - a) * t)
}

function emberColor(angleFraction) {
  // angleFraction is 0–1 representing position around the cursor
  const n = EMBER.length - 1
  const idx = Math.min(Math.floor(angleFraction * n), n - 1)
  const local = angleFraction * n - idx
  const [r0, g0, b0] = hexToRgb(EMBER[idx])
  const [r1, g1, b1] = hexToRgb(EMBER[idx + 1])
  return [lerpChannel(r0, r1, local), lerpChannel(g0, g1, local), lerpChannel(b0, b1, local)]
}

export default function DotField() {
  const canvasRef = useRef(null)
  const mouseRef = useRef(null)   // { x, y } or null
  const rafRef = useRef(null)
  const frameRef = useRef(0)
  const idleTimerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function draw() {
      frameRef.current++
      const W = canvas.width
      const H = canvas.height
      const mouse = mouseRef.current
      const frame = frameRef.current

      ctx.clearRect(0, 0, W, H)

      const cols = Math.ceil(W / DOT_GAP) + 1
      const rows = Math.ceil(H / DOT_GAP) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * DOT_GAP
          const by = r * DOT_GAP

          let ox = 0
          let oy = 0
          let t = 0

          if (mouse) {
            const dx = bx - mouse.x
            const dy = by - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < RADIUS) {
              t = 1 - dist / RADIUS
              // Tangent direction (perpendicular to cursor→dot vector, rotated 90°)
              const len = dist || 1
              const tx = -dy / len
              const ty = dx / len
              const swirlStrength = t * 16
              const pulse = 0.5 + 0.5 * Math.sin(frame * 0.04 + dist * 0.05)
              ox = tx * swirlStrength * pulse
              oy = ty * swirlStrength * pulse
            }
          }

          const x = bx + ox
          const y = by + oy

          if (t > 0.01) {
            const angle = mouse ? Math.atan2(y - mouse.y, x - mouse.x) : 0
            // Map -π…π to 0…1
            const angleFraction = ((angle / (Math.PI * 2) + 0.5) % 1 + 1) % 1
            const [r2, g2, b2] = emberColor(angleFraction)
            const alpha = 0.12 + t * 0.75
            ctx.fillStyle = `rgba(${r2},${g2},${b2},${alpha})`
          } else {
            ctx.fillStyle = 'rgba(255,255,255,0.12)'
          }

          const dotRadius = 1 + t * 1.5
          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function loop() {
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }

    function startLoop() {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop)
    }

    function stopLoop() {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      startLoop()
      // Stop loop 150ms after last mouse movement
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        stopLoop()
        draw() // one final draw to show dots back at rest
      }, 150)
    }

    function onMouseLeave() {
      mouseRef.current = null
      clearTimeout(idleTimerRef.current)
      stopLoop()
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    resize()
    draw() // initial static render

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      stopLoop()
      clearTimeout(idleTimerRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%)',
        maskImage:
          'radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%)',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
```

- [ ] **Step 2: Verify the file saved correctly**

```bash
head -5 /home/felecia/Downloads/portfolio-app/src/DotField.jsx
```
Expected output: first 5 lines starting with `import { useEffect, useRef } from 'react'`

---

## Task 2: Wire DotField into App.jsx

**Files:**
- Modify: `src/App.jsx` — add import, replace div

- [ ] **Step 1: Add the import at the top of `src/App.jsx`**

After `import './index.css'` (line 2), add:
```jsx
import DotField from './DotField'
```

- [ ] **Step 2: Replace the dot-field div in the `App` return**

Find this in the `App` function (around line 410):
```jsx
<div className="dot-field" aria-hidden="true" />
```
Replace with:
```jsx
<DotField />
```

---

## Task 3: Remove the dead CSS rule

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Remove the `.dot-field` block from `src/index.css`**

Delete these lines entirely:
```css
.dot-field {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.45) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%);
  mask-image: radial-gradient(ellipse 90% 55% at 50% 100%, white 0%, transparent 100%);
}
```

The file should retain the `.no-scrollbar`, `html, body`, and `.avatar-frame` rules.

---

## Task 4: Verify in the dev server

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
cd /home/felecia/Downloads/portfolio-app && npm run dev
```
Expected: Vite prints a localhost URL (typically `http://localhost:5173`)

- [ ] **Step 2: Open the URL in a browser and verify resting state**

The dot grid should be visible, fading out toward the top of the screen — identical to the previous static appearance.

- [ ] **Step 3: Move the cursor across the page and verify the effect**

- Dots near the cursor should swirl outward in a vortex
- Dots should glow through Gold → Orange → Rose → Deep Rose (Ember palette)
- Dots outside the ~90px radius remain white and static
- Effect should be smooth (no jank or frame drops)

- [ ] **Step 4: Verify idle recovery**

Move the cursor then hold still for ~200ms. The swirl should settle and dots return to their resting white state.

- [ ] **Step 5: Commit**

```bash
git -C /home/felecia/Downloads/portfolio-app add src/DotField.jsx src/App.jsx src/index.css
git -C /home/felecia/Downloads/portfolio-app commit -m "feat: interactive dot field with Ember swirl cursor effect"
```
