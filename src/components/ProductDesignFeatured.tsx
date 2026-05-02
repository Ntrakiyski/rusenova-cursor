import { Link } from 'react-router-dom'

import { stateFromHomeSection } from '../lib/navOrigin'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

type FeaturedProject = {
  id: string
  shortLabel: string
  client: string
  /** Shown under the company on mobile; used in desktop link aria-labels. */
  roleTitle: string
  href: string
  accent: string
  /** Which corner of the layout this square anchors. */
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

// Four product-design projects, mapped to the four accent colors the rest of
// the site already uses (red, yellow, pink, orange). Position drives where in
// the layout each square + Click-me label is rendered.
const projects: FeaturedProject[] = [
  {
    id: 'tide',
    shortLabel: 'Framework',
    client: 'Tide',
    roleTitle: 'Senior Product Designer',
    href: '/product-design/tide',
    accent: '#F44B2F', // red
    position: 'top-left',
  },
  {
    id: 'epam',
    shortLabel: 'White-label',
    client: 'EPAM',
    roleTitle: 'Lead Product Designer',
    href: '/product-design/epam',
    accent: '#FFDA24', // yellow
    position: 'top-right',
  },
  {
    id: 'mentormate',
    shortLabel: 'Research-driven',
    client: 'MentorMate',
    roleTitle: 'Product Designer',
    href: '/product-design/mentormate',
    accent: '#E9A8E5', // pink
    position: 'bottom-left',
  },
  {
    id: 'telenor',
    shortLabel: 'Cross-platform',
    client: 'Telenor',
    roleTitle: 'Service Designer',
    href: '/product-design/telenor',
    accent: '#F38300', // orange
    position: 'bottom-right',
  },
]

const byPosition = (pos: FeaturedProject['position']) =>
  projects.find((p) => p.position === pos)!

const productDesignSectionOrigin = stateFromHomeSection('#product-design')

/**
 * One paren-wrapped square that links to a project case study. The Click-me
 * label is attached directly above (top-row squares) or below (bottom-row
 * squares) the square, so it never overlaps the swatch and always reads as
 * "this label belongs to this square".
 */
function ParenSquare({ project }: { project: FeaturedProject }) {
  const isTop = project.position.startsWith('top')

  return (
    <Link
      to={project.href}
      state={productDesignSectionOrigin}
      data-pd-link
      data-project-id={project.id}
      aria-label={`${project.client} — ${project.roleTitle}`}
      className="group/square relative inline-flex items-center align-middle text-white/85 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:text-white"
      style={{ ['--accent' as string]: project.accent }}
    >
      <span
        aria-hidden="true"
        className="select-none font-instrumentSans font-bold leading-none text-[0.92em] -mr-[0.05em]"
      >
        (
      </span>

      {/* Wrapper so the label can be absolutely positioned relative to the
          square itself rather than the whole link (which would centre it
          on the parens too). */}
      <span className="relative inline-flex items-center mx-[0.18em]">
        <span
          data-pd-square
          data-project-id={project.id}
          aria-hidden="true"
          className="relative inline-block align-middle h-[0.62em] w-[0.62em] overflow-hidden rounded-[2px] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover/square:scale-[1.08] group-hover/square:rotate-[-2deg] group-focus-visible/square:scale-[1.08]"
          style={{ backgroundColor: project.accent }}
        >
          {/* soft inner highlight for depth */}
          <span className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/15" />
        </span>

        {/* Click-me label — sits ABOVE the square for top-row, BELOW for
            bottom-row. Pointer-events disabled so the link itself stays the
            click target; whitespace-nowrap keeps it readable. */}
        <span
          data-pd-label
          data-project-id={project.id}
          aria-hidden="true"
          className={[
            'pointer-events-none absolute left-1/2 -translate-x-1/2 z-10',
            'flex flex-col items-center text-center whitespace-nowrap',
            isTop ? 'bottom-full mb-[0.18em]' : 'top-full mt-[0.18em]',
          ].join(' ')}
        >
          <span
            className={[
              'flex items-center gap-[0.35em] font-instrumentSans italic font-normal',
              'normal-case tracking-normal leading-none',
              'text-[0.16em] sm:text-[0.15em] md:text-[0.14em]',
              'text-white/60 transition-colors duration-300',
            ].join(' ')}
            data-pd-clickme
          >
            {isTop ? null : (
              <span aria-hidden="true" data-pd-arrow className="inline-block not-italic">
                ↑
              </span>
            )}
            Click me
            {isTop ? (
              <span aria-hidden="true" data-pd-arrow className="inline-block not-italic">
                ↓
              </span>
            ) : null}
          </span>

          <span
            className={[
              'mt-[0.08em] font-instrumentSans font-semibold uppercase',
              'tracking-[0.14em] leading-none whitespace-nowrap',
              // Company name at ~22% of the heading font-size so it scales
              // with the headline but stays clearly readable.
              'text-[0.22em] sm:text-[0.2em] md:text-[0.18em]',
              'text-white/85 transition-colors duration-300',
            ].join(' ')}
            data-pd-label-name
          >
            {project.client}
          </span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="select-none font-instrumentSans font-bold leading-none text-[0.92em] -ml-[0.05em]"
      >
        )
      </span>
    </Link>
  )
}

export function ProductDesignFeatured() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const productWordRef = useRef<HTMLSpanElement | null>(null)
  const designWordRef = useRef<HTMLSpanElement | null>(null)
  const mobileProductWordRef = useRef<HTMLSpanElement | null>(null)
  const mobileDesignWordRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const desktop = !!ctx.conditions?.desktop
          const mobile = !!ctx.conditions?.mobile
          const reduced = !!ctx.conditions?.reduced

          const links = root.querySelectorAll<HTMLElement>('[data-pd-link]')
          const squares = root.querySelectorAll<HTMLElement>('[data-pd-square]')
          const labels = root.querySelectorAll<HTMLElement>('[data-pd-label]')
          const mobileLines = root.querySelectorAll<HTMLElement>('[data-pd-mobile-line]')
          const mobileTiles = root.querySelectorAll<HTMLElement>('[data-pd-mobile-tile]')

          if (reduced) {
            gsap.set(
              [links, squares, labels, mobileLines, mobileTiles].flat().filter(Boolean),
              { clearProps: 'all' },
            )
            return
          }

          if (mobile) {
            gsap.set(mobileTiles, { autoAlpha: 0, y: 22, scale: 0.92 })

            const splits: SplitText[] = []
            const charTargets: HTMLElement[] = []

            for (const el of [mobileProductWordRef.current, mobileDesignWordRef.current]) {
              if (!el) continue
              const split = SplitText.create(el, {
                type: 'chars',
                smartWrap: true,
                aria: 'auto',
              })
              splits.push(split)
              charTargets.push(...(split.chars as HTMLElement[]))
            }

            gsap.set(charTargets, { yPercent: 110, opacity: 0, rotate: 4 })

            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: {
                trigger: root,
                start: 'top 72%',
                toggleActions: 'play none none reverse',
              },
            })

            tl.to(
                charTargets,
                {
                  yPercent: 0,
                  opacity: 1,
                  rotate: 0,
                  duration: 1,
                  ease: 'expo.out',
                  stagger: { each: 0.04, from: 'start' },
                },
                0,
              )
              .to(
                mobileTiles,
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  stagger: 0.07,
                  ease: 'back.out(1.25)',
                },
                0.45,
              )

            return () => {
              splits.forEach((s) => s.revert())
              tl.scrollTrigger?.kill()
              tl.kill()
            }
          }

          if (desktop) {
            gsap.set(squares, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%' })
            gsap.set(labels, { autoAlpha: 0, y: 8 })

            const splits: SplitText[] = []
            const charTargets: HTMLElement[] = []

            for (const el of [productWordRef.current, designWordRef.current]) {
              if (!el) continue
              const split = SplitText.create(el, {
                type: 'chars',
                smartWrap: true,
                aria: 'auto',
              })
              splits.push(split)
              charTargets.push(...(split.chars as HTMLElement[]))
            }

            gsap.set(charTargets, { yPercent: 110, opacity: 0, rotate: 4 })

            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: {
                trigger: root,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            })

            tl.to(
                charTargets,
                {
                  yPercent: 0,
                  opacity: 1,
                  rotate: 0,
                  duration: 1,
                  ease: 'expo.out',
                  stagger: { each: 0.04, from: 'start' },
                },
                0,
              )
              .to(
                squares,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.7,
                  ease: 'back.out(1.6)',
                  stagger: { each: 0.08, from: 'center' },
                },
                0.45,
              )
              .to(
                labels,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.55,
                  stagger: 0.06,
                },
                0.7,
              )

            const cleanups: Array<() => void> = []

            links.forEach((link) => {
              const projectId = link.dataset.projectId
              if (!projectId) return

              const project = projects.find((p) => p.id === projectId)
              if (!project) return

              const wordEl = project.position.startsWith('top')
                ? productWordRef.current
                : designWordRef.current

              const label = root.querySelector<HTMLElement>(
                `[data-pd-label][data-project-id="${projectId}"]`,
              )
              const labelName = label?.querySelector<HTMLElement>('[data-pd-label-name]')
              const clickme = label?.querySelector<HTMLElement>('[data-pd-clickme]')
              const arrow = label?.querySelector<HTMLElement>('[data-pd-arrow]')
              const isTop = project.position.startsWith('top')

              const onEnter = () => {
                gsap.to(wordEl, {
                  color: project.accent,
                  duration: 0.35,
                  ease: 'power2.out',
                  overwrite: 'auto',
                })
                if (labelName) {
                  gsap.to(labelName, {
                    color: project.accent,
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }
                if (clickme) {
                  gsap.to(clickme, {
                    color: 'rgba(255,255,255,0.9)',
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }
                if (arrow) {
                  gsap.to(arrow, {
                    y: isTop ? 4 : -4,
                    scale: 1.2,
                    duration: 0.35,
                    ease: 'back.out(2)',
                    overwrite: 'auto',
                  })
                }
              }

              const onLeave = () => {
                gsap.to(wordEl, {
                  color: '#ffffff',
                  duration: 0.45,
                  ease: 'power2.out',
                  overwrite: 'auto',
                })
                if (labelName) {
                  gsap.to(labelName, {
                    color: 'rgba(255,255,255,0.85)',
                    duration: 0.45,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }
                if (clickme) {
                  gsap.to(clickme, {
                    color: 'rgba(255,255,255,0.55)',
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }
                if (arrow) {
                  gsap.to(arrow, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  })
                }
              }

              link.addEventListener('mouseenter', onEnter)
              link.addEventListener('mouseleave', onLeave)
              link.addEventListener('focus', onEnter)
              link.addEventListener('blur', onLeave)

              cleanups.push(() => {
                link.removeEventListener('mouseenter', onEnter)
                link.removeEventListener('mouseleave', onLeave)
                link.removeEventListener('focus', onEnter)
                link.removeEventListener('blur', onLeave)
              })
            })

            return () => {
              cleanups.forEach((fn) => fn())
              splits.forEach((s) => s.revert())
              tl.scrollTrigger?.kill()
              tl.kill()
            }
          }
        },
      )

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  const topLeft = byPosition('top-left')
  const topRight = byPosition('top-right')
  const bottomLeft = byPosition('bottom-left')
  const bottomRight = byPosition('bottom-right')

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-md:overflow-x-visible overflow-x-clip max-md:px-5 sm:px-10 md:px-14 lg:px-16 py-8 md:py-16"
    >
      <div className="md:hidden">
        <h2
          aria-label="Product Design"
          className="font-instrumentSans font-bold uppercase tracking-tight text-white text-center leading-[0.88] will-change-transform text-[clamp(2.15rem,11vw,3.35rem)]"
        >
          <span data-pd-mobile-line ref={mobileProductWordRef} className="block">
            Product
          </span>
          <span data-pd-mobile-line ref={mobileDesignWordRef} className="block max-md:mt-1">
            Design
          </span>
        </h2>

        <div className="mt-8 w-full">
          <div
            className={[
              'flex flex-row flex-nowrap gap-7 overflow-x-auto py-2',
              'pl-4 pr-4 -mx-4 snap-x snap-mandatory',
              '[scroll-padding-inline:16px]',
              '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
            ].join(' ')}
          >
            {projects.map((p) => (
              <Link
                key={p.id}
                to={p.href}
                state={productDesignSectionOrigin}
                data-pd-mobile-tile
                data-project-id={p.id}
                aria-label={`${p.client} — ${p.roleTitle}`}
                className="group snap-center shrink-0 flex w-36 flex-col items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md"
              >
                <span
                  className="relative h-36 w-36 shrink-0 overflow-hidden rounded-[4px] shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]"
                  style={{ backgroundColor: p.accent }}
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/15" />
                </span>
                <span className="w-36 space-y-1">
                  <span className="block font-instrumentSans font-semibold uppercase tracking-[0.12em] text-xs sm:text-[0.8125rem] leading-snug text-white/90">
                    {p.client}
                  </span>
                  <span className="block font-instrumentSans font-normal normal-case tracking-normal text-[0.8125rem] sm:text-sm leading-snug text-white/60">
                    {p.roleTitle}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block relative mx-auto max-w-[1500px]">
        <h2
          aria-label="Product Design"
          className="font-instrumentSans font-bold uppercase tracking-tight text-white text-center leading-[0.88] will-change-transform text-[clamp(2.25rem,8.5vw,9.5rem)]"
        >
          <span className="block whitespace-nowrap">
            <ParenSquare project={topLeft} />
            <span ref={productWordRef} className="mx-[0.18em] inline-block align-baseline">
              Product
            </span>
            <ParenSquare project={topRight} />
          </span>

          <span className="block whitespace-nowrap mt-2 lg:mt-4">
            <ParenSquare project={bottomLeft} />
            <span ref={designWordRef} className="mx-[0.18em] inline-block align-baseline">
              Design
            </span>
            <ParenSquare project={bottomRight} />
          </span>
        </h2>
      </div>
    </div>
  )
}
