import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Service = {
  label: string
  left?: string[]
  right?: string[]
}

const services: Service[] = [
  {
    label: 'Data Engineering',
    left: ['Pipeline design', 'ETL / ELT'],
    right: ['Data warehousing', 'Workflow orchestration'],
  },
  {
    label: 'Data Science',
    left: ['Exploratory analysis', 'A/B experimentation'],
    right: ['Statistical modeling', 'Data visualization'],
  },
  {
    label: 'Machine Learning',
    left: ['Feature engineering', 'Model training'],
    right: ['Evaluation & metrics', 'Model deployment'],
  },
  {
    label: 'Product Design',
    left: ['Strategy'],
    right: ['Design Systems', 'UX&UI'],
  },
  {
    label: 'AI Engineering',
    left: ['LLM integration', 'Prompt systems'],
    right: ['RAG pipelines', 'Agentic workflows'],
  },
]

const MOBILE_SERVICES_MQ = '(max-width: 767px)'

export function ServicesList() {
  const sectionRef = React.useRef<HTMLElement | null>(null)
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([])
  // Mouse-hover driven on desktop. On mobile, scroll picks the active row.
  const [active, setActive] = React.useState<number | null>(null)
  const [activeCenterY, setActiveCenterY] = React.useState<number | null>(null)
  const [isMobileServices, setIsMobileServices] = React.useState(false)
  const rafRef = React.useRef<number | null>(null)
  const lastClientYRef = React.useRef<number | null>(null)
  const pointerInsideRef = React.useRef(false)

  React.useEffect(() => {
    const mq = window.matchMedia(MOBILE_SERVICES_MQ)
    const sync = () => setIsMobileServices(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const updateActiveFromScrollCenter = React.useCallback(() => {
    const nodes = itemRefs.current
    if (!nodes.length) return

    const vh = window.innerHeight
    const targetY = vh * 0.45
    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i]
      if (!el) continue
      const r = el.getBoundingClientRect()
      const centerY = (r.top + r.bottom) / 2
      const d = Math.abs(centerY - targetY)
      if (d < bestDist) {
        bestDist = d
        bestIdx = i
      }
    }

    setActive(bestIdx)
    const sec = sectionRef.current
    const activeEl = nodes[bestIdx]
    if (sec && activeEl) {
      const ar = activeEl.getBoundingClientRect()
      const sr = sec.getBoundingClientRect()
      setActiveCenterY((ar.top + ar.bottom) / 2 - sr.top)
    }
  }, [])

  React.useEffect(() => {
    if (!isMobileServices) return

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        updateActiveFromScrollCenter()
      })
    }

    updateActiveFromScrollCenter()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [isMobileServices, updateActiveFromScrollCenter])

  // Pick the item whose vertical center is closest to the cursor's Y.
  // Hovering anywhere on the row — including the side-label gutters on the
  // left or right — is enough to "select" that service.
  const updateActiveFromClientY = React.useCallback((clientY: number) => {
    const nodes = itemRefs.current
    if (!nodes.length) return

    let bestIdx: number | null = null
    let bestDist = Number.POSITIVE_INFINITY
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i]
      if (!el) continue
      const r = el.getBoundingClientRect()
      const centerY = (r.top + r.bottom) / 2
      const d = Math.abs(centerY - clientY)
      if (d < bestDist) {
        bestDist = d
        bestIdx = i
      }
    }

    if (bestIdx !== null) {
      setActive(bestIdx)
      const sec = sectionRef.current
      const activeEl = nodes[bestIdx]
      if (sec && activeEl) {
        const ar = activeEl.getBoundingClientRect()
        const sr = sec.getBoundingClientRect()
        setActiveCenterY((ar.top + ar.bottom) / 2 - sr.top)
      }
    }
  }, [])

  const scheduleUpdate = React.useCallback(
    (clientY: number) => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        updateActiveFromClientY(clientY)
      })
    },
    [updateActiveFromClientY],
  )

  // While the cursor is inside the section, refresh on scroll too — items
  // move under a still cursor during the parallax slide-up reveal, and
  // pointermove won't fire if the user isn't physically moving the mouse.
  React.useEffect(() => {
    const onScroll = () => {
      if (!pointerInsideRef.current) return
      const y = lastClientYRef.current
      if (y === null) return
      scheduleUpdate(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [scheduleUpdate])

  // Pin only on desktop: mobile uses natural scroll + scroll-driven highlight.
  useGSAP(
    () => {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const sec = sectionRef.current
      if (!sec) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const pin = ScrollTrigger.create({
          trigger: sec,
          start: 'top top',
          end: '+=100%',
          pin: true,
          anticipatePin: 1,
          refreshPriority: 2,
        })
        return () => pin.kill()
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="services"
      data-nav-bg="light"
      ref={(el) => {
        sectionRef.current = el
      }}
      className="scroll-mt-28 relative min-h-0 md:min-h-screen bg-[#e9e9e9] text-black"
      onPointerEnter={(e) => {
        if (isMobileServices) return
        pointerInsideRef.current = true
        lastClientYRef.current = e.clientY
        scheduleUpdate(e.clientY)
      }}
      onPointerMove={(e) => {
        if (isMobileServices) return
        lastClientYRef.current = e.clientY
        scheduleUpdate(e.clientY)
      }}
      onPointerLeave={() => {
        if (isMobileServices) return
        pointerInsideRef.current = false
        setActive(null)
        setActiveCenterY(null)
      }}
    >
      {isMobileServices
        ? null
        : active !== null &&
          activeCenterY !== null &&
          (services[active]?.left?.length || services[active]?.right?.length) ? (
        <>
          <div
            className={[
              'pointer-events-none absolute z-30',
              'left-4 sm:left-6 md:left-10 lg:left-14',
              'max-w-[min(12rem,max(5rem,calc(50vw_-_10rem)))]',
              'text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/60 font-body',
              'text-right leading-snug',
            ].join(' ')}
            style={{ top: activeCenterY, transform: 'translateY(-50%)' }}
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {services[active]?.left?.map((t) => (
                <div key={t} className="transition-opacity duration-150">
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div
            className={[
              'pointer-events-none absolute z-30',
              'right-4 sm:right-6 md:right-10 lg:right-14',
              'max-w-[min(12rem,max(5rem,calc(50vw_-_10rem)))]',
              'text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/60 font-body',
              'text-left leading-snug',
            ].join(' ')}
            style={{ top: activeCenterY, transform: 'translateY(-50%)' }}
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              {services[active]?.right?.map((t) => (
                <div key={t} className="transition-opacity duration-150">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </>
          )
        : null}

      <div
        className={[
          'relative mx-auto flex max-w-6xl items-center max-md:px-5 sm:px-10 md:px-14 lg:px-16',
          isMobileServices ? 'min-h-[100vh] py-8' : 'min-h-screen py-16 px-6',
        ].join(' ')}
      >
        <div
          className={[
            'mx-auto w-full max-w-4xl text-center',
            isMobileServices
              ? 'px-2 sm:px-4'
              : 'px-[clamp(2.75rem,min(14vw,8rem),8rem)] sm:px-[clamp(3rem,min(13vw,7.5rem),7.5rem)]',
          ].join(' ')}
        >
          <div
            className={[
              'flex flex-col items-center max-md:leading-[1.04] leading-[0.88] tracking-[-0.06em] sm:tracking-[-1px]',
              isMobileServices ? 'gap-3.5 sm:gap-4' : '',
            ].join(' ')}
          >
            {services.map((s, idx) => {
              const isActive = isMobileServices ? active === idx : active === null ? true : active === idx
              return (
                <div
                  key={s.label}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                  className={[
                    'font-instrumentSans font-bold not-italic',
                    'max-md:text-[clamp(2.2rem,8.8vw,2.9rem)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem]',
                    'max-md:whitespace-normal max-md:px-1 md:whitespace-nowrap',
                    'transition-colors duration-200',
                    isMobileServices
                      ? isActive
                        ? 'text-black'
                        : 'text-black/30'
                      : active === null
                        ? 'text-black'
                        : isActive
                          ? 'text-black'
                          : 'text-black/30',
                    'cursor-default select-none',
                  ].join(' ')}
                >
                  {s.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
