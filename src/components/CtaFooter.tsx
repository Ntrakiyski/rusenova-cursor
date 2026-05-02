import { ArrowUpRight } from 'lucide-react'

import { HlsBackground } from './HlsBackground'
import { Button } from './ui/button'

const CTA_HLS =
  'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

export function CtaFooter() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HlsBackground
          src={CTA_HLS}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div
        id="get-started"
        className="relative z-10 mx-auto max-w-6xl px-8 py-32 lg:px-16 text-center"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic leading-[0.85] text-white">
          Your next website starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-white/60 font-body font-light text-sm md:text-base">
          Book a free strategy call. See what AI-powered design can do. No
          commitment, no pressure. Just possibilities.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            variant="glassStrong"
            className="h-auto rounded-full px-6 py-3"
          >
            <a href="#get-started">
              Book a Call <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="white" className="h-auto rounded-full px-6 py-3">
            <a href="#pricing">View Pricing</a>
          </Button>
        </div>

        <div className="mt-32 flex items-center justify-between border-t border-white/10 pt-8">
          <div className="text-white/40 text-xs font-body">
            (c) 2026 Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/40 text-xs font-body hover:text-white/70 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

