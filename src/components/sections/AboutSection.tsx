import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { WipeText, ScrollReveal } from '../ui/AnimatedText'

const stats = [
  { value: '6+', label: 'Flutter Apps', desc: 'Shipped to production' },
  { value: '20+', label: 'Design Projects', desc: 'Across all categories' },
  { value: '3', label: 'Years', desc: 'Of crafting experiences' },
  { value: '∞', label: 'Curiosity', desc: 'Never stops' },
]

const skills = [
  { category: 'Mobile Dev', items: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'REST APIs', 'BLoC', 'Riverpod', 'GetX'] },
  { category: 'Design', items: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'After Effects', 'Procreate'] },
  { category: 'Other', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Notion', 'Framer'] },
]

const contacts = [
  { label: 'Email', value: 'hello@atelier.dev', href: 'mailto:hello@atelier.dev', icon: '✉' },
  { label: 'GitHub', value: '@username', href: 'https://github.com', icon: '⌥' },
  { label: 'Behance', value: 'behance.net/you', href: 'https://behance.net', icon: '◈' },
  { label: 'LinkedIn', value: 'Your Name', href: 'https://linkedin.com', icon: '⊞' },
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
      className="group p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500"
    >
      <div
        className="font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300"
        style={{ fontSize: 'clamp(44px, 5vw, 72px)' }}
      >
        {stat.value}
      </div>

      <div className="text-sm font-medium text-white/70 mb-1">
        {stat.label}
      </div>

      <div className="text-xs text-white/45">
        {stat.desc}
      </div>
    </motion.div>
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden pt-40 md:pt-56"
    >
      {/* Huge Background */}
      <motion.div
        style={{ y: bigTextY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div
          className="text-white/[0.03] font-bold whitespace-nowrap"
          style={{ fontSize: 'clamp(120px, 20vw, 320px)' }}
        >
          ABOUT
        </div>
      </motion.div>

      <div className="px-6 md:px-16 lg:px-24 relative z-10">

        {/* HEADER */}
        <div className="mb-32">
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 block mb-8">
            The Person Behind
          </span>

          <h2
            className="font-bold leading-[0.9]"
            style={{ fontSize: 'clamp(64px, 9vw, 130px)' }}
          >
            <WipeText text="Making" className="text-white" />
            <br />
            <WipeText text="Things" className="text-white" delay={0.1} />
            <br />
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                color: 'transparent',
              }}
            >
              <WipeText text="Beautiful" delay={0.2} />
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 mb-40">

          {/* LEFT */}
          <div>
            <p className="text-white/70 text-base leading-relaxed max-w-xl mb-14">
              I'm a Flutter developer and visual designer based in Malang, Indonesia.
              I believe the best digital products sit at the intersection of beautiful design
              and thoughtful engineering.
            </p>

            <p className="text-white/65 text-base leading-relaxed mb-16 max-w-xl">
              When I'm not building apps, I'm designing brand identities, experimenting with
              motion, or exploring what happens when you push Figma a little too far.
              Every project is a chance to make something that feels alive.
            </p>

            {/* SKILLS */}
<div className="mt-24 space-y-16">

  {skills.map((group, gi) => (
    <motion.div
      key={group.category}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: gi * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >

      {/* Category Label */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-10 h-px bg-white/30" />
        <span className="text-sm tracking-[0.35em] uppercase text-white/70 font-medium">
          {group.category}
        </span>
      </div>

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-4 max-w-2xl">

        {group.items.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: gi * 0.15 + si * 0.04,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -4,
              scale: 1.05,
            }}
            className="
              px-5 py-2
              text-[13px]
              rounded-full
              border border-white/20
              bg-white/[0.04]
              text-white/80
              backdrop-blur-sm
              transition-all duration-300
              hover:border-amber-400/60
              hover:bg-amber-400/10
              hover:text-white
              hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]
              cursor-default
            "
          >
            {skill}
          </motion.span>
        ))}

      </div>
    </motion.div>
  ))}

</div>
          </div>

          {/* RIGHT */}
          <div>

            {/* VISUAL CARD */}
            <div className="relative mb-12 h-72 rounded-3xl overflow-hidden border border-white/10 bg-linear-to-br from-amber-500/10 via-indigo-500/10 to-black">
              <div className="absolute inset-0 backdrop-blur-[2px]" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs text-white/60 tracking-widest uppercase">
                  Flutter Developer & Designer · Malang, Indonesia
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

          </div>
        </div>

        {/* CONTACT */}
        <div className="border-t border-white/10 pt-28 pb-20">

          <h3
            className="font-bold text-white mb-6 leading-tight"
            style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}
          >
            Let's work
            <br />
            <span className="italic font-normal text-amber-400">
              together ✦
            </span>
          </h3>

          <p className="text-white/60 text-base max-w-md mb-20">
            Open to freelance projects, collaborations, and meaningful conversations.
            Drop me a line.
          </p>

          <div>
            {contacts.map((contact, i) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
                className="flex items-center justify-between py-6 border-b border-white/10 group transition-all duration-300 hover:border-white/30"
              >
                <div className="flex items-center gap-5">
                  <span className="text-xl text-white/40 group-hover:text-amber-400 transition-colors">
                    {contact.icon}
                  </span>
                  <span className="text-sm text-white/60 uppercase tracking-widest">
                    {contact.label}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-base text-white/80 group-hover:text-white transition-colors">
                    {contact.value}
                  </span>
                  <span className="text-white/40 group-hover:text-white transition-colors">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}