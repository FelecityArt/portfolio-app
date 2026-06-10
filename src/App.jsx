import React, { useEffect, useRef } from 'react'
import './index.css'
import DotField from './DotField'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import emailjs from '@emailjs/browser'
import myPic from './assets/images/my_pic.jpg'
import kimPic from './assets/images/kimPic.JPG'
import REFLECTION from './assets/images/reflection.jpg'
import FRIENDSHIP from './assets/images/friendship.jpg'
import STILL from './assets/images/still.JPG'
import INSPIRED from './assets/images/inspired.jpg'
import GRAPHICTS from './assets/images/graphicTs.jpg'
import BOARDWALK from './assets/images/boardwalk.jpg'
import BRAINBASH from './assets/images/brainbash.png'
import MEDSIM from './assets/images/medsim.jpg'
import GIRLSNIGHT from './assets/images/friends.jpg'
import ARTMOSPHERE from './assets/images/artmosphere.png'
import HALLOWEEN from './assets/images/halloween.jpg'

/* ─── Image constants ─────────────────────────────────────── */
const AVATAR      = myPic
const IMG_PORTRAIT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF5NaZ_avrxlFFT6VYLnNvBhHnan9iJDj6t4Ihtom4SXX58602yNIOEnnq6P3xpC5tJbH7hE6gYVCq-hLTVMdwEmzwejvs9JqI05qbyHnMIYLCYoj4FKwuR5HUhrvhF_B77yh1O6QN9cCbSti_4K8u_yGhH3Q0CzCNhScxwI-1EWNyQt3V2WVBAI68lT7lMV74Sd3CV6_xIWHIONWuvVY1boXf_kuQw2k1EytayEf4BN6TYQU1OWNeRs3KEdDIuiUeqJTl2GfIIUw7'
const IMG_MISC     = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlFnJ_PfpTXN6t_xe3KqzH4HVVSRqg3VWfE-SDgAR_eiOc1_byZTLtb65pILrdRBmg-a3wuvZZ4qiL0wAJeu7GJ8dG9nXag7n4aBLWM8zDvOhfbiT_wU_8dBQvH9q_VH5GCUhAjl9zNVS7H_O_Wpl59ugxX1XfgQNTsURlQBAhGBh2ah1g_3KZyzmWefBngKcQthmzeRvLRi279zwpkvmsoNgHrY_hkbR1cGEHIL2A5CnyeOm5StCq2v_apIbSVT5v0IU4QA9rBEOo'
const IMG_VASE     = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEVQEsuBYNBmaVxrA1pgB5TE2VU2rVMN01y5yJiQPMSJN9QZEraDh_mJC7SBTXZGlmJxHZ4sGLl0XN2YtfvGSaI0yPRPp5ONWatoMjyq-ddKu-lxFqxEhL2pbRU_9mVn52VxrQ7wdwJqrWwCa0Gok4c4FOsD7DDsmH6GCCS3rgPOvy8NjWxzged7H4h-PnRv_4R3CSIMwyioJOthw1kt3-AnQRiPJLbTl6A4p24PwkI-bRK01AIYCTRRnAfeeDfQg_cz8mr5ZavWPu'

/* Unsplash images matching the B&W editorial aesthetic */
const IMG_CITY     = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_FABRIC   = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_FASHION  = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_CAN      = 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_CAR      = 'https://images.unsplash.com/photo-1611016186353-9af58c69a533?w=900&fit=crop&auto=format&q=80&sat=-100'

/* Project screenshot placeholders (dark cards) */
const IMG_PROJ1    = 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_PROJ2    = 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=900&fit=crop&auto=format&q=80&sat=-100'
const IMG_PROJ3    = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&fit=crop&auto=format&q=80&sat=-100'


/* ─── Helpers ─────────────────────────────────────────────── */
function compressImage(file, maxBytes = 30_000) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, Math.sqrt(maxBytes / file.size))
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        let quality = 0.8
        let dataUrl = canvas.toDataURL('image/jpeg', quality)
        while (dataUrl.length > maxBytes * 1.37 && quality > 0.1) {
          quality -= 0.1
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }
        resolve(dataUrl)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/* ─── Reusable components ─────────────────────────────────── */
function Divider() {
  return <div className="border-t border-[#353534] my-10" />
}

function SectionTitle({ children }) {
  return <h2 className="text-lg font-medium text-white mb-6">{children}</h2>
}

