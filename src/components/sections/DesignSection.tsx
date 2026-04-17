  import { useRef, useState } from 'react'
  import { motion, useScroll, useTransform } from 'framer-motion'
  import type { DesignPost } from '@/lib/design.ts'
  import { WipeText, ScrollReveal } from '../ui/AnimatedText'
  import MagneticButton from '../ui/MagneticButton'

  function DesignCard({ design, index }: { design: DesignPost; index: number }) {
    const [hovered, setHovered] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
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
          onMouseLeave={() => {
            setHovered(false)
            setMousePos({ x: 0.5, y: 0.5 })
          }}
          animate={{
            rotateX: hovered ? (mousePos.y - 0.5) * -8 : 0,
            rotateY: hovered ? (mousePos.x - 0.5) * 8 : 0,
            scale: hovered ? 1.02 : 1,
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 22 }}
          className="relative rounded-2xl overflow-hidden group h-full"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: hovered
              ? `0 40px 100px rgba(0,0,0,0.7)`
              : '0 8px 30px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.5s ease',
            minHeight: isLarge ? '460px' : '380px', /* === SPACING FIX === */
          }}
        >
          {/* Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${design.coverGradient}`}
          />

          {/* Hover shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: hovered
                ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.08), transparent 60%)`
                : 'transparent',
            }}
            transition={{ duration: 0.1 }}
          />

          {/* ================= CONTENT ================= */}
<div className="relative z-10 h-full flex flex-col px-8 md:px-10 py-8"> 
  {/* ✅ px-8 = jarak kiri kanan dari pinggir card */}
  {/* ✅ py-8 = jarak atas bawah aman */}

  {/* ===== TOP ===== */}
  <div className="flex items-start justify-between mb-6">
    <motion.span
      className="text-4xl md:text-5xl"
      animate={{
        scale: hovered ? 1.1 : 1,
        rotate: hovered ? 10 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
    </motion.span>

    <span
      className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
      style={{
        borderColor:
          design.type === 'behance'
            ? 'rgba(59,130,246,0.4)'
            : 'rgba(168,85,247,0.4)',
        color:
          design.type === 'behance'
            ? '#93c5fd'
            : '#d8b4fe',
        background:
          design.type === 'behance'
            ? 'rgba(59,130,246,0.08)'
            : 'rgba(168,85,247,0.08)',
      }}
    >
      {design.type === 'behance' ? 'Behance' : 'Unpublished'}
    </span>
  </div>

  {/* ===== CENTER DECOR ===== */}
  <div className="flex-1 flex items-center justify-center">
    <motion.div
      className="relative w-36 h-36 md:w-44 md:h-44"
      animate={{ rotate: hovered ? 180 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background: design.accentColor,
          filter: 'blur(28px)',
        }}
        animate={{ scale: hovered ? 1.3 : 1 }}
      />
      <motion.div
        className="absolute inset-6 rounded-2xl border border-white/20"
        animate={{ rotate: hovered ? -30 : 0 }}
      />
      <motion.div
        className="absolute inset-12 rounded-full border border-white/30"
        animate={{ scale: hovered ? 1.15 : 1 }}
      />
    </motion.div>
  </div>

  {/* ===== BOTTOM ===== */}
  <div className="mt-6">
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-3">
      {design.tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 text-[10px] rounded-full bg-white/10 text-white/60"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Title + Description + Button */}
    <div className="flex items-end justify-between gap-6">

      <div className="space-y-2 max-w-[75%]">
        <h3 className="font-semibold text-white text-lg leading-snug">
          {design.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed">
          {design.description}
        </p>
      </div>

      <motion.div
        animate={{
          x: hovered ? 5 : 0,
          y: hovered ? -5 : 0,
          opacity: hovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0"
      >
        {design.type === 'behance' ? (
          <a
            href={design.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white text-base hover:bg-white/10 transition-colors"
          >
            ↗
          </a>
        ) : (
          <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white text-base">
            ✦
          </div>
        )}
      </motion.div>

    </div>

  </div>
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

    const headerY = useTransform(scrollYProgress, [0, 0.5], [60, 0])
    const headerX = useTransform(scrollYProgress, [0, 0.5], [40, 0])
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

    return (
      <section
        ref={sectionRef}
        id="design"
        className="relative py-44 md:py-60"
        style={{
          background:
            'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
        }}
      >
        <div className="px-6 md:px-16 lg:px-24 relative z-10">

          {/* HEADER */}
          <div className="flex items-end justify-between mb-32 gap-20 flex-wrap">
            <motion.div style={{ y: headerY, x: headerX, opacity }}>
              <span className="text-xs tracking-[0.4em] uppercase text-cream/40 block mb-6">
                Creative Work
              </span>

              <h2
                className="font-bold leading-[0.9]"
                style={{ fontSize: 'clamp(64px, 9vw, 140px)' }}
              >
                <WipeText text="Design" delay={0} />
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

            <ScrollReveal delay={0.4} direction="diagonal">
              <div className="max-w-md md:mt-12">
                <p className="text-cream/40 text-base leading-relaxed">
                  UI/UX design, brand identities, social campaigns — a mix of
                  published Behance work and personal experiments yet to see the
                  light.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {designs.map((design, i) => (
              <DesignCard key={design.id} design={design} index={i} />
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="flex justify-center mt-32">
              <MagneticButton strength={0.3}>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-12 py-5 bg-blue-600/15 border border-blue-500/30 rounded-full text-blue-300/80 hover:text-blue-200 hover:border-blue-400/50 text-base transition-all duration-300 hover:bg-blue-600/20"
                >
                  <span className="text-lg">🎨</span>
                  View Behance Profile
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

        </div>
      </section>
    )
  }