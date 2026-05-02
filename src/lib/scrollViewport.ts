import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** `@types` omit ScrollTrigger.update(force?) — runtime supports boolean for immediate full pass. */
export function scrollTriggerForceUpdate() {
  ;(ScrollTrigger.update as (force?: boolean) => void)(true)
}

/**
 * Set document scroll and immediately sync ScrollTrigger (scrub timelines, pins).
 * Plain `scrollTo`/`scrollTop` alone can leave transform-driven effects one frame
 * behind — e.g. Projects fixed white panels stuck mid-wipe over the hero.
 */
export function setDocumentScrollTop(y: number) {
  const top = Math.max(0, y)
  window.scrollTo({ top, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = top
  document.body.scrollTop = top
  scrollTriggerForceUpdate()
}
