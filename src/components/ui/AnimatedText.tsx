import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
type WipeTextProps = {
  text: string
  className?: string
  delay?: number
  once?: boolean
}
// Character-by-character wipe reveal
export function WipeText({ text, className, delay = 0, once = true }: WipeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-5% 0px' })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', rotateX: -20 }}
            animate={isInView ? { y: 0, rotateX: 0 } : { y: '110%', rotateX: -20 }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + wi * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
// Clip/wipe reveal from left
export function ClipReveal({ text, className, delay = 0 }: WipeTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
        animate={isInView
          ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
          : { clipPath: 'inset(0 100% 0 0)', opacity: 1 }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {text}
      </motion.span>
    </span>
  )
}
// Scramble/glitch reveal on scroll
type ScrollWipeProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'diagonal'
}
export function ScrollReveal({ children, className, delay = 0, direction = 'up' }: ScrollWipeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })
  const variants = {
    up: {
      hidden: { y: 60, opacity: 0, filter: 'blur(8px)' },
      visible: { y: 0, opacity: 1, filter: 'blur(0px)' },
    },
    left: {
      hidden: { x: -60, opacity: 0, filter: 'blur(8px)' },
      visible: { x: 0, opacity: 1, filter: 'blur(0px)' },
    },
    diagonal: {
      hidden: { x: -40, y: 40, opacity: 0, rotate: 2 },
      visible: { x: 0, y: 0, opacity: 1, rotate: 0 },
    },
  }
  return (
    <motion.div
      ref={ref}
      variants={variants[direction]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
// Parallax text on scroll
type ParallaxTextProps = {
  children: React.ReactNode
  className?: string
  speed?: number
}
export function ParallaxText({ children, className, speed = 0.3 }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
// Counter animation
type CounterProps = {
  from?: number
  to: number
  suffix?: string
  className?: string
}
export function AnimatedCounter({ from = 0, to, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
    return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onUpdate={() => {}}
        >
          {to}{suffix}
        </motion.span>
      ) : from}
    </motion.span>
  )
}