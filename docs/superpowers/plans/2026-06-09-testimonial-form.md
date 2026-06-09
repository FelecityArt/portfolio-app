# Testimonial Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a modal form to the Testimonials section that sends submissions (name, role, email, quote, optional photo) to Felecia's email via EmailJS.

**Architecture:** A "Leave a testimonial" button below the existing testimonial list opens a `TestimonialModal` component. The modal manages its own form state and calls EmailJS directly from the browser. Photos are compressed client-side to base64 before sending. No backend or database is involved.

**Tech Stack:** React (useState, useEffect), @emailjs/browser, FileReader + Canvas API, Vite env vars

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/App.jsx` | Modify | Add `compressImage` helper, `TestimonialModal` component, update `Testimonials` |
| `package.json` | Modify | Add `@emailjs/browser` dependency |
| `.env.example` | Create | Document required env var keys |
| `.env.local` | User creates manually | Holds real EmailJS credentials — never committed |

---

## Task 1: Install EmailJS and scaffold env files

**Files:**
- Modify: `package.json`
- Create: `.env.example`

- [ ] **Step 1: Install the EmailJS browser SDK**

```bash
cd /home/felecia/Downloads/portfolio-app
npm install @emailjs/browser
```

Expected output: `added 1 package` (or similar), no errors.

- [ ] **Step 2: Create `.env.example`**

Create the file `/home/felecia/Downloads/portfolio-app/.env.example` with this content:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

- [ ] **Step 3: Verify `.env.local` is gitignored**

```bash
grep -n '\.env' /home/felecia/Downloads/portfolio-app/.gitignore
```

Expected: a line matching `.env.local` or `.env*`. If missing, add `.env.local` to `.gitignore` before continuing.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "chore: add @emailjs/browser and env example"
```

---

## Task 2: Add `compressImage` helper to `src/App.jsx`

**Files:**
- Modify: `src/App.jsx` — insert after the image constant block (around line 29), before `/* ─── Reusable components ─────────────── */`

- [ ] **Step 1: Insert `compressImage` into `src/App.jsx`**

Add this function after the last `const AVT_SARAH = ...` line and before the `/* ─── Reusable components */` comment:

```jsx
/* ─── Helpers ─────────────────────────────────────────────── */
function compressImage(file, maxBytes = 500_000) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, Math.sqrt(maxBytes / file.size))
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}
```

- [ ] **Step 2: Verify the app still compiles**

```bash
cd /home/felecia/Downloads/portfolio-app && npm run build 2>&1 | tail -5
```

Expected: build finishes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add client-side image compression helper"
```

---

## Task 3: Add `TestimonialModal` component to `src/App.jsx`

**Files:**
- Modify: `src/App.jsx` — add the import and the `TestimonialModal` component before the `Testimonials` function

- [ ] **Step 1: Add the EmailJS import at the top of `src/App.jsx`**

After the existing imports (after the `framer-motion` import line), add:

```jsx
import emailjs from '@emailjs/browser'
```

- [ ] **Step 2: Add `TestimonialModal` to `src/App.jsx`**

Insert this component directly before the existing `function Testimonials()` definition:

```jsx
const INPUT_CLS = 'w-full bg-[#121212] border border-[#353534] rounded-lg px-3 py-2 text-sm text-white placeholder-[#8e9192] focus:outline-none focus:border-white transition-colors'
const LABEL_CLS = 'block text-xs text-[#8e9192] uppercase tracking-widest mb-1'
const ERR_CLS = 'text-xs text-red-400 mt-1'

