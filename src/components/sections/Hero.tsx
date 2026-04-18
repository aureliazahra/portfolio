import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import { WipeText } from '../ui/AnimatedText'
const ROLES = ['Flutter Developer', 'UI/UX Designer', 'Creative Coder', 'Digital Maker']
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 8])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])
  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(240,236,228,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(240,236,228,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: 'transform 0.3s ease',
          }}
        />
      </div>
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full blur-[120px] opacity-15"
          style={{
            width: 600,
            height: 600,
            top: '-10%',
            right: '-10%',
            background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)',
            x: mousePos.x * -1.5,
            y: mousePos.y * -1,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full blur-[100px] opacity-10"
          style={{
            width: 400,
            height: 400,
            bottom: '10%',
            left: '-5%',
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            x: mousePos.x * 1,
            y: mousePos.y * 0.8,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>
      {/* Main content */}
      <motion.div
        style={{ y: springY, opacity, scale, rotateX }}
        className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-14 lg:px-20 pt-36 pb-16"
        data-cursor="default"
      >
        {/* Top label row */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-[0.25em] uppercase text-cream/40">
              Available for work
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs text-cream/30 tracking-widest uppercase hidden md:block"
          >
            Based in Malang, Indonesia
          </motion.div>
        </div>
        {/* Huge headline */}
        <div className="flex-1 flex flex-col justify-center mt-8 md:mt-0">
          {/* Role switcher */}
          <div
            className="overflow-hidden mb-4 md:mb-6"
            style={{ height: '1.8rem' }}
          >
            <motion.p
              key={roleIndex}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-amber-400/70"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {ROLES[roleIndex]}
            </motion.p>
          </div>
          {/* Main headline */}
          <div className="mb-0">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              >
                <h1
                  className="leading-[0.88] font-bold text-cream"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(72px, 12vw, 180px)',
                    transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.03}px)`,
                    transition: 'transform 0.4s ease',
                  }}
                >
                  AURELIA'S
                </h1>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                className="flex items-center gap-6 flex-wrap"
              >
                <h1
                  className="leading-[0.88] text-stroke"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(72px, 12vw, 180px)',
                    WebkitTextStroke: '1px rgba(240,236,228,0.25)',
                    color: 'transparent',
                  }}
                >
                  Portfolio
                </h1>
                {/* Spinning badge */}
                <motion.div
                  className="relative hidden md:flex items-center justify-center"
                  style={{ width: 110, height: 110 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <defs>
                      <path
                        id="circle-path"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text
                      className="fill-cream/40 text-[9px]"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', letterSpacing: '3px' }}
                    >
                      <textPath href="#circle-path">
                        FLUTTER ✦ DESIGN ✦ CODE ✦ CREATE ✦ &nbsp;
                      </textPath>
                    </text>
                  </svg>
                  <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12"
        >
          {/* Description */}
          <div className="max-w-sm">
            <p
              className="text-cream/40 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              A designer and developer who believes that good design speaks,even without words.
              I create with purpose, clarity, and impact.
            </p>
          </div>
          {/* CTA buttons */}
          <div className="flex items-center gap-4">
            <MagneticButton strength={0.35}>
              <button
                onClick={() => scrollTo('#work')}
                className="group relative px-8 py-4 bg-cream text-dark rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(240,236,228,0.2)]"
                style={{ fontFamily: 'var(--font-sans)' }}
                data-cursor="hover"
              >
                <span className="relative z-10">See my work ↓</span>
                <div className="absolute inset-0 bg-amber-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              </button>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <button
                onClick={() => scrollTo('#about')}
                className="px-8 py-4 border border-cream/15 rounded-full text-cream/50 hover:text-cream hover:border-cream/40 text-sm transition-all duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
                data-cursor="hover"
              >
                About me
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-cream/25">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/20 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-cream/60"
            animate={{ height: ['0%', '100%'], top: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '40%' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
