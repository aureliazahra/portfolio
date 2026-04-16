import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'text'
export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [cursorLabel, setCursorLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const springConfigSlow = { damping: 20, stiffness: 150, mass: 0.8 }
  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)
  const ringX = useSpring(mouseX, springConfigSlow)
  const ringY = useSpring(mouseY, springConfigSlow)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorState
      const label = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || ''
      if (cursorType) {
        setCursorState(cursorType)
        setCursorLabel(label)
      }
    }
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor]')) {
        setCursorState('default')
        setCursorLabel('')
      }
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [isVisible])
  const getDotSize = () => {
    switch (cursorState) {
      case 'hover': return 8
      case 'view': return 6
      case 'drag': return 6
      case 'text': return 3
      default: return 6
    }
  }
  const getRingSize = () => {
    switch (cursorState) {
      case 'hover': return 48
      case 'view': return 80
      case 'drag': return 64
      case 'text': return 28
      default: return 32
    }
  }
  const dotSize = getDotSize()
  const ringSize = getRingSize()
  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorState === 'view' ? '#c9a96e' : '#f0ece4',
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          borderColor: cursorState === 'view' ? 'rgba(201,169,110,0.6)' : 'rgba(240,236,228,0.25)',
          backgroundColor: cursorState === 'view' ? 'rgba(201,169,110,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] flex items-center justify-center"
      >
        {(cursorState === 'view' && cursorLabel) && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[10px] font-medium tracking-widest text-amber-300 uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}