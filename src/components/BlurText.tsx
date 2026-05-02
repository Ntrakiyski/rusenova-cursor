import { motion } from 'motion/react'
import React from 'react'

type BlurTextProps = {
  text: string
  className?: string
  split?: 'words' | 'letters'
  direction?: 'bottom' | 'top'
  baseDelayMs?: number
  staggerMs?: number
  once?: boolean
}

export function BlurText({
  text,
  className,
  split = 'words',
  direction = 'bottom',
  baseDelayMs = 0,
  staggerMs = 200,
  once = true,
}: BlurTextProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setActive(false)
        }
      },
      { threshold: 0.25 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  const items = split === 'letters' ? text.split('') : text.split(' ')

  const yFrom = direction === 'bottom' ? 50 : -50
  const yMid = direction === 'bottom' ? -5 : 5

  return (
    <span ref={ref} className={className}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          className="inline-block will-change-transform"
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: yFrom,
          }}
          animate={
            active
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [yFrom, yMid, 0],
                }
              : {
                  filter: 'blur(10px)',
                  opacity: 0,
                  y: yFrom,
                }
          }
          transition={{
            delay: (baseDelayMs + i * staggerMs) / 1000,
            duration: 0.35,
            times: [0, 0.7, 1],
            ease: 'easeOut',
          }}
        >
          {split === 'words' ? `${item}${i < items.length - 1 ? '\u00A0' : ''}` : item}
        </motion.span>
      ))}
    </span>
  )
}

