import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className,
  strength = 0.25, /* === UPDATED: lebih halus (sebelumnya 0.4) === */
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    setPosition({
      x: x * strength,
      y: y * strength,
    })
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
      transition={{
        type: 'spring',
        stiffness: 180, /* === UPDATED: lebih smooth === */
        damping: 18,    /* === UPDATED: lebih stabil === */
        mass: 0.6,      /* === UPDATED === */
      }}
      data-cursor="hover"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '56px',      /* === UPDATED: tinggi ideal CTA === */
        paddingInline: '28px',  /* === UPDATED: horizontal space lebih lega === */
        borderRadius: '9999px',
      }}
    >
      <motion.span
        animate={{
          scale: isHovered ? 1.03 : 1, /* === UPDATED: scale lebih subtle === */
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem', /* === UPDATED: jarak icon & text lebih nyaman === */
          fontSize: '0.95rem', /* === UPDATED: ukuran teks lebih readable === */
          lineHeight: 1.2,
          fontWeight: 500,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}