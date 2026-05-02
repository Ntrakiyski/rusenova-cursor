import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

// Soft pink accent (matches site pinks)
const pink = '#E9A8E5'

export function WhyCardsZoomSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      const lineEl = titleRef.current
      if (!root || !lineEl) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(lineEl, { clearProps: 'all' })
            return
          }

          const split = SplitText.create(lineEl, {
            type: 'chars',
            smartWrap: true,
            aria: 'auto',
          })

          gsap.set(split.chars, { yPercent: 110, opacity: 0, rotate: 4 })

          const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: root,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          })

          tl.to(
            split.chars,
            {
              yPercent: 0,
              opacity: 1,
              rotate: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: { each: 0.04, from: 'start' },
            },
            0.05,
          )

          return () => {
            split.revert()
            tl.scrollTrigger?.kill()
            tl.kill()
          }
        },
      )

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-nav-bg="dark"
      className="relative flex min-h-svh flex-col justify-center border-t border-white/[0.08] bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-6xl max-md:px-5 sm:px-10 md:px-14 lg:px-16 py-8 md:py-16">
        <div className="flex items-center justify-center text-center">
          <span
            ref={titleRef}
            className="inline-block max-w-[15ch] font-instrumentSans font-bold uppercase tracking-tight leading-[0.88] text-balance text-[clamp(3rem,9vw,7rem)]"
            style={{ color: pink }}
          >
            Ship what matters
          </span>
        </div>
      </div>
    </section>
  )
}
