import React from 'react'

import illustration7 from '../../source/images/7.png'
import img8 from '../../source/images/8.png'
import img5 from '../../source/images/5.png'

const items = [
  {
    text: "you're not an admin",
    img: null as string | null,
    alt: 'Scroll image 1',
  },
  {
    text: "reporting shouldn't eat your time",
    img: img8,
    alt: 'Scroll image 2',
  },
  {
    text: 'ship what matters',
    img: img5,
    alt: 'Scroll image 3',
  },
] as const

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function WhyToScrollSection() {
  const [activeIdx, setActiveIdx] = React.useState(0)

  const startSlotRef = React.useRef<HTMLDivElement | null>(null)
  const endSlotRef = React.useRef<HTMLDivElement | null>(null)
  const fixedImgRef = React.useRef<HTMLDivElement | null>(null)

  const whyRef = React.useRef<HTMLElement | null>(null)
  const scrollWrapRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const scrollWrap = scrollWrapRef.current
    if (!scrollWrap) return

    let raf = 0
    const onScrollForText = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const rect = scrollWrap.getBoundingClientRect()
        const vh = Math.max(1, window.innerHeight)
        const progress = Math.max(0, -rect.top)
        const idx = Math.min(items.length - 1, Math.max(0, Math.floor((progress + vh * 0.5) / vh)))
        setActiveIdx(idx)
      })
    }

    onScrollForText()
    window.addEventListener('scroll', onScrollForText, { passive: true })
    window.addEventListener('resize', onScrollForText)
    return () => {
      window.removeEventListener('scroll', onScrollForText)
      window.removeEventListener('resize', onScrollForText)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  React.useEffect(() => {
    const update = () => {
      const start = startSlotRef.current
      const end = endSlotRef.current
      const fixed = fixedImgRef.current
      const why = whyRef.current
      const scrollWrap = scrollWrapRef.current
      if (!start || !end || !fixed || !why || !scrollWrap) return

      // Only show illustration 4 for the "Why" block and the first line.
      if (activeIdx !== 0) {
        return
      }

      const sr = start.getBoundingClientRect()
      const er = end.getBoundingClientRect()
      const whyRect = why.getBoundingClientRect()
      const endTriggerY = window.scrollY + whyRect.bottom
      const startTriggerY = endTriggerY - window.innerHeight * 0.6

      const t = clamp01((window.scrollY - startTriggerY) / Math.max(1, endTriggerY - startTriggerY))

      const left = lerp(sr.left, er.left, t)
      const top = lerp(sr.top, er.top, t)
      const width = lerp(sr.width, er.width, t)
      const height = lerp(sr.height, er.height, t)

      fixed.style.left = `${left}px`
      fixed.style.top = `${top}px`
      fixed.style.width = `${width}px`
      fixed.style.height = `${height}px`
      fixed.style.opacity = '1'
    }

    let raf = 0
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
  }, [activeIdx])

  const active = items[activeIdx] ?? items[0]

  return (
    <section className="relative bg-black text-white">
      {/* fixed moving illustration */}
      <div
        ref={fixedImgRef}
        className="pointer-events-none fixed z-20"
        style={{
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          opacity: activeIdx === 0 ? 1 : 0,
          transition: 'opacity 150ms ease-out',
        }}
      >
        <img
          src={illustration7}
          alt=""
          className="h-full w-full bg-transparent object-contain"
          draggable={false}
        />
      </div>

      {/* WHY section (start slot) */}
      <section
        ref={(el) => {
          whyRef.current = el
        }}
        className="bg-black text-white"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-16 py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div ref={startSlotRef} className="w-full max-w-[420px] lg:max-w-[520px] aspect-[1/1]">
                {/* placeholder keeps layout; moving image overlays it */}
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="font-instrumentSans font-bold tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
                Why you need smart systems?
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL TEXT section (end slot is first image position) */}
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div ref={scrollWrapRef} className="relative" style={{ height: `${items.length * 100}vh` }}>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div className="max-w-xl">
                <div className="flex flex-col gap-6 text-left leading-[1.05] tracking-[-0.02em]">
                  {items.map((it, idx) => {
                    const isActive = idx === activeIdx
                    const isPast = idx < activeIdx
                    const isFuture = idx > activeIdx
                    return (
                      <div
                        key={idx}
                        className={[
                          'font-instrumentSans font-bold not-italic',
                          'text-3xl sm:text-4xl lg:text-5xl',
                          'whitespace-pre-line',
                          'transition-all duration-500 ease-out',
                          isActive ? 'opacity-100 text-white' : isPast ? 'opacity-30 text-white' : 'opacity-0',
                          isActive ? 'translate-y-0' : 'translate-y-[2px]',
                          isFuture ? 'pointer-events-none' : '',
                        ].join(' ')}
                      >
                        {it.text}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md lg:max-w-lg">
                  {activeIdx === 0 ? (
                    <div ref={endSlotRef} className="h-full w-full bg-transparent" />
                  ) : (
                    <img
                      key={activeIdx}
                      src={active.img ?? ''}
                      alt={active.alt}
                      className="h-full w-full bg-transparent object-contain transition-opacity duration-500"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

