import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
type Props = {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}
export default function MagneticButton({ children, className, strength = 0.4, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x: x * strength, y: y * strength })
  }
  const reset = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      animate={position}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className={className}
      data-cursor="hover"
      style={{ display: 'inline-flex' }}
    >
      <motion.span
        animate={{ scale: isHovered ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'contents' }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}