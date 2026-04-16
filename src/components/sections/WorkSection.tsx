import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import type { Project } from '../../lib/projects'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'
import MagneticButton from '../ui/MagneticButton'
import type { MouseEvent } from 'react'

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
        animate={{
          rotateX: hovered ? mousePos.y * -12 : 0,
          rotateY: hovered ? mousePos.x * 12 : 0,
          scale: hovered ? 1.02 : 1,
          z: hovered ? 30 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        data-cursor="view"
        data-cursor-label="VIEW"
        className="relative border border-cream/8 rounded-2xl overflow-hidden cursor-none group"
        style={{
          background: 'rgba(255,255,255,0.02)',
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${project.accentColor}18`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Gradient preview */}
        <div className={`relative h-52 md:h-64 bg-gradient-to-br ${project.previewColor} overflow-hidden`}>
          {/* Mock phone frames */}
          <div className="absolute inset-0 flex items-center justify-center gap-6">
            <motion.div
              className="w-24 h-44 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col overflow-hidden"
              animate={{
                y: hovered ? -8 : 0,
                rotate: hovered ? -3 : -6,
                x: hovered ? -5 : 0,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="h-6 bg-black/50 flex items-center justify-center">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 p-2 space-y-1.5">
                <div className="h-2 rounded bg-white/15 w-full" />
                <div className="h-2 rounded bg-white/10 w-3/4" />
                <div className="h-8 rounded bg-white/8 mt-2" />
                <div className="h-2 rounded bg-white/10 w-full" />
                <div className="h-2 rounded bg-white/8 w-2/3" />
              </div>
              <div className="h-8 border-t border-white/10 flex items-center justify-around px-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-white/15" />
                ))}
              </div>
            </motion.div>
            <motion.div
              className="w-24 h-44 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm flex flex-col overflow-hidden"
              animate={{
                y: hovered ? -14 : 0,
                rotate: hovered ? 3 : 6,
                x: hovered ? 5 : 0,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="h-6 bg-black/50 flex items-center justify-center">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
              <div className="flex-1 p-2">
                <div className="h-16 rounded-lg bg-white/8 mb-2" />
                <div className="space-y-1">
                  <div className="h-2 rounded bg-white/15 w-full" />
                  <div className="h-2 rounded bg-white/10 w-4/5" />
                </div>
              </div>
              <div className="h-8 border-t border-white/10 flex items-center justify-around px-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-white/15" />
                ))}
              </div>
            </motion.div>
          </div>
          {/* Emoji large */}
          <motion.div
            className="absolute top-4 left-4 text-3xl"
            animate={{
              scale: hovered ? 1.3 : 1,
              rotate: hovered ? 10 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {project.emoji}
          </motion.div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span
              className="px-2 py-1 text-[10px] tracking-widest uppercase rounded-full border"
              style={{
                borderColor: project.status === 'completed' ? 'rgba(52,211,153,0.4)' : 'rgba(251,191,36,0.4)',
                color: project.status === 'completed' ? '#34d399' : '#fbbf24',
                background: project.status === 'completed' ? 'rgba(52,211,153,0.05)' : 'rgba(251,191,36,0.05)',
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
              >
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                  className="px-6 py-3 bg-cream text-dark text-sm font-medium rounded-full hover:bg-amber-300 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                  data-cursor="hover"
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
                ? `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
                : 'none',
            }}
          />
        </div>
        {/* Card info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3
                className="font-semibold text-xl text-cream group-hover:text-amber-200 transition-colors duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.title}
              </h3>
            </div>
            <span
              className="text-xs text-cream/30 mt-1 font-mono"
            >
              {project.year}
            </span>
          </div>
          <p
            className="text-cream/40 text-sm mb-5 leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] border border-cream/8 rounded-full text-cream/40"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Accent border on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          animate={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${project.accentColor}60, transparent)`
              : 'transparent',
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}
export default function WorkSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const headerX = useTransform(scrollYProgress, [0, 0.5], ['-5%', '0%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 md:py-48 px-6 md:px-14 lg:px-20"
    >
      {/* Section label */}
      <div className="flex items-center justify-between mb-20 overflow-hidden">
        <motion.div style={{ x: headerX, opacity: headerOpacity }}>
          <span
            className="text-[11px] tracking-[0.3em] uppercase text-cream/30 block mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Selected Work
          </span>
          <h2
            className="font-bold leading-none text-cream"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(52px, 8vw, 120px)',
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
        {/* Count */}
        <ScrollReveal delay={0.3} direction="left">
          <div className="hidden md:block text-right">
            <div
              className="font-bold text-cream/8"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 1 }}
            >
              0{projects.length}
            </div>
            <p className="text-xs text-cream/30 tracking-widest uppercase mt-1">Projects</p>
          </div>
        </ScrollReveal>
      </div>
      {/* Marquee stripe */}
      <div className="mb-20 overflow-hidden border-y border-cream/5 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) =>
            ['Flutter', 'Dart', 'Firebase', 'Figma', 'UI/UX', 'Mobile', 'Design', 'Code'].map((item) => (
              <span
                key={`${i}-${item}`}
                className="mx-6 text-xs tracking-[0.2em] uppercase text-cream/15"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {item} ✦
              </span>
            ))
          )}
        </div>
      </div>
      {/* Featured grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
      {/* Rest grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rest.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + featured.length} />
        ))}
      </div>
      {/* All projects CTA */}
      <ScrollReveal delay={0.2} direction="up">
        <div className="flex justify-center mt-20">
          <MagneticButton strength={0.35}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-cream/15 rounded-full text-cream/50 hover:text-cream hover:border-cream/40 text-sm transition-all duration-300 hover:bg-cream/3"
              style={{ fontFamily: 'var(--font-sans)' }}
              data-cursor="hover"
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
    </section>
  )
}
