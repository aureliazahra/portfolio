import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Design', href: '#design' },
  { label: 'About', href: '#about' },
]
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 60))
  }, [scrollY])
  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[500] px-6 md:px-12 py-5"
      >
        <div
          className="flex items-center justify-between transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderRadius: scrolled ? '100px' : '0',
            padding: scrolled ? '12px 24px' : '0',
            border: scrolled ? '1px solid rgba(240,236,228,0.06)' : 'none',
          }}
        >
          {/* Logo */}
          <MagneticButton strength={0.25}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium tracking-widest uppercase text-cream/80 hover:text-cream transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.1rem' }}>A</span>
              urelia
            </button>
          </MagneticButton>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.2}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative text-sm text-cream/60 hover:text-cream transition-colors group"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cream/40 group-hover:w-full transition-all duration-300" />
                </button>
              </MagneticButton>
            ))}
            <MagneticButton strength={0.3}>
              <button
                onClick={() => scrollTo('#about')}
                className="px-5 py-2 border border-cream/20 rounded-full text-cream/70 hover:border-cream/50 hover:text-cream text-sm transition-all duration-300 hover:bg-cream/5"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Contact
              </button>
            </MagneticButton>
          </nav>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            data-cursor="hover"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-cream/80"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? -10 : 0 }}
              className="block w-4 h-px bg-cream/80"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-cream/80"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[400] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollTo(link.href)}
                className="text-5xl font-bold text-cream/80 hover:text-cream transition-colors"
                style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}