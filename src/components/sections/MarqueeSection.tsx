import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
const items = [
  { text: 'Flutter', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'UI/UX Design', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Brand Identity', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Motion Design', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Mobile Apps', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Illustration', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Figma', type: 'text' },
  { text: '✦', type: 'star' },
  { text: 'Firebase', type: 'text' },
  { text: '✦', type: 'star' },
]
export default function MarqueeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Top row moves left, bottom row moves right — creates a cinematic feel
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-15%', '0%'])
  // Skew for diagonal feel
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], ['-2deg', '0deg', '2deg'])
  return (
    <div
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{
        borderTop: '1px solid rgba(240,236,228,0.05)',
        borderBottom: '1px solid rgba(240,236,228,0.05)',
      }}
    >
      {/* Row 1 — moves left on scroll */}
      <motion.div
        style={{ x: x1, skewY: skew }}
        className="flex gap-0 mb-4 whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`
              inline-block px-5 text-4xl md:text-6xl font-bold
              ${item.type === 'star'
                ? 'text-amber-400/30 text-2xl md:text-4xl'
                : 'text-cream/8'
              }
            `}
            style={{
              fontFamily: item.type === 'text' ? 'var(--font-sans)' : 'inherit',
            }}
          >
            {item.text}
          </span>
        ))}
      </motion.div>
      {/* Row 2 — moves right on scroll, italic serif */}
      <motion.div
        style={{ x: x2, skewY: skew }}
        className="flex gap-0 whitespace-nowrap"
      >
        {[...items.slice(4), ...items, ...items.slice(0, 4)].map((item, i) => (
          <span
            key={i}
            className={`
              inline-block px-5
              ${item.type === 'star'
                ? 'text-cream/20 text-2xl md:text-4xl'
                : 'text-cream/5 text-4xl md:text-6xl font-bold'
              }
            `}
            style={{
              fontFamily: item.type === 'text' ? 'var(--font-serif)' : 'inherit',
              fontStyle: item.type === 'text' ? 'italic' : 'normal',
            }}
          >
            {item.text}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
