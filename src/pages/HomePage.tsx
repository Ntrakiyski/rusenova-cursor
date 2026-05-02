import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { Hero } from '../components/Hero'
import { AboutSection } from '../components/AboutSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { ProductDesignRows } from '../components/ProductDesignRows'
import { ServicesList } from '../components/ServicesList'
import { WhyCardsZoomSection } from '../components/WhyCardsZoomSection'
import { ContactCtaSection } from '../components/ContactCtaSection'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function HomePage() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop only: pinning + `pinSpacing: false` fights touch momentum and
      // mobile dynamic viewport (URL bar / safe areas), producing scroll jitter.
      // ServicesList pins only from `md` up — mirror that breakpoint here.
      mm.add(
        '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
        () => {
        // Pin the hero in place while the next section (ServicesList) scrolls
        // up over it. `pinType: 'transform'` translates the hero rather than
        // taking it out of flow, and `pinSpacing: false` keeps the document
        // height unchanged so the section after the hero glides over it at a
        // natural 1:1 scroll rate.
        const pin = ScrollTrigger.create({
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          pinType: 'transform',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        })

        return () => pin.kill()
        },
      )
    },
    { scope: containerRef },
  )

  // Nav renders in App (SiteLayout) only.
  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a]">
      <div className="relative z-10">
        <Hero />
        <div className="relative z-10">
          <ServicesList />
        </div>
        <div className="relative z-10 bg-[#0a0a0a]">
          <ProjectsSection />
          <ProductDesignRows />
          <WhyCardsZoomSection />
          <AboutSection />
          <ContactCtaSection />
        </div>
      </div>
    </div>
  )
}