function TestimonialModal({ onClose }) {
  const BLANK = { name: '', role: '', email: '', message: '' }
  const [fields, setFields] = React.useState(BLANK)
  const [photoPreview, setPhotoPreview] = React.useState(null)
  const [photoBase64, setPhotoBase64] = React.useState('')
  const [errors, setErrors] = React.useState({})
  const [status, setStatus] = React.useState('idle')
  const [errorMsg, setErrorMsg] = React.useState('')

  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function validate() {
    const errs = {}
    if (!fields.name.trim()) errs.name = 'Required'
    if (!fields.role.trim()) errs.role = 'Required'
    if (!fields.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Invalid email'
    if (!fields.message.trim()) errs.message = 'Required'
    return errs
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const b64 = await compressImage(file)
    setPhotoPreview(b64)
    setPhotoBase64(b64)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.name,
          from_role: fields.role,
          from_email: fields.email,
          message: fields.message,
          photo_base64: photoBase64,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-[#1e1e1e] border border-[#353534] rounded-xl p-8 w-full max-w-md mx-4 text-center" onClick={(e) => e.stopPropagation()}>
          <p className="text-white text-sm mb-6">Thanks! I'll be in touch.</p>
          <button onClick={onClose} className="bg-white text-[#121212] px-6 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1e1e1e] border border-[#353534] rounded-xl p-8 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#353534] flex items-center justify-center text-[#e5e2e1] hover:bg-[#2a2a2a] transition-colors text-sm"
          aria-label="Close"
        >×</button>

        <h3 className="text-white text-base font-medium mb-6">Leave a testimonial</h3>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className={LABEL_CLS}>Name</label>
            <input type="text" value={fields.name} onChange={set('name')} className={INPUT_CLS} placeholder="Your name" />
            {errors.name && <p className={ERR_CLS}>{errors.name}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Role</label>
            <input type="text" value={fields.role} onChange={set('role')} className={INPUT_CLS} placeholder="Your role or title" />
            {errors.role && <p className={ERR_CLS}>{errors.role}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Email</label>
            <input type="email" value={fields.email} onChange={set('email')} className={INPUT_CLS} placeholder="your@email.com" />
            {errors.email && <p className={ERR_CLS}>{errors.email}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Testimonial</label>
            <textarea rows={4} value={fields.message} onChange={set('message')} className={INPUT_CLS} placeholder="Share your experience…" />
            {errors.message && <p className={ERR_CLS}>{errors.message}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-xs text-[#8e9192] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border file:border-[#353534] file:text-xs file:font-medium file:bg-[#121212] file:text-white hover:file:bg-[#2a2a2a] file:transition-colors cursor-pointer"
            />
            {photoPreview && (
              <img src={photoPreview} alt="Preview" className="mt-2 w-12 h-12 rounded-lg object-cover grayscale" />
            )}
          </div>

          {status === 'error' && <p className={ERR_CLS}>{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="bg-white text-[#121212] px-6 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending' ? 'Sending…' : 'Send testimonial'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify the app still compiles**

```bash
cd /home/felecia/Downloads/portfolio-app && npm run build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add TestimonialModal component"
```

---

## Task 4: Update `Testimonials` to wire the trigger and modal

**Files:**
- Modify: `src/App.jsx` — replace the existing `Testimonials` function (currently lines ~366–390)

- [ ] **Step 1: Replace `function Testimonials()` in `src/App.jsx`**

Find the existing `function Testimonials()` and replace it entirely with:

```jsx
function Testimonials() {
  const [showForm, setShowForm] = React.useState(false)
  return (
    <div>
      <SectionTitle>Testimonials.</SectionTitle>
      <div className="space-y-8">
        {TESTIMONIALS.map(({ name, role, avatar, quote }) => (
          <div key={name} className="flex gap-4">
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0 mt-0.5 grayscale"
            />
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm font-medium text-white">{name}</span>
                <span className="text-[#8e9192] text-xs">• {role}</span>
              </div>
              <p className="text-[#8e9192] text-sm leading-relaxed">{quote}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="mt-6 text-xs text-[#8e9192] underline underline-offset-2 hover:text-white transition-colors"
      >
        Leave a testimonial
      </button>
      {showForm && <TestimonialModal onClose={() => setShowForm(false)} />}
    </div>
  )
}
```

- [ ] **Step 2: Build to confirm no errors**

```bash
cd /home/felecia/Downloads/portfolio-app && npm run build 2>&1 | tail -5
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire testimonial form trigger and modal into Testimonials section"
```

---

## Task 5: Manual smoke test

No automated test infrastructure exists in this project; manual verification covers the meaningful paths.

- [ ] **Step 1: Start the dev server**

```bash
cd /home/felecia/Downloads/portfolio-app && npm run dev
```

Open `http://localhost:5173` in a browser.

- [ ] **Step 2: Verify trigger button appears**

Scroll to the Testimonials section in the sidebar. Confirm "Leave a testimonial" text link is visible below the last testimonial card.

- [ ] **Step 3: Verify modal opens and closes**

- Click "Leave a testimonial" → modal appears with dark overlay
- Click outside the panel → modal closes
- Re-open, press Escape → modal closes
- Click the `×` button → modal closes

- [ ] **Step 4: Verify validation**

Click "Send testimonial" with all fields empty. Confirm "Required" error appears under each required field (Name, Role, Email, Testimonial). Enter an invalid email string → confirm "Invalid email" appears.

- [ ] **Step 5: Verify photo upload preview**

Select any image file using the photo input. Confirm a small grayscale thumbnail appears below the file input immediately after selection.

- [ ] **Step 6: Verify EmailJS send (requires real credentials)**

Create `.env.local` with real EmailJS credentials:
```
VITE_EMAILJS_SERVICE_ID=<your service id>
VITE_EMAILJS_TEMPLATE_ID=<your template id>
VITE_EMAILJS_PUBLIC_KEY=<your public key>
```

Restart the dev server (`npm run dev`). Fill in all fields and submit. Confirm:
- Button shows "Sending…" while in flight
- Success state shows "Thanks! I'll be in touch."
- Email arrives at `kentonfelecia123@gmail.com` with name, role, email, testimonial, and photo (if provided)

If credentials aren't set up yet, confirm the error state: with invalid env vars, the button shows the error message below the form.

- [ ] **Step 7: Commit verification note (no code change needed)**

No additional commit required — the smoke test is complete.

---

## EmailJS Setup Reference (for Felecia)

1. Create an account at emailjs.com
2. Add an Email Service (Gmail works) → copy the **Service ID**
3. Create an Email Template with these variables in the body:
   - `{{from_name}}`, `{{from_role}}`, `{{from_email}}`, `{{message}}`
   - Optionally add `{{photo_base64}}` as an inline image src
   - Copy the **Template ID**
4. Go to Account → API Keys → copy the **Public Key**
5. Create `.env.local` in the project root with the three values above
6. Restart the dev server
