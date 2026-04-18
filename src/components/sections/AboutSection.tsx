import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'
const stats = [
  { value: '10+', label: 'Developing Projects', desc: 'Shipped to production' },
  { value: '100+', label: 'Design Projects', desc: 'Across all categories' },
  { value: '3', label: 'Years', desc: 'Of crafting experiences' },
  { value: '∞', label: 'Curiosity', desc: 'Never stops' },
]
const skills = [
  { category: 'Dev', items: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'REST APIs', 'NextJs', 'React', 'Vite', 'Python', 'Tailwindcss', 'Java', 'Sql database'] },
  { category: 'Design', items: ['Figma', 'Canva', 'Affinity by Canva', 'Adobe Lightroom', 'Snapseed', 'Ibis Paint X' ] },
  { category: 'Other', items: ['Git', 'GitHub', 'VS Code', 'NodeJs', 'Apache Netbeans', 'Postman', 'Capcut'] },
]
const contacts = [
  { label: 'Email', value: 'aurelaurelzr@gmail.com', href: 'https://mail.google.com/mail/u/0/#inbox?compose=NZVHFxmKGFdCzFFPgwWKjSxbgSxVHxdRQvSXkQJZdvZmzsTbhQxtbcCfJdGsXLvtNXTqtg', icon: '✉' },
  { label: 'Instagram', value: '@aureliaow_', href: 'https://www.instagram.com/aureliaow_/', icon: '📷' },
  { label: 'GitHub', value: '@aureliazahra', href: 'https://github.com/aureliazahra', icon: '⌥' },
  { label: 'Behance', value: 'behance.net/aureliazahraa', href: 'https://www.behance.net/aureliazahraa', icon: '◈' },
  { label: 'LinkedIn', value: 'Aurelia Zahra', href: 'https://www.linkedin.com/in/aurelia-zahra-0275a4346/', icon: '⊞' },
]
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-400/30 group-hover:border-amber-400/70 transition-colors duration-500" />
      <div
        className="font-bold text-white mb-1 group-hover:text-amber-300 transition-colors duration-300 leading-none"
        style={{ fontSize: 'clamp(36px, 4vw, 60px)', fontFamily: 'var(--font-sans)' }}
      >
        {stat.value} 
      </div>
      <div className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-1">
        {stat.label}
      </div>
      <div className="text-xs text-white/30">
        {stat.desc}
      </div>
    </motion.div>
  )
}
/* ─── Tag chip (pill style from the image) ─── */
function TagChip({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.04 }}
      className="
        inline-flex items-center
        px-4 py-1.5
        text-[11px] font-medium tracking-[0.15em] uppercase
        rounded-full
        border border-white/15
        bg-white/[0.03]
        text-white/65
        backdrop-blur-sm
        cursor-default
        transition-all duration-300
        hover:border-amber-400/50
        hover:bg-amber-400/[0.08]
        hover:text-white/90
        hover:shadow-[0_0_16px_rgba(201,169,110,0.12)]
      "
    >
      {label}
    </motion.span>
  )
}
/* ─── Info card (small card from the image) ─── */
function InfoCard({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="border border-white/10 p-5 relative group hover:border-white/20 transition-colors duration-400">
        <div className="absolute top-0 left-0 w-6 h-px bg-amber-400/50" />
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">{title}</div>
        {children}
      </div>
    </ScrollReveal>
  )
}
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bigTextY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const bgPanelY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden pt-24 md:pt-32"
    >
      {/* ── Huge background watermark ── */}
      <motion.div
        style={{ y: bigTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div
          className="text-white/[0.025] font-bold whitespace-nowrap"
          style={{ fontSize: 'clamp(120px, 20vw, 320px)' }}
        >
          ABOUT
        </div>
      </motion.div>
      <div className="px-6 md:px-16 lg:px-24 relative z-10">
        {/* ══════════════════════════════════════
            HEADER — editorial bold brutalist style
        ══════════════════════════════════════ */}
        <div className="mb-20 md:mb-32">
          {/* eyebrow row */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-amber-400/60" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-medium">
              The Person Behind
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            {/* small badge */}
            <span className="text-[10px] tracking-widest uppercase border border-white/10 px-3 py-1 text-white/30">
              ✦ Open to work
            </span>
          </div>
          {/* Hero headline */}
          <h2
            className="font-bold leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(56px, 9vw, 130px)' }}
          >
            <WipeText text="Making" className="text-white" />
            <br />
            <WipeText text="Things" className="text-white" delay={0.08} />
            <br />
            <span
              className="italic font-normal"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.22)',
                color: 'transparent',
              }}
            >
              <WipeText text="Beautiful" delay={0.16} />
            </span>
          </h2>
        </div>
        {/* ══════════════════════════════════════
            ASYMMETRIC GRID — image style: left sidebar + right dominant
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 mb-8">
          {/* ── LEFT SIDEBAR: small info cards stacked ── */}
          <div className="flex flex-col gap-4">
            {/* Profile mini card */}
            <InfoCard title="Profile" delay={0}>
              <p className="text-sm text-white/70 leading-relaxed">
                Flutter developer & visual designer based in{' '}
                <span className="text-amber-400/80 font-medium">Malang, Indonesia.</span>
              </p>
            </InfoCard>
            {/* Bio card */}
            <InfoCard title="About" delay={0.06}>
              <p className="text-xs text-white/55 leading-relaxed">
                Building apps at the intersection of beautiful design and
                thoughtful engineering. When not coding — designing brand identities,
                experimenting with motion, or pushing Figma way too far.
              </p>
            </InfoCard>
            {/* Timeline card — mimics the dot-list from the image */}
            <InfoCard title="Learning and Creating Timeline" delay={0.12}>
              <div className="space-y-4">
                {[
                  { year: '2026 →', role: 'UI/UX & Flutter Developer', place: 'Blending design and code into meaningful products' },
                  { year: '2025', role: 'Flutter Developer', place: 'Started from school demands, grew into real projects' },
                  { year: '2024', role: 'Graphic Designer', place: 'Turning curiosity into published visual works' },
                  { year: '2023', role: 'Graphic Designer', place: 'Self-taught, driven purely by curiosity' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-amber-400' : 'bg-white/25'}`} />
                      {i < 3 && <div className="w-px flex-1 bg-white/10 mt-1" style={{ height: 24 }} />}
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-400/70 tracking-widest uppercase">{item.year}</div>
                      <div className="text-xs text-white/70 font-medium">{item.role}</div>
                      <div className="text-[10px] text-white/35">{item.place}</div>
                    </div>
                  </div>
                ))}
              </div>
            </InfoCard>
            {/* CV Download button — new addition */}
            <ScrollReveal delay={0.18}>
              <a
                href="/cv.pdf"
                download
                className="
                  group flex items-center justify-between
                  w-full px-5 py-4
                  border border-white/15
                  bg-white/[0.02]
                  hover:bg-amber-400/[0.08]
                  hover:border-amber-400/40
                  transition-all duration-400
                  relative overflow-hidden
                "
              >
                {/* shimmer */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
                <div className="flex items-center gap-3">
                  {/* icon */}
                  <div className="w-8 h-8 border border-white/15 group-hover:border-amber-400/50 flex items-center justify-center transition-colors duration-300">
                    <svg className="w-3.5 h-3.5 text-white/50 group-hover:text-amber-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.25em] uppercase text-white/60 group-hover:text-white/90 font-medium transition-colors duration-300">
                      Download CV
                    </div>
                    <div className="text-[9px] tracking-widest text-white/25 uppercase">PDF · 2026</div>
                  </div>
                </div>
                <span className="text-white/30 group-hover:text-amber-400 transition-colors duration-300 text-xs tracking-widest">
                  ↓
                </span>
              </a>
            </ScrollReveal>
          </div>
          {/* ── RIGHT: dominant visual panel (image style right-side large block) ── */}
          <div className="relative">
            {/* Main visual card — the large right-side element from the image */}
            <motion.div
              style={{ y: bgPanelY }}
              className="relative w-full overflow-hidden border border-white/10"
              style={{ height: 'clamp(340px, 48vw, 600px)' } as React.CSSProperties}
            >
              <Image
  src="/previews/about.png"
  alt="About visual"
  fill
  priority
  className="object-cover opacity-70"
/>
        {/* Grid overlay — brutalist detail */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              {/* Large symbol — like the big "A" logo in the image */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-white/[0.06]"
                  style={{ fontSize: 'clamp(160px, 22vw, 380px)', lineHeight: 1 }}
                >
                  A
                </motion.div>
              </div>
              {/* Top-left label */}
              <div className="absolute top-5 left-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">
                  Available for work
                </span>
              </div>
              {/* Top-right corner mark */}
              <div className="absolute top-5 right-6 text-white/20 text-xs tracking-widest">
                ✦ 2025
              </div>
              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-white/[0.07] backdrop-blur-sm bg-black/20">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-1">
                      Flutter Developer & Designer
                    </div>
                    <div className="text-sm text-white/60">
                      Malang, Indonesia
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] tracking-widest text-white/25 uppercase">Est.</div>
                    <div className="text-2xl font-bold text-white/15">2021</div>
                  </div>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
              <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </motion.div>
          </div>
        </div>
        {/* ══════════════════════════════════════
            STATS ROW — horizontal strip like the image bottom bar
        ══════════════════════════════════════ */}
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/10 mb-20">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </ScrollReveal>
        {/* ══════════════════════════════════════
            SKILLS — pill tags (matching the image's tag chips row)
        ══════════════════════════════════════ */}
        <div className="mb-28">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-6 h-px bg-amber-400/50" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">
              Skills & Tools
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="space-y-10">
            {skills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Category label */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-medium w-24">
                    {group.category}
                  </span>
                  <div className="w-px h-3 bg-white/15" />
                  {/* Pill tags — matching image style */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((skill, si) => (
                      <TagChip
                        key={skill}
                        label={skill}
                        delay={gi * 0.1 + si * 0.035}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* ══════════════════════════════════════
            CONTACT — editorial list style
        ══════════════════════════════════════ */}
        <div className="border-t border-white/10 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
            {/* Left: headline + sub */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-px bg-amber-400/50" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/35">
                  Contact
                </span>
              </div>
              <h3
                className="font-bold text-white leading-[0.9] mb-8"
                style={{ fontSize: 'clamp(40px, 6vw, 84px)' }}
              >
                Let's work
                <br />
                <span className="italic font-normal" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>
                  together
                </span>{' '}
                <span className="text-amber-400">✦</span>
              </h3>
              <p className="text-white/45 text-sm max-w-xs leading-relaxed">
                Open to freelance projects, collaborations, and meaningful conversations.
                Drop me a line — I reply fast.
              </p>
              {/* CV download — also here in contact section */}
              <ScrollReveal delay={0.1}>
                <a
                  href="/public/cv.pdf"
                  download
                  className="
                    group inline-flex items-center gap-3
                    mt-10 px-6 py-3.5
                    border border-white/15
                    bg-white/[0.02]
                    hover:bg-amber-400/[0.08]
                    hover:border-amber-400/40
                    transition-all duration-400
                    relative overflow-hidden
                  "
                >
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
                  <svg className="w-3.5 h-3.5 text-white/40 group-hover:text-amber-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
                  </svg>
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 group-hover:text-white/90 font-medium transition-colors duration-300">
                    Download CV
                  </span>
                  <span className="text-white/25 group-hover:text-amber-400 transition-colors duration-300">↓</span>
                </a>
              </ScrollReveal>
            </div>
            {/* Right: contact links list */}
            <div>
              {contacts.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredContact(i)}
                  onMouseLeave={() => setHoveredContact(null)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-5 border-b border-white/[0.08] group transition-all duration-300 hover:border-white/25 relative"
                >
                  {/* Hover indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-amber-400 transition-all duration-300 ease-out" />
                  <div className="flex items-center gap-4 pl-3">
                    <span className="text-base text-white/25 group-hover:text-amber-400 transition-colors duration-300 font-mono">
                      {contact.icon}
                    </span>
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-medium group-hover:text-white/60 transition-colors duration-300">
                      {contact.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300">
                      {contact.value}
                    </span>
                    <span className="text-white/20 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        {/* ══════════════════════════════════════
            FOOTER LINE — small brutalist signature
        ══════════════════════════════════════ */}
        <div className="border-t border-white/[0.06] pt-8 pb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-[10px] tracking-[0.35em] uppercase text-white/20">
              Portfolio
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="text-[10px] tracking-[0.35em] uppercase text-white/20">
              © 2026
            </div>
          </div>
          <div className="text-[10px] tracking-widest uppercase text-white/15">
            Crafted with love ✦
          </div>
        </div>
      </div>
    </section>
  )
}
