import React from 'react'
import './index.css'
import DotField from './DotField'

/* ─── Image constants ─────────────────────────────────────── */
const AVATAR      = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDddpUalbb5W1uay8a-56UOoy0jSZ2LapfPI_MXE6a69xHQW9lh16deHQ2phDDtBpDtSqPVtiesojedmqX4R89gl5vw_yLvy3jqJE7e77cgwtuY8tJMmUQ3MN17iqAyavyhKLW9so1mLrmz5V6TzMMU-mvVuW6e93_Gwl3hOc7KkBb3yNxdLeEqNpr-OFCr1ARA95ynMM4LMzYr6rKzKmEQbGrbTj5cnwARrFiLqkwFzobBpfLMtRVZrvGvvyvKUa2pIrovzN5LTTiE'
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
function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-10">
      <img src={AVATAR} alt="Kima Davidson" className="avatar-frame" />
      <div>
        <h1 className="text-lg font-medium leading-tight text-white">Kima Davidson</h1>
        <p className="text-[#8e9192] text-sm">Digital Designer</p>
      </div>
    </div>
  )
}

function Bio() {
  return (
    <div className="mb-8">
      <p className="text-2xl md:text-3xl leading-snug tracking-tight">
        I <span className="text-white">design digital experiences</span> — from modern websites
        and visual identities and graphic design —{' '}
        <span className="text-[#8e9192]">focused on clarity, usability, and strong visual storytelling.</span>
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
        href="mailto:hello@kimadavidson.design"
        className="inline-block bg-white text-[#121212] px-6 py-2.5 rounded-full font-semibold text-sm transition-transform hover:scale-105 active:scale-95"
      >
        Get in touch
      </a>
    </div>
  )
}

function ClientLogos() {
  return (
    <div className="border-t border-b border-[#353534] py-7 mb-8">
      <div className="flex justify-between items-center opacity-50 grayscale contrast-125">
        <span className="text-sm font-black tracking-widest text-white">IPSUM</span>
        <span className="text-sm font-bold tracking-tighter text-white">LOOO</span>
        <span className="text-sm font-bold italic text-white">L.||||</span>
        <span className="w-6 h-4 bg-white/60 skew-x-[-20deg]" />
      </div>
    </div>
  )
}

