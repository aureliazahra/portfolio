import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval)
          return 100
        }
        return c + Math.floor(Math.random() * 12) + 3
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (count >= 100) {
      const t = setTimeout(() => setLoading(false), 600)
      return () => clearTimeout(t)
    }
  }, [count])
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center"
          style={{ background: '#080808' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span
              className="text-6xl text-cream/80"
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
            >
              A
            </span>
            <span
              className="text-lg text-cream/40 ml-1"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              telier
            </span>
          </motion.div>
          {/* Progress bar */}
          <div className="w-40 h-px bg-cream/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-amber-400/60"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(count, 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          {/* Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="text-cream text-xs mt-4 font-mono tabular-nums"
          >
            {Math.min(count, 100).toString().padStart(3, '0')}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}