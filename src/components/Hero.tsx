import { motion } from 'motion/react'
import React from 'react'

import { BlurText } from './BlurText'
import { CodeSnake } from './CodeSnake'
import { MeshGradient } from './MeshGradient'
import { FOOTER_SOCIAL_LINKS } from '../config/footerSocial'
import { Button } from './ui/button'

export function Hero() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const [scrollFx, setScrollFx] = React.useState({ blurPx: 0, darkenAlpha: 0 })

  React.useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = Math.max(1, window.innerHeight)

      // Pin + overlay crawl only runs on desktop (see HomePage ScrollTrigger). On
      // smaller viewports the same math still ran and subpixel / dynamic-toolbar
      // `rect.top` gave a faint blur + dark layer at rest.
      const scrollFxDesktop = window.matchMedia('(min-width: 768px)').matches
      if (!scrollFxDesktop) {
        setScrollFx({ blurPx: 0, darkenAlpha: 0 })
        return
      }

      // Dead zone: no vignette until the hero has actually moved up (avoids jitter at scroll 0).
      const topOffsetPx = -rect.top
      const deadPx = 24
      const shifted = Math.max(0, topOffsetPx - deadPx)
      const range = Math.max(1, Math.min(rect.height, vh))
      const raw = shifted / range
      const t = Math.max(0, Math.min(1, raw))

      const blurPx = t * 10 // up to 10px blur
      const darkenAlpha = t * 0.35 // up to 35% black overlay
      setScrollFx({ blurPx, darkenAlpha })
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="home"
      data-nav-bg="dark"
      ref={(el) => {
        sectionRef.current = el
      }}
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-0 w-full">
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          style={{
            filter: scrollFx.blurPx > 0 ? `blur(${scrollFx.blurPx}px)` : 'none',
            willChange: scrollFx.blurPx > 0 ? 'filter' : 'auto',
          }}
        />
        {/* Snake sits in the lower hero so it reads under the CTA, not through it */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40vh] min-h-[260px] md:h-[min(50vh,600px)] md:min-h-[300px]">
          <div className="absolute inset-0 md:top-[4.5rem]">
            <CodeSnake className="absolute inset-0" density={44} />
          </div>
        </div>
        <div
          className="absolute inset-0 z-[2]"
          style={{
            backgroundColor:
              scrollFx.darkenAlpha > 0 ? `rgba(0,0,0,${scrollFx.darkenAlpha})` : 'transparent',
            transition: 'background-color 50ms linear',
            willChange: scrollFx.darkenAlpha > 0 ? 'background-color' : 'auto',
          }}
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Fixed nav is out of flow: spacer reserves its height, then flex-1 centers the stack in the remaining viewport (padding-top + justify-center alone biased content downward). */}
      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-6xl flex-col px-8 lg:px-16">
        <div
          className="h-[calc(1rem+1.5rem+2.25rem)] shrink-0 md:hidden"
          aria-hidden
        />
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <div className="mx-auto flex w-full flex-col items-center text-center">
            <motion.p
              className="text-sm md:text-base text-white font-instrumentSans font-bold leading-tight max-w-xl"
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
            >
              Human &amp; AI
            </motion.p>

            <div className="mt-6 w-full">
              <BlurText
                text="Smart systems built for real people"
                split="words"
                direction="bottom"
                baseDelayMs={100}
                staggerMs={100}
                className="block text-6xl md:text-7xl lg:text-[5.75rem] font-instrumentSans font-bold not-italic text-foreground leading-[0.92] md:leading-[0.82] tracking-[-4px] text-center"
              />
            </div>

            <motion.div
              className="mt-8 flex justify-center"
              initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
            >
              <Button
                asChild
                variant="glassStrong"
                className="rounded-full px-5 py-2.5 h-auto"
              >
                <a href={FOOTER_SOCIAL_LINKS.email}>Get in touch</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

