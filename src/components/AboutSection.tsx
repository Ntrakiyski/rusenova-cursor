import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

import gloriaImg from '../../source/images/gloria.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

const stats = [
  { value: '9+', label: 'Years of Experience' },
  { value: '20+', label: 'Shipped Products' },
  { value: '2M+', label: 'Users Impacted' },
] as const

const paragraphs = [
  "I'm Gloria — currently based in Bulgaria (but don't mind changing countries). Product designer for 9 years, exploring how systems, data, and human behavior connect to shape meaningful experiences.",
  'Now focusing on machine learning, as my curiosity about data and statistics naturally led me to combine it with product design.',
] as const

/** Photo — portrait frame next to the pink column */
const PHOTO_FRAME_ASPECT = '2 / 3.25' as const

function AboutVisualCluster({ alt }: { alt?: string }) {
  return (
    <div className="flex h-auto min-h-0 w-full max-w-full gap-3 sm:gap-4 md:gap-5 lg:h-full lg:min-h-0 lg:max-w-[min(100%,22.75rem)] xl:max-w-[min(100%,25.25rem)]">
      {/* Grows to full height of the About copy column on large screens; max-width only shrinks horizontally */}
      <div
        aria-hidden="true"
        className="min-h-10 min-w-0 flex-[1.45] shrink-0 basis-0 self-stretch rounded-none bg-[#E9A8E5] lg:min-h-0"
      />
      <div className="flex min-w-0 flex-[1.05] shrink-0 basis-0 flex-col self-stretch justify-end">
        <div
          className="w-full shrink-0 overflow-hidden rounded-none"
          style={{ aspectRatio: PHOTO_FRAME_ASPECT }}
        >
          <img
            src={gloriaImg}
            alt={alt ?? ''}
            className="h-full w-full object-cover rounded-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

function AboutEditorialBlocks({
  paragraphClassForIndex,
}: {
  paragraphClassForIndex: (idx: number) => string
}) {
  return (
    <div className="w-full text-left">
      {paragraphs.map((text, idx) => (
        <div
          key={idx}
          className={
            idx === 0
              ? ''
              : 'mt-8 border-t border-solid border-white/20 sm:mt-10'
          }
        >
          <div className={idx === 0 ? '' : 'pt-8 sm:pt-10'}>
            <p className={paragraphClassForIndex(idx)}>{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AboutStatsRow() {
  return (
    <div className="mt-12 grid w-full grid-cols-3 gap-3 sm:mt-14 sm:gap-4 text-left">
      {stats.map((s) => (
        <div key={s.label} className="flex min-h-0 min-w-0 flex-col">
          <div className="shrink-0 font-instrumentSans text-4xl font-bold leading-none text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
            {s.value}
          </div>
          <div className="flex min-h-[2.75rem] flex-1 flex-col justify-end pt-2 sm:min-h-[3.25rem]">
            <p className="font-instrumentSans text-[9px] font-normal uppercase leading-snug tracking-[0.14em] text-white sm:text-[10px] md:text-xs">
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      const lineEl = titleRef.current
      if (!root || !lineEl) return

      const mm = gsap.matchMedia()

      // Both queries required: GSAP only runs this callback if at least one matches.
      // A single `reduce` query never matches for most users, so the animation never ran.
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
      id="about"
      data-nav-bg="dark"
      className="relative border-t border-white/[0.08] bg-[#0a0a0a] text-white"
    >
      <div className="min-w-0 px-4 py-20 sm:px-6 lg:px-8 lg:py-28 xl:px-12">
        <div className="grid min-h-0 min-w-0 grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-stretch lg:gap-8 xl:gap-12">
          <div className="flex min-h-0 min-w-0 w-full items-center justify-center lg:h-full lg:items-stretch lg:justify-start">
            <AboutVisualCluster alt="Gloria" />
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            <h2 className="w-full text-right font-instrumentSans font-bold uppercase tracking-tight text-white text-[clamp(2.7rem,11.6vw,4.85rem)] min-[400px]:text-[clamp(2.95rem,10.5vw,5.1rem)] sm:text-7xl md:text-[10rem] lg:text-[13rem] leading-[0.85]">
              <span ref={titleRef} className="inline-block">
                About
              </span>
            </h2>

            <div className="mt-10 flex w-full justify-end">
              <div className="w-full max-w-[min(100%,26rem)] min-w-0 text-left sm:max-w-[28rem]">
                <AboutEditorialBlocks
                  paragraphClassForIndex={() =>
                    'font-instrumentSans text-left text-sm leading-relaxed text-white sm:text-base md:text-lg'
                  }
                />

                <AboutStatsRow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
