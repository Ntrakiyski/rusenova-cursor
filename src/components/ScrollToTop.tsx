import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { setDocumentScrollTop, scrollTriggerForceUpdate } from '../lib/scrollViewport'

const HOME_SCROLL_STORAGE_KEY = 'new-website-home-scroll-y'

let clearedHomeScrollStorageOnDocumentLoad = false

/**
 * Home anchors where `scroll-margin-top` + scrollIntoView would leave the band
 * above the target (the “clearance” for the fixed nav) filled by the *previous*
 * section — black Projects hero above AI, or AI cards above Product Design.
 * Align the target’s top with the viewport instead; each block already has
 * top padding so content clears the nav.
 */
const HOME_HASH_FLUSH_TOP = new Set(['ai', 'product-design'])

/** Scroll viewport; sets both roots + syncs ScrollTrigger (see `scrollViewport`). */
function setScrollTop(y: number) {
  setDocumentScrollTop(y)
}

function applyScrollForRoute(
  pathname: string,
  hash: string,
  navigationType: 'POP' | 'PUSH' | 'REPLACE',
) {
  if (!hash) {
    if (pathname === '/' && navigationType === 'POP') {
      const raw = sessionStorage.getItem(HOME_SCROLL_STORAGE_KEY)
      const y = raw != null ? Number.parseFloat(raw) : NaN
      if (Number.isFinite(y) && y > 0) {
        setScrollTop(Math.round(y))
      } else {
        setScrollTop(0)
      }
    } else {
      setScrollTop(0)
    }
    return
  }

  const id = decodeURIComponent(hash.slice(1))
  // Hero uses ScrollTrigger pin — scrollIntoView fights pin math on home.
  if (!id || id === 'home') {
    setScrollTop(0)
    return
  }

  const el = document.getElementById(id)
  if (!el) {
    // Avoid jumping to top: hash targets may render one frame later after a route swap.
    return
  }

  if (pathname === '/' && HOME_HASH_FLUSH_TOP.has(id)) {
    const y =
      el.getBoundingClientRect().top +
      (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop)
    setScrollTop(Math.round(y))
    return
  }

  el.scrollIntoView({ behavior: 'auto', block: 'start' })
  scrollTriggerForceUpdate()
}

/** After navigation: honor `#hash` when present; otherwise top of page. Re-apply after ScrollTrigger.refresh — refresh can move scroll. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const prevPathnameRef = useRef<string | undefined>(undefined)

  useLayoutEffect(() => {
    if (!clearedHomeScrollStorageOnDocumentLoad) {
      clearedHomeScrollStorageOnDocumentLoad = true
      sessionStorage.removeItem(HOME_SCROLL_STORAGE_KEY)
    }

    const prev = prevPathnameRef.current
    if (prev === '/' && pathname !== '/') {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      sessionStorage.setItem(HOME_SCROLL_STORAGE_KEY, String(Math.round(y)))
    }
    prevPathnameRef.current = pathname

    applyScrollForRoute(pathname, hash, navigationType)

    let canceled = false
    const t = window.setTimeout(() => {
      if (canceled) return
      ScrollTrigger.refresh()
      scrollTriggerForceUpdate()
      applyScrollForRoute(pathname, hash, navigationType)
      requestAnimationFrame(() => {
        if (canceled) return
        applyScrollForRoute(pathname, hash, navigationType)
        requestAnimationFrame(() => {
          if (!canceled) applyScrollForRoute(pathname, hash, navigationType)
        })
      })
    }, 0)

    return () => {
      canceled = true
      window.clearTimeout(t)
    }
  }, [pathname, hash, navigationType])

  return null
}
