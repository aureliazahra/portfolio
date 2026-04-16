import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import type { DesignPost } from '@/lib/design.ts'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
function DesignCard({ design, index }: { design: DesignPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const cardRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }
  const isLarge = index === 0 || index === 3
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.12,
      }}
      className={isLarge ? 'md:col-span-2' : ''}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }) }}
        animate={{
          rotateX: hovered ? (mousePos.y - 0.5) * -8 : 0,
          rotateY: hovered ? (mousePos.x - 0.5) * 8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        data-cursor="view"
        data-cursor-label="OPEN"
        className="relative rounded-2xl overflow-hidden group h-full"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: hovered ? `0 40px 100px rgba(0,0,0,0.7)` : '0 8px 30px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.5s ease',
          minHeight: isLarge ? '340px' : '280px',
        }}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${design.coverGradient}`}
          style={{ zIndex: 0 }}
        />
        {/* Animated gradient shine on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{
            background: hovered
              ? `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
              : 'transparent',
          }}
          transition={{ duration: 0.1 }}
        />
        {/* Content */}
        <div className="relative z-20 p-6 h-full flex flex-col justify-between" style={{ minHeight: 'inherit' }}>
          {/* Top row */}
          <div className="flex items-start justify-between">
            <motion.span
              className="text-4xl"
              animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 15 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {design.emoji}
            </motion.span>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full border"
                style={{
                  borderColor: design.type === 'behance' ? 'rgba(59,130,246,0.4)' : 'rgba(168,85,247,0.4)',
                  color: design.type === 'behance' ? '#93c5fd' : '#d8b4fe',
                  background: design.type === 'behance' ? 'rgba(59,130,246,0.08)' : 'rgba(168,85,247,0.08)',
                }}
              >
                {design.type === 'behance' ? 'Behance' : 'Unpublished'}
              </span>
            </div>
          </div>
          {/* Decorative element — floating shapes */}
          <div className="flex-1 flex items-center justify-center py-4">
            <motion.div
              className="relative w-32 h-32"
              animate={{ rotate: hovered ? 180 : 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              {/* Abstract shape */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-20"
                style={{ background: design.accentColor, filter: 'blur(20px)' }}
                animate={{ scale: hovered ? 1.5 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-4 rounded-2xl border border-white/20"
                animate={{ rotate: hovered ? -45 : 0 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-white/30"
                animate={{ scale: hovered ? 1.3 : 1 }}
                transition={{ duration: 0.5 }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
                style={{ fontFamily: 'var(--font-serif)', color: 'white', opacity: 0.4 }}
              >
                {design.emoji}
              </div>
            </motion.div>
          </div>
          {/* Bottom info */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {design.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-white/8 text-white/50"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3
                  className="font-semibold text-white text-base md:text-lg leading-tight mb-1"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {design.title}
                </h3>
                <p
                  className="text-white/40 text-xs leading-relaxed line-clamp-2"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {design.description}
                </p>
              </div>
              {/* Arrow */}
              <motion.div
                animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0, opacity: hovered ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="ml-4 flex-shrink-0"
              >
                {design.type === 'behance' ? (
                  <a
                    href={design.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white text-sm hover:bg-white/10 transition-colors"
                    data-cursor="hover"
                  >
                    ↗
                  </a>
                ) : (
                  <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white text-sm">
                    ✦
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        {/* Bottom tools strip */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center gap-3"
              >
                <span className="text-[10px] text-white/40 uppercase tracking-widest mr-2">Tools</span>
                {design.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] text-white/60 px-2 py-0.5 bg-white/8 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
                <span className="ml-auto text-[10px] text-white/30">{design.year}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
export default function DesignSection({ designs }: { designs: DesignPost[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Diagonal parallax for the section header
  const headerY = useTransform(scrollYProgress, [0, 0.5], [60, 0])
  const headerX = useTransform(scrollYProgress, [0, 0.5], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  return (
    <section
      ref={sectionRef}
      id="design"
      className="relative py-32 md:py-48"
      style={{
        background: 'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
      }}
    >
      {/* Diagonal top slash */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: '#080808',
          clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)',
        }}
      />
      <div className="px-6 md:px-14 lg:px-20 relative z-10">
        {/* Section header — diagonal layout */}
        <div className="flex items-end justify-between mb-20 gap-8 flex-wrap">
          <motion.div style={{ y: headerY, x: headerX, opacity }}>
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-cream/30 block mb-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Creative Work
            </span>
            <h2
              className="font-bold leading-none"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(52px, 8vw, 120px)' }}
            >
              <WipeText text="Design" className="text-cream" delay={0} />
              <br />
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  WebkitTextStroke: '1px rgba(240,236,228,0.2)',
                  color: 'transparent',
                  display: 'block',
                }}
              >
                <WipeText text="Gallery" delay={0.12} />
              </span>
            </h2>
          </motion.div>
          {/* Description — offset to right, lower */}
          <ScrollReveal delay={0.4} direction="diagonal">
            <div className="max-w-xs mb-2">
              <p
                className="text-cream/35 text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                UI/UX design, brand identities, social campaigns — a mix of published Behance work and
                personal experiments yet to see the light.
              </p>
            </div>
          </ScrollReveal>
        </div>
        {/* Mosaic grid — alternating sizes for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {designs.map((design, i) => (
            <DesignCard key={design.id} design={design} index={i} />
          ))}
        </div>
        {/* Behance CTA */}
        <ScrollReveal delay={0.2} direction="up">
          <div className="flex justify-center mt-20 gap-4 flex-wrap">
            <MagneticButton strength={0.35}>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 bg-blue-600/15 border border-blue-500/30 rounded-full text-blue-300/70 hover:text-blue-200 hover:border-blue-400/50 text-sm transition-all duration-300 hover:bg-blue-600/20"
                style={{ fontFamily: 'var(--font-sans)' }}
                data-cursor="hover"
              >
                <span>🎨</span>
                View Behance Profile
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
