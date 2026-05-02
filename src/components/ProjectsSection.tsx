import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { stateFromHomeSection } from '../lib/navOrigin'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

type Project = {
  title: string
  description: string
  category: string
  year: string
  previewLines: string[]
  hoverTint: string
  href?: string
}

const projects: Project[] = [
  {
    title: 'RAG+ Evaluation System',
    description: 'Reduced information retrieval time by 85% while achieving 92% answer accuracy',
    category: 'AI / Evaluation',
    year: '2026',
    previewLines: ['92% Precision', '89% Response Accuracy'],
    hoverTint: 'bg-[#F38300]',
    href: '/ml/rag-evaluation-system',
  },
  {
    title: 'Fraud Detection System',
    description: 'An AI-powered system that catches 84% of fraud while keeping false alarms under 0.05%',
    category: 'AI / Risk',
    year: '2026',
    previewLines: ['83.8% Fraud Caught', '74% Alert Accuracy'],
    hoverTint: 'bg-[#E9A8E5]',
    href: '/ml/fraud-detection-system',
  },
  {
    title: 'Real time AI Assistant',
    description: 'Real-time AI Meeting agent which reduces meeting follow-up time by 75%',
    category: 'AI / Productivity',
    year: '2026',
    previewLines: ['<2s transcription latency', '90% agenda tracking'],
    hoverTint: 'bg-[#FFDA24]',
    href: '/ml/ai-meeting-assistant',
  },
  {
    title: 'E-Commerce Recommendation System',
    description: 'Machine learning system that matches products to users',
    category: 'ML / E‑commerce',
    year: '2026',
    previewLines: ['50 · 80 users & SKUs', 'NDCG@10 promotion gate'],
    hoverTint: 'bg-[#F44B2F]',
    href: '/ml/recommendation-system',
  },
]

const aiSectionOrigin = stateFromHomeSection('#ai')

