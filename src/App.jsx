import React from 'react'
import 'smooth-scroll/tokens.css'
import 'smooth-scroll/_responsive-runtime.css'

// Smooth scroll controller (renders nothing visible, attaches Lenis)
import SmoothscrollProd from 'smooth-scroll/SmoothscrollProd.js'
// Scroll progress bar
import Scrollprogress from 'smooth-scroll/Scrollprogress.js'
// Left panel — hero/profile
import Primary from 'smooth-scroll/Primary.js'
// Right panel sections
import Stats from 'smooth-scroll/Stats.js'
import Service from 'smooth-scroll/Service.js'
import CardsStack from 'smooth-scroll/CardsStack.js'
import Experience from 'smooth-scroll/Experience.js'
import Award from 'smooth-scroll/Award.js'
import Testimonial from 'smooth-scroll/Testimonial.js'
import Footer from 'smooth-scroll/Footer.js'
import BackToTop from 'smooth-scroll/BackToTop.js'

export default function App() {
  return (
    <>
      <SmoothscrollProd intensity={10} />
      <Scrollprogress />

      <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden', background: '#111' }}>
        {/* Left panel: profile, bio, CTA, client logos */}
        <div style={{ width: '340px', flexShrink: 0, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <Primary />
        </div>

        {/* Right panel: photo grid + content sections */}
        <div style={{ flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <Stats />
          <Service />
          <CardsStack />
          <Experience />
          <Award />
          <Testimonial />
          <Footer />
        </div>
      </div>

      <BackToTop />
    </>
  )
}
