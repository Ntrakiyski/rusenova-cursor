import React from 'react'
import { Menu, X } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, useLocation } from 'react-router-dom'

import { setDocumentScrollTop, scrollTriggerForceUpdate } from '../lib/scrollViewport'
import { cn } from '../lib/utils'
import { isCaseStudyRoute, resolveCaseStudyBackTo } from '../lib/navOrigin'

const sectionLinks = [
  { label: 'Services', to: '/#services' },
  { label: 'AI', to: '/#ai' },
  { label: 'Product Design', to: '/#product-design' },
] as const

const homeNavItem = { label: 'Home', to: '/' } as const

const desktopNavItems = [
  homeNavItem,
  ...sectionLinks,
  { label: 'About', to: '/#about' as const },
  { label: 'Contact', to: '/#contact' as const },
] as const

/** Mobile drawer — Home first, then section anchors, About, Contact. */
const mobileMenuItems = [
  homeNavItem,
  ...sectionLinks,
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
] as const

/** `dark` = dark section bg → light nav ink; `light` = light section bg → dark nav ink */
export type NavBackdropTone = 'dark' | 'light'

function resolveBackdropTone(
  sampleX: number,
  sampleY: number,
  navRoot: HTMLElement,
): NavBackdropTone {
  if (typeof document.elementsFromPoint === 'function') {
    const stack = document.elementsFromPoint(sampleX, sampleY)
    if (stack?.length) {
      for (const hit of stack) {
        const el = hit instanceof Element ? hit : null
        if (!el) continue
        if (navRoot.contains(el)) continue
        const marked = el.closest('[data-nav-bg]')
        if (marked instanceof HTMLElement) {
          const v = marked.dataset.navBg
          if (v === 'light' || v === 'dark') return v
        }
      }
    }
  }

  /** Fallback when nothing in the pierce stack matched (SVG/iframe quirks): last matching section wins DOM-stacking-wise */
  const all = [...document.querySelectorAll('[data-nav-bg]')] as HTMLElement[]
  for (let i = all.length - 1; i >= 0; i--) {
    const section = all[i]
    const r = section.getBoundingClientRect()
    if (sampleY >= r.top && sampleY <= r.bottom) {
      const v = section.dataset.navBg
      if (v === 'light' || v === 'dark') return v
    }
  }

  return 'dark'
}

function useNavbarBackdropTone(navRef: React.RefObject<HTMLElement | null>) {
  const [backdropIsDark, setBackdropIsDark] = React.useState(true)

  React.useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav || typeof window === 'undefined') return

    let raf = 0
    const run = () => {
      const r = nav.getBoundingClientRect()
      const x = Math.min(Math.max(window.innerWidth / 2, 8), window.innerWidth - 8)
      const y = (r.top + r.bottom) / 2
      const tone = resolveBackdropTone(x, y, nav)
      const nextDark = tone === 'dark'
      setBackdropIsDark((prev) => (prev === nextDark ? prev : nextDark))
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        run()
      })
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [navRef])

  return backdropIsDark
}

export function Navbar() {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const backdropIsDark = useNavbarBackdropTone(wrapperRef)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  React.useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  React.useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const desktopLinkClass = cn(
    'rounded-xl px-2.5 py-1.5 font-body text-xs font-medium transition-colors duration-300 sm:rounded-full sm:px-3.5 sm:py-2 sm:text-sm',
    backdropIsDark
      ? 'text-white/90 hover:text-white'
      : 'text-neutral-950/90 hover:text-neutral-950',
  )

  const mobileLinkClass = cn(
    'block w-full rounded-xl px-3 py-3.5 text-left font-instrumentSans text-xl font-semibold uppercase tracking-[0.1em] transition-colors duration-300',
    backdropIsDark
      ? 'text-white/90 hover:bg-white/10 hover:text-white'
      : 'text-neutral-950/90 hover:bg-neutral-950/[0.06] hover:text-neutral-950',
  )

  const inkClass = backdropIsDark ? 'text-white/90 hover:text-white' : 'text-neutral-950/90 hover:text-neutral-950'

  const onCaseStudy = isCaseStudyRoute(location.pathname)
  const backTo = resolveCaseStudyBackTo(location.pathname, location.state)

  /** RR often no-ops `Link to="/"` when already on `/` without a hash — still run scroll + ST sync. */
  const onHomeNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return
    if (location.hash) return
    const y =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (y < 2) return
    e.preventDefault()
    setDocumentScrollTop(0)
    window.setTimeout(() => {
      ScrollTrigger.refresh()
      scrollTriggerForceUpdate()
      setDocumentScrollTop(0)
    }, 0)
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed top-4 left-0 right-0 z-[70] px-8 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center py-3">
        <div className="min-w-0 shrink-0">
          {onCaseStudy ? (
            <Link to={backTo} className="shrink-0" aria-label="Back to previous page">
              <span
                className={cn(
                  'text-sm font-body font-medium tracking-wide transition-colors duration-300',
                  inkClass,
                )}
              >
                Back
              </span>
            </Link>
          ) : location.pathname === '/' ? null : (
            <Link to="/" className="shrink-0" aria-label="Home">
              <span
                className={cn(
                  'text-sm font-body font-medium tracking-wide transition-colors duration-300',
                  inkClass,
                )}
              >
                Home
              </span>
            </Link>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center">
          <nav
            className={cn(
              'hidden max-w-[min(100%,22rem)] flex-wrap justify-end gap-0.5 rounded-2xl px-1 py-1 md:flex md:max-w-none md:flex-nowrap md:rounded-full md:px-1.5',
              'liquid-glass transition-[box-shadow] duration-300',
              !backdropIsDark && 'liquid-glass-on-light',
            )}
            aria-label="Primary"
          >
            {desktopNavItems.map((item) => (
              <Link
                key={item.label === 'Home' ? 'nav-home' : item.to}
                to={item.to}
                className={desktopLinkClass}
                onClick={item.label === 'Home' ? onHomeNavClick : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className={cn(
                'rounded-xl p-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2',
                backdropIsDark ? 'focus-visible:ring-white/35' : 'focus-visible:ring-neutral-950/25',
                inkClass,
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[80] md:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-primary-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-y-0 right-0 flex min-h-dvh w-[min(92vw,19.5rem)] flex-col border-l border-white/25 shadow-2xl"
          >
            <nav
              className={cn(
                'flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-3 pt-20',
                'liquid-glass liquid-glass-edgeless transition-[box-shadow] duration-300',
                !backdropIsDark && 'liquid-glass-on-light',
              )}
              aria-label="Primary"
            >
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass}
                  onClick={(e) => {
                    if (item.label === 'Home') onHomeNavClick(e)
                    setMenuOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  )
}
