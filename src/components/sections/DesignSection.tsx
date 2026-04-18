import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { DesignPost } from '@/lib/design.ts'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
function DesignCard({ design, index }: { design: DesignPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.1,
      }}
      className="relative"
    >
      <div
        className="relative overflow-hidden cursor-pointer group"
        style={{
          background: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.07)',
          aspectRatio: '4/3',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Wipe overlay ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={false}
          animate={{
            clipPath: hovered
              ? 'inset(0% 0% 0% 0%)'
              : 'inset(0% 100% 0% 0%)',
          }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: `linear-gradient(135deg, ${design.accentColor.replace('0.6', '0.12')}, ${design.accentColor.replace('0.6', '0.06')})`,
          }}
        />
        {/* ── Gradient bg atmosphere ── */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${design.coverGradient} opacity-80`}
        />
        {/* ── Subtle grid lines ── */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* ── Center abstract visual ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{
              scale: hovered ? 1.06 : 1,
              opacity: hovered ? 0.55 : 0.3,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Outer ring */}
            <div
              className="rounded-full border"
              style={{
                width: '120px',
                height: '120px',
                borderColor: design.accentColor.replace('0.6', '0.4'),
              }}
            />
            {/* Inner square rotated */}
            <motion.div
              className="absolute border"
              animate={{ rotate: hovered ? 45 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                width: '70px',
                height: '70px',
                top: '50%',
                left: '50%',
                marginTop: '-35px',
                marginLeft: '-35px',
                borderColor: design.accentColor.replace('0.6', '0.5'),
              }}
            />
            {/* Center dot */}
            <div
              className="absolute rounded-full"
              style={{
                width: '8px',
                height: '8px',
                top: '50%',
                left: '50%',
                marginTop: '-4px',
                marginLeft: '-4px',
                background: design.accentColor,
              }}
            />
          </motion.div>
        </div>
        {/* ── Type badge – top left ── */}
        <div className="absolute top-0 left-0 z-20 p-4">
          <span
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            {design.type === 'behance' ? 'Behance' : 'Unpublished'}
          </span>
        </div>
        {/* ── Tags – top right ── */}
        <div className="absolute top-0 right-0 z-20 p-4 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
          {design.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* ── Bottom content ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex items-end justify-between">
          {/* Title + description (slide up on hover) */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p
                className="text-[11px] tracking-[0.25em] uppercase mb-1.5"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {design.category}
              </p>
              <h3
                className="font-medium leading-tight text-white"
                style={{ fontSize: '17px', fontFamily: 'var(--font-sans)' }}
              >
                {design.title}
              </h3>
            </motion.div>
            {/* Description slides up only on hover */}
            <motion.p
              initial={false}
              animate={{
                height: hovered ? 'auto' : 0,
                opacity: hovered ? 1 : 0,
                marginTop: hovered ? '6px' : 0,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden text-[12px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '220px' }}
            >
              {design.description}
            </motion.p>
          </div>
          {/* Year + arrow – bottom right */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-4">
            {/* Corner bracket decoration */}
            <div
              className="relative"
              style={{ width: '20px', height: '20px' }}
            >
              <div
                className="absolute bottom-0 right-0 border-b border-r"
                style={{
                  width: '14px',
                  height: '14px',
                  borderColor: 'rgba(255,255,255,0.25)',
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-[12px] tracking-[0.2em]"
                style={{ color: 'rgba(255,255,255,0.35)', fontVariantNumeric: 'tabular-nums' }}
              >
                {design.year}
              </span>
              {/* Arrow button */}
              {design.type === 'behance' ? (
                <a
                  href={design.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    animate={{
                      x: hovered ? 2 : 0,
                      y: hovered ? -2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center"
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '13px',
                    }}
                  >
                    ↗
                  </motion.div>
                </a>
              ) : (
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '28px',
                    height: '28px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '11px',
                  }}
                >
                  ✦
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ── Wipe line indicator (left edge) ── */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 z-30 pointer-events-none"
          animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '2px',
            background: design.accentColor,
            transformOrigin: 'top',
          }}
        />
      </div>
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
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0])
  return (
    <motion.section
      ref={sectionRef}
      id="design"
      className="relative py-24 md:py-32"
      style={{
        background:
          'linear-gradient(180deg, #080808 0%, #0d0d0d 50%, #080808 100%)',
        opacity,
      }}
    >
      <div className="px-6 md:px-16 lg:px-24 relative z-10">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-20 gap-20 flex-wrap">
          <motion.div style={{ y: headerY, x: headerX }}>
            <span
              className="text-xs tracking-[0.4em] uppercase block mb-6"
              style={{ color: 'rgba(240,236,228,0.4)' }}
            >
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
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(240,236,228,0.4)' }}
              >
                UI/UX design, brand identities, social campaigns — a mix of
                published Behance work and personal experiments yet to see the
                light.
              </p>
            </div>
          </ScrollReveal>
        </div>
        {/* GRID — 3 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]">
          {designs.map((design, i) => (
            <div key={design.id} className="bg-[#080808]">
              <DesignCard design={design} index={i} />
            </div>
          ))}
        </div>
        {/* Horizontal separator */}
        <div
          className="mt-0 mb-0"
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        {/* CTA */}
        <ScrollReveal delay={0.2} direction="up">
          <div className="flex justify-center mt-20">
            <MagneticButton strength={0.3}>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-12 py-5 border text-base transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(240,236,228,0.6)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = 'rgba(240,236,228,1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'rgba(240,236,228,0.6)'
                  e.currentTarget.style.background = 'transparent'
                }}
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
    </motion.section>
  )
}