function ProjectCard({ project }: { project: Project }) {
  const href = project.href ?? '#get-started'
  const isInternal = href.startsWith('/')
  const className = [
    'group relative block overflow-hidden',
    'bg-white text-black',
    'px-8 py-10 md:px-12 md:py-14',
    'transition-colors duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30',
    'min-h-[600px]',
  ].join(' ')

  const inner = (
    <>
      <div className="relative z-10">
        <div className="text-center">
          <h3 className="font-instrumentSans font-bold tracking-tight text-3xl md:text-4xl leading-[0.95] transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1">
            {project.title}
          </h3>
          <p
            className={[
              'mt-2 text-[11px] md:text-xs font-instrumentSans font-normal',
              'transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-1',
              'text-black/60',
            ].join(' ')}
          >
            {project.description}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center">
          <div
            className={[
              'relative w-full max-w-[560px] aspect-square rounded-2xl',
              'bg-black overflow-hidden',
              'shadow-[0_20px_60px_rgba(0,0,0,0.18)]',
              'transition-transform duration-300 ease-out',
              'group-hover:scale-[1.14]',
            ].join(' ')}
          >
            <div className="absolute inset-0 grid place-items-center text-white transition-all duration-200 group-hover:opacity-0 group-hover:scale-[0.98]">
              <div className="w-full px-10">
                <div className="flex flex-col items-center gap-10 text-center">
                  <div className="text-sm md:text-base font-instrumentSans font-normal">
                    <span className="opacity-90">{project.previewLines[0]}</span>
                  </div>
                  <div className="text-sm md:text-base font-instrumentSans font-normal">
                    <span className="opacity-95">{project.previewLines[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute left-8 top-8 h-14 w-14 rounded-full bg-white/90 grid place-items-center text-black shadow-lg">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="px-10 text-center text-white/95 font-instrumentSans font-bold text-2xl md:text-3xl tracking-tight leading-[0.95]">
                  {project.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={[
          'absolute inset-0 opacity-0 group-hover:opacity-100',
          'transition-opacity duration-300',
          project.hoverTint,
        ].join(' ')}
      />

      <div
        className={[
          'relative z-10 mt-10 flex items-end justify-between text-[10px] uppercase tracking-[0.22em] font-instrumentSans',
          'text-black/55',
        ].join(' ')}
      >
        <span>{project.category}</span>
        <span
          className={[
            'rounded-full border px-3 py-1 text-[10px] tracking-[0.18em] font-instrumentSans',
            'border-black/20 text-black/65',
          ].join(' ')}
        >
          {project.year}
        </span>
      </div>
    </>
  )

  return isInternal ? (
    <Link to={href} state={aiSectionOrigin} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className}>
      {inner}
    </a>
  )
}

export function ProjectsSection() {
  const mlTriggerRef = useRef<HTMLDivElement | null>(null)
  const [mlZoomed, setMlZoomed] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const topPanelRef = useRef<HTMLDivElement | null>(null)
  const bottomPanelRef = useRef<HTMLDivElement | null>(null)
  const headlineRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const mlEl = mlTriggerRef.current
    if (!mlEl) return
    const mlObserver = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) setMlZoomed(true) },
      { threshold: 0 },
    )
    mlObserver.observe(mlEl)
    return () => mlObserver.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const reduced = ctx.conditions?.reduced

          gsap.set('.projects-letter', { yPercent: 120, rotate: 8, opacity: 0 })

          if (reduced) {
            gsap.set([topPanelRef.current, bottomPanelRef.current], { autoAlpha: 0 })
            gsap.set(headlineRef.current, { y: 0, opacity: 1 })
            gsap.to('.projects-letter', {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.4,
              scrollTrigger: { trigger: heroRef.current, start: 'top 75%' },
            })
            return
          }

          // 1) "Projects" letter intro — plays on first view
          gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }).to('.projects-letter', {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: { each: 0.06, from: 'start' },
          })

          // 2) Two-panel white wipe — fires AFTER the Projects hero
          //    as the user scrolls into the content area below it
          gsap.set(topPanelRef.current, { yPercent: -100 })
          gsap.set(bottomPanelRef.current, { yPercent: 100 })

          const wipe = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
            },
          })

          wipe
            .to(topPanelRef.current, { yPercent: 0 }, 0)
            .to(bottomPanelRef.current, { yPercent: 0 }, 0)
            .to(topPanelRef.current, { yPercent: -100 }, 0.55)
            .to(bottomPanelRef.current, { yPercent: 100 }, 0.55)

          // 3) Per-letter reveal (SplitText) — same motion as Product Design.
          //    Trigger when the headline is farther into view so the intro isn’t
          //    lost while fixed white panels still cover the strip (z-60).
          const lineEl = gsap.utils.toArray<HTMLElement>('.headline-line')[0]
          let revertHeadline: (() => void) | undefined
          if (lineEl) {
            const split = SplitText.create(lineEl, {
              type: 'chars',
              smartWrap: true,
              aria: 'auto',
            })

            gsap.set(split.chars, { yPercent: 110, opacity: 0, rotate: 4 })

            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
              scrollTrigger: {
                trigger: headlineRef.current,
                start: 'top 75%',
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

            revertHeadline = () => {
              tl.scrollTrigger?.kill()
              tl.kill()
              split.revert()
            }
          }

          return () => {
            revertHeadline?.()
          }
        },
      )

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  const titleLetters = 'Projects'.split('')

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative scroll-mt-28 bg-[#0a0a0a] text-white"
    >
      <div
        ref={topPanelRef}
        aria-hidden="true"
        data-nav-bg="light"
        className="pointer-events-none fixed left-0 right-0 top-0 h-[50.5vh] bg-white z-[60] will-change-transform"
      />
      <div
        ref={bottomPanelRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 bottom-0 h-[50.5vh] bg-white z-[60] will-change-transform"
      />

      <div className="w-full">
        <div
          ref={heroRef}
          data-nav-bg="dark"
          className="flex items-center justify-center max-md:min-h-[56vh] max-md:px-5 max-md:py-32 md:min-h-screen md:py-0 px-8 lg:px-16"
        >
          <div className="w-full max-md:max-w-[min(100%,28rem)] mx-auto text-center">
            <h2
              aria-label="Projects"
              className="font-instrumentSans font-bold uppercase tracking-tight text-white text-[clamp(2.7rem,11.6vw,4.85rem)] min-[400px]:text-[clamp(2.95rem,10.5vw,5.1rem)] sm:text-7xl md:text-[10rem] lg:text-[13rem] leading-[0.85] will-change-transform max-md:px-2 md:px-1"
            >
              <span className="inline-flex">
                {titleLetters.map((char, i) => (
                  <span
                    key={`${char}-${i}`}
                    aria-hidden="true"
                    className="inline-block overflow-hidden align-baseline pb-[0.12em] -mb-[0.12em]"
                  >
                    <span className="projects-letter inline-block will-change-transform">
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </div>

        <div
          ref={contentRef}
          id="ai"
          data-nav-bg="light"
          className="bg-white text-black"
        >
          <div className="px-8 lg:px-16 max-md:pt-24 max-md:pb-20 pt-28 md:pt-36 pb-28 md:pb-40 text-left">
            <h3
              ref={headlineRef}
              className="font-instrumentSans font-bold uppercase tracking-tight text-black leading-[0.88] will-change-transform text-[clamp(2.15rem,11vw,3.35rem)] md:text-[clamp(2.25rem,8.5vw,9.5rem)]"
            >
              <span className="headline-line block">AI</span>
            </h3>
          </div>

          <div ref={mlTriggerRef} className="h-px w-full" aria-hidden="true" />

          <div className="grid w-full grid-cols-1 md:grid-cols-2 border-t border-b border-black/10">
            {projects.map((p, idx) => (
              <div
                key={p.title}
                className={['border-black/10 border-b', idx % 2 === 0 ? 'md:border-r' : ''].join(' ')}
              >
                <div className={['transition-transform duration-500 ease-out', mlZoomed ? 'scale-100' : 'scale-[0.985]'].join(' ')}>
                  <ProjectCard project={p} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
