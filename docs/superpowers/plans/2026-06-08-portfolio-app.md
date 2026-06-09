# Portfolio App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and run a Vite React portfolio app that assembles the Framer-exported Smooth Scroll components into a full portfolio page matching the Kima Davidson screenshot, with left and right panels that scroll independently.

**Architecture:** Scaffold a Vite React app in `/home/felecia/Downloads/portfolio-app/`, symlink the Smooth Scroll components folder as a local dependency, and compose all sections in `App.jsx`. The page uses a two-panel split layout: a fixed-width left sidebar (profile info, bio, CTA) that scrolls its own content, and a right main panel (photo grid, sections) that scrolls independently. Both panels use `overflow-y: auto` and fill the full viewport height via `height: 100vh`. The Framer runtime (`_framer-runtime.js`) and smooth scroll are already bundled inside the components package.

**Tech Stack:** Vite 5, React 18, framer-motion ≥10, lenis (for SmoothscrollProd), Node 24 / npm 11

---

### Task 1: Scaffold Vite React project ✅ COMPLETE

---

### Task 2: Wire Smooth Scroll package as local dependency

**Files:**
- Modify: `package.json` — add `"smooth-scroll"` local path dep
- Modify: `vite.config.js` — add alias so imports resolve correctly

- [ ] **Step 1: Add local package reference in package.json**

Open `package.json` and add under `"dependencies"`:

```json
"smooth-scroll": "file:../Smooth Scroll"
```

- [ ] **Step 2: Install the local package**

```bash
cd "/home/felecia/Downloads/portfolio-app"
npm install
```

Expected: `node_modules/smooth-scroll` symlink appears pointing to `../Smooth Scroll`.

- [ ] **Step 3: Update vite.config.js to handle the package**

Replace `vite.config.js` contents with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'smooth-scroll': path.resolve(__dirname, '../Smooth Scroll'),
    },
  },
  optimizeDeps: {
    include: ['framer-motion', 'lenis'],
    exclude: ['smooth-scroll'],
  },
})
```

- [ ] **Step 4: Commit**

```bash
cd "/home/felecia/Downloads/portfolio-app"
git add package.json vite.config.js package-lock.json
git commit -m "chore: wire smooth-scroll as local dep"
```

---

### Task 3: Create main App component

**Files:**
- Create/Replace: `src/App.jsx`
- Modify: `src/main.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Replace src/index.css with global resets**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #root {
  width: 100%;
  height: 100%;
  background: #111;
  overflow: hidden;
}
```

- [ ] **Step 2: Update src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 3: Create src/App.jsx with two-panel independently scrollable layout**

```jsx
import React from 'react'

import { SmoothscrollProd } from '../node_modules/smooth-scroll/SmoothscrollProd.js'
import { Scrollprogress } from '../node_modules/smooth-scroll/Scrollprogress.js'
import PrimaryComponent from '../node_modules/smooth-scroll/Primary.js'
import StatsComponent from '../node_modules/smooth-scroll/Stats.js'
import ServiceComponent from '../node_modules/smooth-scroll/Service.js'
import CardsStackComponent from '../node_modules/smooth-scroll/CardsStack.js'
import ExperienceComponent from '../node_modules/smooth-scroll/Experience.js'
import AwardComponent from '../node_modules/smooth-scroll/Award.js'
import TestimonialComponent from '../node_modules/smooth-scroll/Testimonial.js'
import FooterComponent from '../node_modules/smooth-scroll/Footer.js'
import BackToTopComponent from '../node_modules/smooth-scroll/BackToTop.js'
import '../node_modules/smooth-scroll/_responsive-runtime.css'
import '../node_modules/smooth-scroll/tokens.css'

const layoutStyle = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  background: '#111',
}

const leftPanelStyle = {
  width: '340px',
  flexShrink: 0,
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
}

const rightPanelStyle = {
  flex: 1,
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'hidden',
}

export default function App() {
  return (
    <>
      <SmoothscrollProd intensity={10} />
      <Scrollprogress />
      <div style={layoutStyle}>
        <div style={leftPanelStyle}>
          <PrimaryComponent />
        </div>
        <div style={rightPanelStyle}>
          <StatsComponent />
          <ServiceComponent />
          <CardsStackComponent />
          <ExperienceComponent />
          <AwardComponent />
          <TestimonialComponent />
          <FooterComponent />
        </div>
      </div>
      <BackToTopComponent />
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
cd "/home/felecia/Downloads/portfolio-app"
git add src/
git commit -m "feat: add two-panel App component with all portfolio sections"
```

---

### Task 4: Run and verify

- [ ] **Step 1: Build to check for errors**

```bash
cd "/home/felecia/Downloads/portfolio-app"
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 2: Start dev server**

```bash
cd "/home/felecia/Downloads/portfolio-app"
npm run dev
```

Expected: `Local: http://localhost:5173/`

- [ ] **Step 3: Confirm visual output**

Check that the browser shows:
- Dark background
- Left panel (340px, independently scrollable): profile photo, name, bio, "Get in touch" button
- Right panel (flex 1, independently scrollable): photo grid and content sections
- Both panels scroll independently
