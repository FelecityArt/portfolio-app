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

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

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

      ctx.fillStyle = 'rgba(255,255,255,0.12)'

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
              const len = dist || 1
              const tx = -dy / len
              const ty = dx / len
              const pulse = Math.sin(frame * 0.04 + dist * 0.05)
              ox = tx * t * 16 * pulse
              oy = ty * t * 16 * pulse
            }
          }

          const x = bx + ox
          const y = by + oy

          if (t > 0.01) {
            const angle = mouse ? Math.atan2(y - mouse.y, x - mouse.x) : 0
            const angleFraction = ((angle / (Math.PI * 2) + 0.5) % 1 + 1) % 1
            const [r2, g2, b2] = emberColor(angleFraction)
            const alpha = 0.12 + t * 0.75
            ctx.fillStyle = `rgba(${r2},${g2},${b2},${alpha})`
          }

          const dotRadius = 1 + t * 1.5
          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fill()

          if (t > 0.01) {
            ctx.fillStyle = 'rgba(255,255,255,0.12)'
          }
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
    }

    function onMouseLeave() {
      mouseRef.current = null
      stopLoop()
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    resize()
    draw() // initial static render

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      stopLoop()
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
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
