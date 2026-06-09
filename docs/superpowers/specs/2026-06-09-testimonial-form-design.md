# Testimonial Submission Form — Design Spec

**Date:** 2026-06-09  
**Status:** Approved

---

## Overview

Allow visitors to submit a testimonial via a modal form in the sidebar. Submissions are delivered to Felecia's email via EmailJS (no backend required). Felecia manually reviews and adds approved testimonials to the hardcoded `TESTIMONIALS` array in `App.jsx`.

---

## Architecture

- **Delivery:** EmailJS SDK (`@emailjs/browser`) — browser-side, no server
- **Storage:** None — submissions go directly to email; approved ones are added to code manually
- **Config:** Three Vite env vars in `.env.local` (gitignored); placeholder keys documented in `.env.example`
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

---

## UI Components

### Trigger

A "Leave a testimonial" text link rendered below the last testimonial card inside the existing `Testimonials` component. Style: `text-xs text-[#8e9192] underline underline-offset-2 hover:text-white transition-colors`. Clicking it sets `showForm = true`.

### Modal (`TestimonialModal`)

Follows the existing `ProfilePicModal` pattern:
- Overlay: `fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center`
- Panel: dark card (`bg-[#1e1e1e] border border-[#353534] rounded-xl p-8 w-full max-w-md mx-4`)
- Dismiss: Escape key or click outside panel
- Close button: `×` top-right, same style as `ProfilePicModal`

### Form Fields

All fields use a consistent input style matching the site aesthetic:
- Label: `text-xs text-[#8e9192] uppercase tracking-widest mb-1`
- Input/Textarea: `w-full bg-[#121212] border border-[#353534] rounded-lg px-3 py-2 text-sm text-white placeholder-[#8e9192] focus:outline-none focus:border-white transition-colors`

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | `<input type="text">` | Yes | Placeholder: "Your name" |
| Role | `<input type="text">` | Yes | Placeholder: "Your role or title" |
| Email | `<input type="email">` | Yes | Placeholder: "your@email.com" — sent to Felecia, never displayed |
| Testimonial | `<textarea rows={4}>` | Yes | Placeholder: "Share your experience…" |
| Photo | `<input type="file" accept="image/*">` | No | Optional; see Photo Handling below |

### Photo Handling

Client-side only, no upload to any server:
1. On file select, use `FileReader.readAsDataURL()` to get a base64 string
2. Use a `<canvas>` to resize the image so the base64 output is ≤ 500 KB before sending
3. Pass the base64 string as the `photo_base64` EmailJS template variable
4. Show a small thumbnail preview in the form once a photo is selected
5. If no photo is selected, `photo_base64` is sent as an empty string

### Submit Button

- Label: "Send testimonial" (idle), "Sending…" (loading), disabled during send
- Style: same white pill as CTAButton — `bg-white text-[#121212] px-6 py-2.5 rounded-full font-semibold text-sm`
- On success: replace form content with "Thanks! I'll be in touch." message + close button
- On error: show inline error message below the button — `text-xs text-red-400 mt-2`

---

## EmailJS Template Variables

The EmailJS email template receives:

| Variable | Content |
|---|---|
| `from_name` | Submitter's name |
| `from_role` | Submitter's role |
| `from_email` | Submitter's email |
| `message` | Testimonial quote text |
| `photo_base64` | Base64 image string, or empty |

---

## State

Managed with `React.useState` inside `Testimonials` (or lifted to a small wrapper):

```
showForm: boolean        — controls modal visibility
formState: idle | sending | success | error
errorMessage: string     — populated on EmailJS failure
```

---

## Validation

Client-side only (no server validation needed):
- All fields except photo are required — show field-level error text on submit attempt if empty
- Email must match basic email format (`type="email"` native validation)
- Photo file size checked before encoding; warn if > 2 MB raw (still encode, but after resize)

---

## File Changes

- `src/App.jsx` — add `TestimonialModal` component; update `Testimonials` to include trigger button and modal
- `package.json` — add `@emailjs/browser`
- `.env.local` — (Felecia creates manually) three EmailJS env vars; never committed
- `.env.example` — add placeholder entries documenting required env vars

---

## Out of Scope

- Displaying submitted testimonials live on the page (no database)
- Admin approval UI
- Role as optional (role is required, matching existing testimonial card format)
- Avatar upload to any CDN — base64 is email-only; Felecia provides a real URL when adding manually