function About() {
  return (
    <div>
      <SectionTitle>About me.</SectionTitle>
      <p className="text-[#8e9192] text-sm leading-relaxed mb-8">
        I'm Kima Davidson, a digital designer based in New York with over 11 years of experience
        crafting thoughtful, visually driven digital experiences.
      </p>
      <div className="space-y-3">
        {[
          { num: '11+', label: 'Years of experience' },
          { num: '60+', label: 'Clients worldwide' },
          { num: '100+', label: 'Projects delivered' },
          { num: '97%', label: 'Client satisfaction rate' },
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
    title: 'Web Design',
    items: ['Custom websites', 'Landing pages', 'UI/UX design', 'Website redesigns'],
  },
  {
    title: 'Branding',
    items: ['Logo design', 'Visual identity systems', 'Brand guidelines', 'Style guides'],
  },
  {
    title: 'Graphic Design',
    items: ['Marketing materials', 'Social media graphics', 'Presentation design', 'Print design', 'Digital assets'],
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
  { name: 'Framer',      role: 'Web design',         color: '#0055FF' },
  { name: 'Figma',       role: 'General Design Tool', color: '#F24E1E' },
  { name: 'Photoshop',   role: 'Image editing',       color: '#001D34' },
  { name: 'Illustrator', role: 'Graphic design',      color: '#FF7C00' },
  { name: 'Midjourney',  role: 'Assets generation',   color: '#ffffff' },
  { name: 'Spline',      role: '3D design',           color: '#1ABCFE' },
]

function Stack() {
  return (
    <div>
      <SectionTitle>Stack.</SectionTitle>
      <div className="space-y-4">
        {STACK.map(({ name, role, color }) => (
          <div key={name} className="flex items-center gap-4">
            <div
              className="w-9 h-9 rounded-lg flex-shrink-0"
              style={{ background: `${color}22`, border: `1px solid ${color}44` }}
            >
              <div className="w-full h-full rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color }}>{name[0]}</span>
              </div>
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
    title: 'Senior Digital Designer',
    company: 'Freelance',
    period: '2019 – Present',
    desc: 'Working with startups, agencies, and brands to design digital experiences that balance aesthetics and usability.',
  },
  {
    title: 'Digital Designer',
    company: 'Creative Studio',
    period: '2015 — 2019',
    desc: 'Designed modern websites and brand visuals, collaborating with developers and creatives to deliver cohesive digital experiences across multiple platforms.',
  },
  {
    title: 'Graphic Designer',
    company: 'Media Agency',
    period: '2012 — 2015',
    desc: 'Produced motion graphics, animations, and edited video content for marketing campaigns, social media, and promotional projects.',
  },
  {
    title: 'Junior Web Designer',
    company: 'Design Agency',
    period: '2010 — 2012',
    desc: 'Supported website design projects, created visual assets, and assisted in building responsive layouts while developing a strong foundation in digital design.',
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

function Testimonials() {
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
        <a href="mailto:hello@kimadavidson.com" className="block text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">
          hello@kimadavidson.com
        </a>
        <a href="tel:+11234567890" className="block text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">
          (123) 456 7890
        </a>
      </div>
      <div className="flex gap-4 mb-12">
        {['Twitter/X', 'LinkedIn', 'Instagram'].map((s) => (
          <a key={s} href="#" className="text-white text-sm underline underline-offset-2 hover:text-[#8e9192] transition-colors">{s}</a>
        ))}
      </div>
      <div className="border-t border-[#353534] pt-6 space-y-1">
        <p className="text-[#8e9192] text-xs">Designed in Framer By Thaer</p>
        <p className="text-[#8e9192] text-xs">© 2025 All rights reserved</p>
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
  { src: IMG_PORTRAIT, alt: 'Editorial Series',      label: 'Editorial Series',      ratio: '3/4'  },
  { src: IMG_VASE,     alt: 'Visual Identity',        label: 'Visual Identity',        ratio: '3/4'  },
  { src: IMG_CITY,     alt: 'City Series',            label: 'City Series',            ratio: '4/5'  },
  { src: IMG_MISC,     alt: 'Interaction Design',     label: 'Interaction Design',     ratio: '4/3'  },
  { src: IMG_FABRIC,   alt: 'New Perspective',        label: 'New Perspective',        ratio: '2/3'  },
  { src: IMG_FASHION,  alt: 'Motion Study',           label: 'Motion Study',           ratio: '2/3'  },
  { src: IMG_PROJ1,    alt: 'Scarlet Design Studio',  label: 'Scarlet Design Studio®', ratio: '4/3'  },
  { src: IMG_CAN,      alt: 'Product Design',         label: 'Product Design',         ratio: '1/1'  },
  { src: IMG_PROJ2,    alt: 'Averra Studio',          label: 'Averra — Studio®',       ratio: '4/3'  },
  { src: IMG_CAR,      alt: 'Brand Campaign',         label: 'Brand Campaign',         ratio: '16/9' },
  { src: IMG_PROJ3,    alt: 'EIZO MORI',              label: 'EIZO MORI',              ratio: '3/4'  },
]

function Gallery() {
  return (
    <main className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#121212] p-4 md:p-5">
      {/* CSS columns gives true masonry — equal gap between every item regardless of height */}
      <div style={{ columns: 2, columnGap: '1rem' }}>
        {GALLERY_ITEMS.map(({ src, alt, label, ratio }) => (
          <div key={alt} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
            <div
              className="rounded-xl overflow-hidden group relative w-full"
              style={{ aspectRatio: ratio }}
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
