import React from 'react'
import './index.css'
import DotField from './DotField'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import emailjs from '@emailjs/browser'
import myPic from './assets/images/my_pic.png'

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

/* Testimonial avatars */
const AVT_EMILY    = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=80&sat=-100'
const AVT_DANIEL   = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80&sat=-100'
const AVT_MICHAEL  = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&auto=format&q=80&sat=-100'
const AVT_SARAH    = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format&q=80&sat=-100'

/* ─── Helpers ─────────────────────────────────────────────── */
function compressImage(file, maxBytes = 500_000) {
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
        resolve(canvas.toDataURL('image/jpeg', 0.8))
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
  return <div className="border-t border-[#353534] my-10" style={{ marginRight: '-3rem' }} />
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
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
    <div style={{ borderTop: '1px solid #353534', borderBottom: '1px solid #353534', marginBottom: '56px', marginTop: '8px', marginRight: '-3rem' }}>
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

const TESTIMONIALS = [
  {
    name: 'Emily T',
    role: 'Product Manager',
    avatar: AVT_EMILY,
    quote: '"Kima brings creativity, clarity, and professionalism to every project. Her ability to combine design, motion, and video made a real difference for our launch."',
  },
  {
    name: 'Daniel R.',
    role: 'Founder',
    avatar: AVT_DANIEL,
    quote: '"Working with Kima was smooth from start to finish. She translated our ideas into a clean, modern website that truly represents our brand."',
  },
  {
    name: 'Michael K.',
    role: 'Creative Lead',
    avatar: AVT_MICHAEL,
    quote: '"Reliable, thoughtful, and highly skilled. Kima consistently delivered high-quality work on time and was great to collaborate with."',
  },
  {
    name: 'Sarah M.',
    role: 'Marketing Director',
    avatar: AVT_SARAH,
    quote: '"Kima has an incredible eye for detail and a clear understanding of how design should function, not just look good. The final result exceeded our expectations."',
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
            <label className={LABEL_CLS}>Name</label>
            <input type="text" value={fields.name} onChange={set('name')} className={INPUT_CLS} placeholder="Your name" maxLength={80} />
            {errors.name && <p className={ERR_CLS}>{errors.name}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Role</label>
            <input type="text" value={fields.role} onChange={set('role')} className={INPUT_CLS} placeholder="Your role or title" maxLength={80} />
            {errors.role && <p className={ERR_CLS}>{errors.role}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Email</label>
            <input type="email" value={fields.email} onChange={set('email')} className={INPUT_CLS} placeholder="your@email.com" maxLength={120} />
            {errors.email && <p className={ERR_CLS}>{errors.email}</p>}
          </div>

          <div>
            <label className={LABEL_CLS}>Testimonial</label>
            <textarea rows={4} value={fields.message} onChange={set('message')} className={INPUT_CLS} placeholder="Share your experience…" maxLength={1000} />
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
        <a href="https://linkedin.com/in/felecia-kenton" target="_blank" rel="noreferrer" className="text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">LinkedIn</a>
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
    <aside className="w-full md:w-[460px] lg:w-[520px] flex-shrink-0 h-full overflow-y-auto no-scrollbar bg-[#121212] p-8 md:p-10 lg:p-14 flex flex-col">
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
      <Divider />
      <Testimonials />
      <Divider />
      <ReachOut />
    </aside>
  )
}

/* ─── Gallery ─────────────────────────────────────────────── */
const GALLERY_ITEMS = [
  { src: IMG_PORTRAIT, alt: 'Editorial Series',     label: 'Editorial Series',      ratio: '3/4',  desc: 'A curated editorial series exploring texture, light, and form across analog and digital mediums.',        year: '2023', scope: 'Photography',    client: 'Self-initiated',  duration: '4 weeks' },
  { src: IMG_VASE,     alt: 'Visual Identity',      label: 'Visual Identity',       ratio: '3/4',  desc: 'Complete brand identity system including logo, typography, colour palette, and usage guidelines.',         year: '2023', scope: 'Branding',        client: 'Studio Noma',     duration: '6 weeks' },
  { src: IMG_CITY,     alt: 'City Series',          label: 'City Series',           ratio: '4/5',  desc: 'Urban documentary series capturing the quiet geometry of city infrastructure at dawn.',                    year: '2022', scope: 'Photography',    client: 'Self-initiated',  duration: '8 weeks' },
  { src: IMG_MISC,     alt: 'Interaction Design',   label: 'Interaction Design',    ratio: '4/3',  desc: 'Micro-interaction design system built for a fintech dashboard — focused on clarity and motion.',           year: '2023', scope: 'UI/UX Design',    client: 'Vesper Finance',  duration: '10 weeks' },
  { src: IMG_FABRIC,   alt: 'New Perspective',      label: 'New Perspective',       ratio: '2/3',  desc: 'A campaign exploring sustainable fashion through striking close-up photography and minimal layout.',        year: '2022', scope: 'Graphic Design',  client: 'Atelier Lune',    duration: '3 weeks' },
  { src: IMG_FASHION,  alt: 'Motion Study',         label: 'Motion Study',          ratio: '2/3',  desc: 'Motion graphics package created for a luxury fashion week campaign across digital and print.',             year: '2023', scope: 'Motion Design',   client: 'Maison Voss',     duration: '5 weeks' },
  { src: IMG_PROJ1,    alt: 'Scarlet Design Studio',label: 'Scarlet Design Studio®',ratio: '4/3',  desc: 'Full website redesign and brand refresh for a creative studio. Focused on bold typography and space.',     year: '2023', scope: 'Web Design',      client: 'Scarlet Studio',  duration: '8 weeks' },
  { src: IMG_CAN,      alt: 'Product Design',       label: 'Product Design',        ratio: '1/1',  desc: 'Packaging and product design for a premium beverage brand entering the European market.',                  year: '2022', scope: 'Product Design',  client: 'Orla Drinks Co.', duration: '6 weeks' },
  { src: IMG_PROJ2,    alt: 'Averra Studio',        label: 'Averra — Studio®',      ratio: '4/3',  desc: 'Brand identity and web presence for an architecture studio with a focus on minimal, spatial design.',      year: '2023', scope: 'Branding',        client: 'Averra Studio',   duration: '7 weeks' },
  { src: IMG_CAR,      alt: 'Brand Campaign',       label: 'Brand Campaign',        ratio: '16/9', desc: 'Campaign visuals and social graphics for a product launch targeting design-forward early adopters.',        year: '2024', scope: 'Graphic Design',  client: 'Pulse Agency',    duration: '6 weeks' },
  { src: IMG_PROJ3,    alt: 'EIZO MORI',            label: 'EIZO MORI',             ratio: '3/4',  desc: 'Visual identity and lookbook design for an independent menswear label rooted in Japanese minimalism.',     year: '2024', scope: 'Branding',        client: 'EIZO MORI',       duration: '9 weeks' },
]

function Lightbox({ image, onClose, onPrev, onNext }) {
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
            { key: 'Year',     val: image.year     },
            { key: 'Scope',    val: image.scope    },
            { key: 'Client',   val: image.client   },
            { key: 'Duration', val: image.duration },
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
          onClick={(e) => e.stopPropagation()}
          className="w-full h-full object-contain"
        />
      </div>

    </div>
  )
}

function Gallery() {
  const [selectedIdx, setSelectedIdx] = React.useState(null)
  const total = GALLERY_ITEMS.length

  return (
    <>
      <main className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#121212] p-4 md:p-5">
        {/* CSS columns gives true masonry — equal gap between every item regardless of height */}
        <div style={{ columns: 2, columnGap: '1rem' }}>
          {GALLERY_ITEMS.map(({ src, alt, label, ratio }, idx) => (
            <div key={alt} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
              <div
                className="rounded-xl overflow-hidden group relative w-full cursor-pointer"
                style={{ aspectRatio: ratio }}
                onClick={() => setSelectedIdx(idx)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-[#121212] font-sans antialiased relative">
      <DotField />
      <Sidebar />
      <Gallery />
    </div>
  )
}
