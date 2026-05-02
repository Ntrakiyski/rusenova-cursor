import React from 'react'

import img1 from '../../source/images/1.png'
import img2 from '../../source/images/2.png'
import img3 from '../../source/images/3.png'

const items = [
  {
    text: "you're not an admin",
    img: img1,
    alt: 'Scroll image 1',
  },
  {
    text: "reporting shouldn't eat your time",
    img: img2,
    alt: 'Scroll image 2',
  },
  {
    text: 'ship what matters',
    img: img3,
    alt: 'Scroll image 3',
  },
] as const

export function ScrollTextImageSection() {
  const [activeIdx, setActiveIdx] = React.useState(0)
  const wrapRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        const rect = el.getBoundingClientRect()
        const vh = Math.max(1, window.innerHeight)

        // progress: 0 at section top, increases as user scrolls down
        const progress = Math.max(0, -rect.top)
        const idx = Math.min(items.length - 1, Math.max(0, Math.floor((progress + vh * 0.5) / vh)))
        setActiveIdx(idx)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const active = items[activeIdx] ?? items[0]

  return (
    <section className="relative bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        {/* This wrapper creates 3 “scroll screens” while content stays pinned */}
        <div ref={wrapRef} className="relative" style={{ height: `${items.length * 100}vh` }}>
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
                  <img
                    key={activeIdx}
                    src={active.img}
                    alt={active.alt}
                    className="h-full w-full rounded-2xl object-cover opacity-95 shadow-[0_0_120px_rgba(255,255,255,0.08)] transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

