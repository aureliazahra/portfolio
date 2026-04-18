import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from 'framer-motion'
import type { Project } from '../../lib/projects'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
/* ─────────────────────────────────────────────
   Project Card
───────────────────────────────────────────── */
function ProjectCard({
  project,
}: {
  project: Project
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setMousePos({ x: 0, y: 0 })
      }}
      animate={{
        rotateX: hovered ? mousePos.y * -10 : 0,
        rotateY: hovered ? mousePos.x * 10 : 0,
        scale: hovered ? 1.02 : 1,
        z: hovered ? 30 : 0,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="relative border rounded-2xl overflow-hidden cursor-default group w-full"
      style={{
        borderColor: 'rgba(240,236,228,0.08)',
        background: 'rgba(255,255,255,0.025)',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${project.accentColor}20`
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Gradient preview */}
      <div
        className={`relative h-64 md:h-80 bg-linear-to-br ${project.previewColor} overflow-hidden`}
      >
        {/* Mock phone frames */}
        <div className="absolute inset-0 flex items-center justify-center gap-8">
          <motion.div
            className="w-28 h-52 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col overflow-hidden"
            animate={{
              y: hovered ? -10 : 0,
              rotate: hovered ? -3 : -6,
              x: hovered ? -6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-7 bg-black/50 flex items-center justify-center">
              <div className="w-12 h-1 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 p-3 space-y-2">
              <div className="h-2 rounded bg-white/15 w-full" />
              <div className="h-2 rounded bg-white/10 w-3/4" />
              <div className="h-10 rounded bg-white/[0.08] mt-2" />
              <div className="h-2 rounded bg-white/10 w-full" />
              <div className="h-2 rounded bg-white/[0.08] w-2/3" />
            </div>
            <div className="h-9 border-t border-white/10 flex items-center justify-around px-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-white/15" />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="w-28 h-52 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm flex flex-col overflow-hidden"
            animate={{
              y: hovered ? -18 : 0,
              rotate: hovered ? 3 : 6,
              x: hovered ? 6 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="h-7 bg-black/50 flex items-center justify-center">
              <div className="w-12 h-1 rounded-full bg-white/20" />
            </div>
            <div className="flex-1 p-3">
              <div className="h-20 rounded-lg bg-white/[0.08] mb-3" />
              <div className="space-y-1.5">
                <div className="h-2 rounded bg-white/15 w-full" />
                <div className="h-2 rounded bg-white/10 w-4/5" />
              </div>
            </div>
            <div className="h-9 border-t border-white/10 flex items-center justify-around px-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-white/15" />
              ))}
            </div>
          </motion.div>
        </div>
        {/* Emoji */}
        <motion.div
          className="absolute top-5 left-5 text-4xl"
          animate={{ scale: hovered ? 1.3 : 1, rotate: hovered ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {project.emoji}
        </motion.div>
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-80" />
        {/* Status badge */}
        <div className="absolute top-5 right-5">
          <span
            className="px-3 py-1 text-[10px] tracking-widest uppercase rounded-full border"
            style={{
              borderColor:
                project.status === 'completed'
                  ? 'rgba(52,211,153,0.4)'
                  : 'rgba(251,191,36,0.4)',
              color: project.status === 'completed' ? '#34d399' : '#fbbf24',
              background:
                project.status === 'completed'
                  ? 'rgba(52,211,153,0.05)'
                  : 'rgba(251,191,36,0.05)',
            }}
          >
            {project.status}
          </span>
        </div>
        {/* Hover overlay — GitHub link */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  e.stopPropagation()
                }
                className="px-7 py-3.5 bg-[#f0ece4] text-[#080808] text-sm font-semibold rounded-full hover:bg-amber-300 transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ↗ GitHub
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 3D shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: hovered
              ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
              : 'none',
          }}
        />
      </div>
      {/* Card info */}
      <div className="p-7">
        <div className="flex items-start justify-between mb-4">
          <h3
            className="font-semibold text-2xl group-hover:text-amber-200 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-sans)', color: '#f0ece4' }}
          >
            {project.title}
          </h3>
          <span
            className="text-xs mt-1.5 font-mono shrink-0 ml-4"
            style={{ color: 'rgba(240,236,228,0.3)', fontFamily: 'var(--font-mono)' }}
          >
            {project.year}
          </span>
        </div>
        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)', color: 'rgba(240,236,228,0.45)' }}
        >
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] rounded-full"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '1px solid rgba(240,236,228,0.1)',
                color: 'rgba(240,236,228,0.4)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* Accent bottom border on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        animate={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.accentColor}70, transparent)`
            : 'transparent',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}
/* ─────────────────────────────────────────────
   Diagonal Scroll Container
   FIXES APPLIED:
   1. Cards overlap visibly — when card[i] is centered, card[i-1]
      is partially visible (exiting top-left) and card[i+1] is
      partially visible (entering bottom-right). Achieved by
      shrinking the "dead zone" buffer from 0.85 → 0.55 of a slice,
      and reducing travel distances (40vw / 35vh instead of 90/70).
   2. Staggered z-index so the active card always sits on top.
───────────────────────────────────────────── */
function DiagonalScrollCards({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // Spring-smooth the raw scroll value
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.0001,
  })
  const total = projects.length
  return (
    /*
      Outer wrapper: tall enough for scroll room.
      Each card owns 1/total of the total scroll height.
    */
    <div
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Perspective wrapper */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {projects.map((project, i) => {
            /*
              ── Keyframe timeline for card[i] ──
              The full scroll [0..1] is divided into `total` equal slices.
              Card[i]'s "center moment" is at progress = (i + 0.5) / total.
              We want neighbouring cards to be half-visible when the
              current card is centred, so the travel distance is small
              and the overlap buffer is tight (0.55 of a slice).
              Stops:
                enter0  → card starts sliding in  (bottom-right)
                enter1  → card fully centred
                exit0   → card starts sliding out  (top-left)
                exit1   → card fully off-screen
              The gap between enter1 and exit0 is 0 — the card is
              centred for exactly one "tick" — but thanks to the
              spring this feels like a smooth pause.
            */
            const sliceCenter = (i + 0.5) / total
            const halfBuffer = 0.55 / total   // half the overlap window
            const enter0 = Math.max(0, sliceCenter - halfBuffer * 1.6)  // begin entering
            const enter1 = sliceCenter                                    // fully centred
            const exit0  = sliceCenter                                    // begin exiting (same moment)
            const exit1  = Math.min(1, sliceCenter + halfBuffer * 1.6)  // fully off-screen
            /*
              Travel distances kept modest so neighbours are
              partially visible when the active card is centred.
              ~40vw / 35vh means a neighbouring card sits ~40% off
              to the side — visible but clearly "behind".
            */
            const x = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              ['48vw', '0vw', '0vw', '-48vw']
            )
            const y = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              ['38vh', '0vh', '0vh', '-38vh']
            )
            const opacity = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              [0, 1, 1, 0]
            )
            const scale = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              [0.82, 1, 1, 0.82]
            )
            /*
              Rotation:
                Entry (bottom-right): clockwise +7°
                Active: 0°
                Exit (top-left): counter-clockwise −7°
            */
            const rotate = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              [7, 0, 0, -7]
            )
            // Active card sits on top
            const zIndex = useTransform(
              scrollYProgress,
              [enter0, enter1, exit0, exit1],
              [i, i + total, i + total, i]
            )
            return (
              <motion.div
                key={project.id}
                style={{
                  x,
                  y,
                  opacity,
                  scale,
                  rotate,
                  zIndex,
                  position: 'absolute',
                  width: 'min(560px, 90vw)',
                  transformOrigin: 'center center',
                  willChange: 'transform, opacity',
                }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            )
          })}
        </div>
        {/* Dot progress indicator */}
        <ProgressDots count={total} scrollYProgress={scrollYProgress} />
        {/* Card counter */}
        <CardCounter projects={projects} scrollYProgress={scrollYProgress} />
      </div>
    </div>
  )
}
/* ─── Dot progress indicator ─── */
function ProgressDots({
  count,
  scrollYProgress,
}: {
  count: number
  scrollYProgress: ReturnType<typeof useSpring>
}) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', (v: number) => {
      const idx = Math.min(Math.round(v * count), count - 1)
      setActive(idx)
    })
  }, [count, scrollYProgress])
  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: active === i ? 28 : 6,
            background:
              active === i ? '#c9a96e' : 'rgba(240,236,228,0.2)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ height: 6, borderRadius: 999 }}
        />
      ))}
    </div>
  )
}
/* ─── Card counter ─── */
function CardCounter({
  projects,
  scrollYProgress,
}: {
  projects: Project[]
  scrollYProgress: ReturnType<typeof useSpring>
}) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    return scrollYProgress.on('change', (v: number) => {
      const idx = Math.min(Math.round(v * projects.length), projects.length - 1)
      setActive(idx)
    })
  }, [projects.length, scrollYProgress])
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={active}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold tabular-nums"
          style={{ color: '#c9a96e', fontSize: 14, minWidth: 22, textAlign: 'right' }}
        >
          {String(active + 1).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <div style={{ width: 44, height: 1, background: 'rgba(240,236,228,0.12)' }} />
      <span style={{ color: 'rgba(240,236,228,0.25)', fontSize: 14 }}>
        {String(projects.length).padStart(2, '0')}
      </span>
    </div>
  )
}
/* ─────────────────────────────────────────────
   Infinity Marquee
   Cara kerja:
   - Satu wrapper flex berisi DUA set item identik (copy A + copy B)
   - Wrapper dianimasikan dari x: "0%" → x: "-50%" secara infinite loop
   - Karena copy A dan B identik dan masing-masing 50% total lebar,
     saat wrapper sudah bergerak -50% (= tepat satu set) → snap balik
     ke 0% terasa mulus tanpa glitch.
   - `ease: "linear"` memastikan kecepatan konstan tanpa accelerasi.
   - `repeat: Infinity` + `repeatType: "loop"` untuk true infinite loop.
───────────────────────────────────────────── */
const MARQUEE_ITEMS = ['Flutter', 'Dart', 'Firebase', 'Figma', 'UI/UX', 'Mobile', 'Design', 'Code']
function InfinityMarquee() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{
        borderTop: '1px solid rgba(240,236,228,0.05)',
        borderBottom: '1px solid rgba(240,236,228,0.05)',
      }}
    >
      {/*
        Outer: overflow-hidden → sembunyikan konten di luar batas
        Inner motion.div: flex row, lebar = 2x konten (dua set),
        animasi geser kiri -50% → loop seamless
      */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 18,        // kecepatan: semakin kecil = semakin cepat
          ease: 'linear',      // kecepatan konstan, tidak ada ease in/out
          repeat: Infinity,    // ulangi selamanya
          repeatType: 'loop',  // langsung loop dari awal (bukan reverse)
        }}
        style={{ willChange: 'transform' }}
      >
        {/* Copy A */}
        <div className="flex items-center shrink-0">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={`a-${item}`}
              className="mx-6 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'rgba(240,236,228,0.15)',
              }}
            >
              {item} ✦
            </span>
          ))}
        </div>
        {/* Copy B — identik, membuat seamless loop */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={`b-${item}`}
              className="mx-6 text-xs tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'rgba(240,236,228,0.15)',
              }}
            >
              {item} ✦
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
/* ─────────────────────────────────────────────
   Main Section Export
───────────────────────────────────────────── */
export default function WorkSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerX = useTransform(scrollYProgress, [0, 0.5], ['-5%', '0%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  return (
    <section ref={sectionRef} id="work" className="relative">
      {/* ── Header ── */}
      <div className="px-6 md:px-14 lg:px-20 pt-32 md:pt-48 pb-20">
        <div className="flex items-center justify-between mb-20 overflow-hidden">
          <motion.div style={{ x: headerX, opacity: headerOpacity }}>
            <span
              className="text-[11px] tracking-[0.3em] uppercase block mb-4"
              style={{ fontFamily: 'var(--font-sans)', color: 'rgba(240,236,228,0.3)' }}
            >
              Selected Work
            </span>
            <h2
              className="font-bold leading-none"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(52px, 8vw, 120px)',
                color: '#f0ece4',
              }}
            >
              <WipeText text="Flutter" delay={0} />
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
                <WipeText text="Projects" delay={0.15} />
              </span>
            </h2>
          </motion.div>
          <ScrollReveal delay={0.3} direction="left">
            <div className="hidden md:block text-right">
              <div
                className="font-bold"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(60px, 8vw, 120px)',
                  lineHeight: 1,
                  color: 'rgba(240,236,228,0.06)',
                }}
              >
                0{projects.length}
              </div>
              <p
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: 'rgba(240,236,228,0.3)' }}
              >
                Projects
              </p>
            </div>
          </ScrollReveal>
        </div>
        {/* ── Infinity Marquee ── */}
        <InfinityMarquee />
      </div>
      {/* ── Diagonal Scroll Cards ── */}
      <DiagonalScrollCards projects={projects} />
      {/* ── CTA ── */}
      <div className="px-6 md:px-14 lg:px-20 pb-32 md:pb-48 pt-20">
        <ScrollReveal delay={0.2} direction="up">
          <div className="flex justify-center">
            <MagneticButton strength={0.35}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-sans)',
                  border: '1px solid rgba(240,236,228,0.15)',
                  color: 'rgba(240,236,228,0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f0ece4'
                  e.currentTarget.style.borderColor = 'rgba(240,236,228,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(240,236,228,0.5)'
                  e.currentTarget.style.borderColor = 'rgba(240,236,228,0.15)'
                }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View all on GitHub
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