function GalleryImage({ src, alt, label, className = '' }) {
  return (
    <div className={`rounded-xl overflow-hidden group relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 ease-in-out"
      />
      {label && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
          <span className="text-xs uppercase tracking-widest font-medium text-white">{label}</span>
        </div>
      )}
    </div>
  )
}

/* ─── Sidebar sections ────────────────────────────────────── */
function ProfilePicModal({ onClose }) {
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={AVATAR}
          alt="Felecia Kenton"
          className="w-72 h-72 object-cover rounded-xl shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1e1e1e] border border-[#353534] flex items-center justify-center text-[#e5e2e1] hover:bg-[#2a2a2a] transition-colors text-sm"
          aria-label="Close"
        >×</button>
      </div>
    </div>
  )
}

function ProfileHeader() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <img
          src={AVATAR}
          alt="Felecia Kenton"
          className="avatar-frame cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setOpen(true)}
        />
        <div>
          <h1 className="text-lg font-medium leading-tight text-white">Felecia Kenton</h1>
          <p className="text-[#8e9192] text-sm">Software Engineer · Graphic Designer · Photographer</p>
        </div>
      </div>
      {open && <ProfilePicModal onClose={() => setOpen(false)} />}
    </>
  )
}

function Bio() {
  return (
    <div className="mb-8">
      <p className="text-[20px] leading-snug tracking-tight">
        I <span className="text-white">build, design, and capture.</span> Full-stack software,
        graphic design, and photography,{' '}
        <span className="text-[#8e9192]">all driven by the same thing: making something that looks good and works even better.</span>
      </p>
    </div>
  )
}

function Availability() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      <span className="text-xs font-medium text-[#8e9192]">Available for work.</span>
    </div>
  )
}

function CTAButton() {
  return (
    <div className="mb-10">
      <a
        href="mailto:kentonfelecia123@gmail.com"
        className="inline-block bg-white text-[#121212] px-6 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95"
      >
        Get in touch
      </a>
    </div>
  )
}

function ClientLogos() {
  const items = ['·', 'FELECITYART', '·', 'FULL-STACK DEV', '·', 'GRAPHIC DESIGN', '·', 'PHOTOGRAPHY']
  const spanStyle = (item) => ({
    fontSize: '1.25rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    color: 'white',
    opacity: item === '·' ? 0.25 : 0.5,
    margin: '0 1.25rem',
    WebkitTextStroke: '0.5px white',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  })

  const x = useMotionValue(0)
  const groupRef = React.useRef(null)

  useAnimationFrame((_, delta) => {
    if (!groupRef.current) return
    const groupWidth = groupRef.current.offsetWidth
    if (!groupWidth) return
    let next = x.get() - (delta * 0.055)
    if (next <= -groupWidth) next += groupWidth
    x.set(next)
  })

  return (
    <div style={{ borderTop: '1px solid #353534', borderBottom: '1px solid #353534', marginBottom: '56px', marginTop: '8px' }}>
      <div style={{ overflow: 'hidden', paddingTop: '60px', paddingBottom: '60px', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        <motion.div style={{ x, display: 'flex', whiteSpace: 'nowrap' }}>
          <div ref={groupRef} style={{ display: 'flex', flexShrink: 0 }}>
            {items.map((name, i) => <span key={i} style={spanStyle(name)}>{name}</span>)}
          </div>
          <div aria-hidden style={{ display: 'flex', flexShrink: 0 }}>
            {items.map((name, i) => <span key={`d${i}`} style={spanStyle(name)}>{name}</span>)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2 className="text-lg font-medium text-white mb-2">About me.</h2>
      <p className="text-[#8e9192] text-sm leading-relaxed mb-8">
        I'm Felecia Kenton, a Software Engineering student at the University of the West Indies, Mona.
        I build full-stack applications and design user-centred interfaces, with a genuine passion
        for graphic design and photography.
      </p>
      <div className="space-y-3">
        {[
          { num: '3+',   label: 'Years building software' },
          { num: '5+',   label: 'Years in graphic design' },
          { num: '2',    label: 'Years in photography' },
          { num: '2026', label: 'Expected graduation' },
        ].map(({ num, label }) => (
          <div key={label} className="flex items-baseline gap-2">
            <span className="text-lg font-medium text-white">{num}</span>
            <span className="text-[#8e9192] text-xs">· {label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SERVICES = [
  {
    title: 'Full-Stack Development',
    items: ['React front-ends', 'FastAPI / Flask backends', 'REST & WebSocket APIs', 'PostgreSQL & Supabase databases', 'Docker containerisation'],
  },
  {
    title: 'UI/UX & Front-End',
    items: ['Figma wireframes & prototypes', 'Responsive web interfaces', 'Data visualisation dashboards', 'Android apps (Android Studio)'],
  },
  {
    title: 'Graphic Design & Photography',
    items: ['Posters, flyers & social graphics', 'Brand identity & newsletters', 'Professional portrait photography', 'Print & digital assets'],
  },
]

function Services() {
  return (
    <div>
      <SectionTitle>Services.</SectionTitle>
      <ol className="space-y-6 list-none">
        {SERVICES.map(({ title, items }, i) => (
          <li key={title}>
            <p className="text-sm font-medium text-white mb-2">{i + 1}.&nbsp;&nbsp;{title}</p>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item} className="text-[#8e9192] text-sm flex gap-2">
                  <span>•</span>{item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

const STACK = [
  { name: 'React',      role: 'Front-end framework',        icon: 'react/react-original' },
  { name: 'FastAPI',    role: 'Backend / REST APIs',        icon: 'fastapi/fastapi-original' },
  { name: 'PostgreSQL', role: 'Relational database',        icon: 'postgresql/postgresql-original' },
  { name: 'Python',     role: 'Backend & scripting',        icon: 'python/python-original' },
  { name: 'Docker',     role: 'Containerisation',           icon: 'docker/docker-original' },
  { name: 'Figma',      role: 'UI/UX & prototyping',        icon: 'figma/figma-original' },
  { name: 'Kotlin',     role: 'Android development',        icon: 'kotlin/kotlin-original' },
  { name: 'Arduino',    role: 'Embedded systems',           icon: 'arduino/arduino-original' },
  { name: 'TypeScript', role: 'Typed JavaScript',           icon: 'typescript/typescript-original' },
  { name: 'Flutter',    role: 'Cross-platform mobile',      icon: 'flutter/flutter-original' },
  { name: 'Java',       role: 'Object-oriented development', icon: 'java/java-original' },
]

function Stack() {
  return (
    <div>
      <SectionTitle>Stack.</SectionTitle>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {STACK.map(({ name, role, icon }) => (
          <div key={name} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-[#1e1e1e] border border-[#353534] flex items-center justify-center">
              <img
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}.svg`}
                alt={name}
                width={22}
                height={22}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-none">{name}</p>
              <p className="text-[#8e9192] text-xs mt-0.5">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const EXPERIENCE = [
  {
    title: 'Graphic Designer & Photographer',
    company: 'FelecityArt (Self-Employed)',
    period: 'Jul 2024 – Present',
    desc: 'Managed multiple concurrent client projects delivering graphics, posters, flyers, and professional portrait photography for various clients and committees.',
  },
  {
    title: 'BSc Software Engineering',
    company: 'University of the West Indies',
    period: 'Sep 2022 – Sep 2026',
    desc: 'Relevant coursework: Database Management, Netcentric Computing, Android Development, Digital Electronics & Circuits, Project Management, Formal Methods & Software Reliability, Software Testing.',
  },
  {
    title: 'Publications Committee Chairperson',
    company: 'Physics Subcommittee, UWI',
    period: '2023 – 2024',
    desc: 'Designed promotional materials and the official Physics Newsletter; created the subcommittee uniform and advised on branding strategy.',
  },
  {
    title: 'Technical Support Operator',
    company: 'Astra Technology',
    period: 'May 2022 – Aug 2022',
    desc: 'Configured and programmed router and cable boxes for customer deployments and provided phone-based technical support to guide customers through device setup.',
  },
]

function Experience() {
  return (
    <div>
      <SectionTitle>Experience.</SectionTitle>
      <div className="space-y-8">
        {EXPERIENCE.map(({ title, company, period, desc }) => (
          <div key={title}>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
              <span className="text-sm font-medium text-white">{title}</span>
              <span className="text-[#8e9192] text-xs">•</span>
              <span className="text-[#8e9192] text-xs">{company}</span>
              <span className="text-[#8e9192] text-xs">•</span>
              <span className="text-[#8e9192] text-xs">{period}</span>
            </div>
            <p className="text-[#8e9192] text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// To add a testimonial: { name, role, quote, avatar }
// avatar: import from ./assets/images/ or leave as '' for initials fallback
const TESTIMONIALS = [
  {
    name: 'Kimano Lambert',
    role: 'NOC Engineer',
    quote: 'Felecia has a knack for converting ideas into beautiful images, I love the work she does!',
    avatar: kimPic,
  },
]

const INPUT_CLS = 'w-full bg-[#121212] border border-[#353534] rounded-lg px-3 py-2 text-sm text-white placeholder-[#8e9192] focus:outline-none focus:border-white transition-colors'
const LABEL_CLS = 'block text-xs text-[#8e9192] uppercase tracking-widest mb-1'
const ERR_CLS = 'text-xs text-red-400 mt-1'

const BLANK = { name: '', role: '', email: '', message: '' }

function TestimonialModal({ onClose }) {
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
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, photo: 'Please select an image file.' }))
      return
    }
    try {
      const b64 = await compressImage(file)
      setPhotoPreview(b64)
      setPhotoBase64(b64)
    } catch {
      setErrors((prev) => ({ ...prev, photo: 'Could not read image. Try another file.' }))
    }
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
            <label htmlFor="t-name" className={LABEL_CLS}>Name</label>
            <input id="t-name" type="text" value={fields.name} onChange={set('name')} className={INPUT_CLS} placeholder="Your name" maxLength={80} />
            {errors.name && <p className={ERR_CLS}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="t-role" className={LABEL_CLS}>Role</label>
            <input id="t-role" type="text" value={fields.role} onChange={set('role')} className={INPUT_CLS} placeholder="Your role or title" maxLength={80} />
            {errors.role && <p className={ERR_CLS}>{errors.role}</p>}
          </div>

          <div>
            <label htmlFor="t-email" className={LABEL_CLS}>Email</label>
            <input id="t-email" type="email" value={fields.email} onChange={set('email')} className={INPUT_CLS} placeholder="your@email.com" maxLength={120} />
            {errors.email && <p className={ERR_CLS}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="t-message" className={LABEL_CLS}>Testimonial</label>
            <textarea id="t-message" rows={4} value={fields.message} onChange={set('message')} className={INPUT_CLS} placeholder="Share your experience…" maxLength={1000} />
            {errors.message && <p className={ERR_CLS}>{errors.message}</p>}
          </div>

          <div>
            <label htmlFor="t-photo" className={LABEL_CLS}>Photo (optional)</label>
            <input
              id="t-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-xs text-[#8e9192] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border file:border-[#353534] file:text-xs file:font-medium file:bg-[#121212] file:text-white hover:file:bg-[#2a2a2a] file:transition-colors cursor-pointer"
            />
            {photoPreview && (
              <img src={photoPreview} alt="Preview" className="mt-2 w-12 h-12 rounded-lg object-cover grayscale" />
            )}
            {errors.photo && <p className={ERR_CLS}>{errors.photo}</p>}
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

function Testimonials() {
  const [showForm, setShowForm] = React.useState(false)
  return (
    <div>
      <SectionTitle>Testimonials.</SectionTitle>
      {TESTIMONIALS.length > 0 ? (
        <div className="space-y-8">
          {TESTIMONIALS.map(({ name, role, avatar, quote }) => (
            <div key={name} className="flex gap-4">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0 mt-0.5 grayscale"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg flex-shrink-0 mt-0.5 bg-[#353534] flex items-center justify-center text-white text-sm font-medium select-none">
                  {name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
              )}
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-medium text-white">{name}</span>
                  <span className="text-[#8e9192] text-xs">• {role}</span>
                </div>
                <p className="text-[#8e9192] text-sm leading-relaxed">"{quote}"</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[#8e9192] text-sm leading-relaxed mb-2">No testimonials yet — be the first.</p>
      )}
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

function ReachOut() {
  return (
    <div>
      <SectionTitle>Reach out.</SectionTitle>
      <p className="text-[#8e9192] text-sm leading-relaxed mb-6">
        Let's work together to bring your ideas to life.
      </p>
      <div className="space-y-2 mb-6">
        <a href="mailto:kentonfelecia123@gmail.com" className="block text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">
          kentonfelecia123@gmail.com
        </a>
        <a href="tel:+18763848711" className="block text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">
          876-384-8711
        </a>
      </div>
      <div className="flex gap-4 mb-12">
        <a href="https://www.linkedin.com/in/felecityart/" target="_blank" rel="noreferrer" className="text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">LinkedIn</a>
        <a href="https://github.com/FelecityArt" target="_blank" rel="noreferrer" className="text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">GitHub</a>
      </div>
      <div className="border-t border-[#353534] pt-6 space-y-1">
        <p className="text-[#8e9192] text-xs">© 2026 Felecia Kenton. All rights reserved.</p>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="w-full md:w-[460px] lg:w-[520px] flex-shrink-0 md:h-full overflow-y-auto no-scrollbar bg-[#121212] p-8 md:p-10 lg:p-14 flex flex-col">
      <ProfileHeader />
      <Bio />
      <Availability />
      <CTAButton />
      <ClientLogos />
      <About />
      <Divider />
      <Services />
      <Divider />
      <Stack />
      <Divider />
      <Experience />
      {/* On desktop, testimonials + footer live here inside the scrollable aside */}
      <div className="hidden md:flex md:flex-col">
        <Divider />
        <Testimonials />
        <Divider />
        <ReachOut />
      </div>
    </aside>
  )
}

/* ─── Gallery ─────────────────────────────────────────────── */
const GALLERY_ITEMS = [
  { src: REFLECTION,   alt: 'REFLECTION',            label: 'REFLECTION',            ratio: '3/4',  desc: 'A portrait series exploring self-recognition, the small private moments where a person simply sees themselves.',                                                              year: '2025', scope: 'Photography',    client: 'Self-initiated',  },
  { src: STILL,        alt: 'EDGES',                 label: 'EDGES',                 ratio: '3/4',  desc: 'Architecture as character study, the way a building can feel just as expressive as a face when you find the right angle.',                                                   year: '2024', scope: 'Photography',    client: 'Self-initiated',  },
  { src: BOARDWALK,    alt: 'BOARDWALK IN VIRGINIA', label: 'BOARDWALK IN VIRGINIA', ratio: '4/5',  desc: 'A study in perspective and horizon, the particular stillness that only exists at the edge of land and open water.',                                                          year: '2024', scope: 'Photography',    client: 'Self-initiated',  },
  { src: BRAINBASH,    alt: 'BRAINBASH',             label: 'BRAINBASH',             ratio: '4/3',  desc: 'Built around the belief that learning should feel like play, where competition and curiosity drive the classroom.',                        year: '2026', scope: 'Full-Stack Dev',  client: 'Capstone Project', },
  { src: GIRLSNIGHT,   alt: 'GIRLS NIGHT',           label: 'GIRLS NIGHT',           ratio: '2/3',  desc: 'A document of candid joy, the kind of closeness that shows up naturally when you stop posing and just exist together.',                                                      year: '2025', scope: 'Photography',    client: 'Self-initiated',  },
  { src: FRIENDSHIP,   alt: 'FRIENDSHIP',            label: 'FRIENDSHIP',            ratio: '4/3',  desc: 'About warmth in the truest sense, the kind that has nothing to do with the lights behind them and everything to do with who is in front of the lens.',                      year: '2025', scope: 'Photography',    client: 'Self-initiated',  },
  { src: INSPIRED,     alt: 'INSPIRED',              label: 'INSPIRED',              ratio: '2/3',  desc: 'A portrait about chosen stillness, the quiet self-possession of someone fully present without needing to prove it.',                                                         year: '2024', scope: 'Photography',    client: 'Self-initiated',  },
  { src: GRAPHICTS,    alt: 'GRAPHIC T-SHIRTS',      label: 'GRAPHIC T-SHIRTS',      ratio: '1/1',  objPos: 'top',  desc: 'Built for Artmosphere, my own brand, a project spanning graphic design, product design, and the full storefront, where clothing is treated as a surface worth taking seriously and every piece carries a point of view.',               year: '2023', scope: 'Design & Development',  client: 'Own Brand',  },
  { src: HALLOWEEN,    alt: 'HALLOWEEN',             label: 'HALLOWEEN',             ratio: '4/3',  desc: 'Event design that understands a flyer is also a promise, built to make the night feel inevitable before it arrives.',                                                        year: '2024', scope: 'Graphic Design',  client: 'Cluster 8',       },
  { src: MEDSIM,       alt: 'MEDSIM',                label: 'MEDSIM',                ratio: '16/9', desc: 'A web experience designed around a real constraint: bringing surgical training to the people who need it without requiring the infrastructure it usually demands.',            year: '2026', scope: 'UI/UX & Project Management',    client: 'MedSim',          },
  { src: ARTMOSPHERE,  alt: 'ARTMOSPHERE',           label: 'ARTMOSPHERE',           ratio: '3/4',  desc: 'A storefront that opens with a point of view, built on the idea that fashion and art have always been the same conversation.',                                               year: '2023', scope: 'Graphic Design',  client: 'Own Brand',       },
]

function Lightbox({ image, onClose, onPrev, onNext }) {
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row" style={{ backgroundColor: '#121212' }}>

      {/* ── Left info panel ── */}
      <div className="w-full md:w-[320px] lg:w-[380px] flex-shrink-0 flex flex-col overflow-y-auto no-scrollbar p-8 md:p-10 lg:p-14">
        {/* Back */}
        <button
          onClick={onClose}
          className="flex items-center justify-center text-[#e5e2e1] bg-[#1e1e1e] hover:bg-[#2a2a2a] transition-colors rounded-full w-9 h-9 text-lg mb-10"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title + description */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">{image.label}</h2>
        <p className="text-[#8e9192] text-sm leading-relaxed mb-8">{image.desc}</p>

        {/* Divider */}
        <div className="border-t border-[#353534] mb-8" />

        {/* Metadata */}
        <div className="space-y-3">
          {[
            { key: 'Year',   val: image.year   },
            { key: 'Scope',  val: image.scope  },
            { key: 'Client', val: image.client },
          ].map(({ key, val }) => (
            <div key={key} className="flex items-baseline gap-3">
              <span className="text-[#8e9192] text-sm w-20 flex-shrink-0">{key}</span>
              <span className="text-[#353534] text-xs">•</span>
              <span className="text-white text-sm font-medium">{val}</span>
            </div>
          ))}
        </div>

        {/* Spacer + nav arrows at bottom */}
        <div className="mt-auto pt-10 flex items-center gap-4">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full border border-[#353534] flex items-center justify-center text-[#8e9192] hover:text-white hover:border-white transition-colors text-sm"
            aria-label="Previous"
          >←</button>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full border border-[#353534] flex items-center justify-center text-[#8e9192] hover:text-white hover:border-white transition-colors text-sm"
            aria-label="Next"
          >→</button>
        </div>
      </div>

      {/* ── Right image panel ── */}
      <div
        className="flex-1 overflow-hidden relative"
        onClick={onClose}
      >
        <img
          src={image.src}
          alt={image.alt}
          onClick={(e) => { e.stopPropagation(); setExpanded(true) }}
          className="w-full h-full object-contain cursor-zoom-in"
        />
      </div>

      {/* ── Expanded fullscreen view ── */}
      {expanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95"
          onClick={() => setExpanded(false)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain select-none"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1e1e1e] text-white flex items-center justify-center text-lg"
            onClick={() => setExpanded(false)}
            aria-label="Close fullscreen"
          >×</button>
        </div>
      )}

    </div>
  )
}

function Gallery() {
  const [selectedIdx, setSelectedIdx] = React.useState(null)
  const total = GALLERY_ITEMS.length

  return (
    <>
      <main className="w-full md:flex-1 md:h-full overflow-y-auto no-scrollbar bg-[#121212] p-4 md:p-5">
        {/* CSS columns gives true masonry — equal gap between every item regardless of height */}
        <div style={{ columns: 2, columnGap: '1rem' }}>
          {GALLERY_ITEMS.map(({ src, alt, label, ratio, objPos }, idx) => (
            <div key={alt} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
              <div
                className="rounded-xl overflow-hidden group relative w-full cursor-pointer"
                style={{ aspectRatio: ratio }}
                onClick={() => setSelectedIdx(idx)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700 ease-in-out"
                  style={objPos ? { objectPosition: objPos } : undefined}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-xs uppercase tracking-widest font-medium text-white">{label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {selectedIdx !== null && (
        <Lightbox
          image={GALLERY_ITEMS[selectedIdx]}
          onClose={() => setSelectedIdx(null)}
          onPrev={() => setSelectedIdx((selectedIdx - 1 + total) % total)}
          onNext={() => setSelectedIdx((selectedIdx + 1) % total)}
        />
      )}
    </>
  )
}

/* ─── Root ────────────────────────────────────────────────── */
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
    <div ref={rootRef} className="flex flex-col md:flex-row md:h-screen w-full md:overflow-hidden bg-[#121212] font-sans antialiased relative">
      <DotField />
      <Sidebar />
      <Gallery />
      {/* On mobile, testimonials + footer appear after the gallery */}
      <div className="md:hidden bg-[#121212] px-8 pb-8 flex flex-col">
        <Divider />
        <Testimonials />
        <Divider />
        <ReachOut />
      </div>
    </div>
  )
}
