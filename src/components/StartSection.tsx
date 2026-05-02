import { ArrowUpRight } from 'lucide-react'

import { HlsBackground } from './HlsBackground'
import { Button } from './ui/button'

const START_HLS =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

export function StartSection() {
  return (
    <section id="services" className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HlsBackground
          src={START_HLS}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-6xl flex-col items-center justify-center px-8 py-28 lg:px-16 text-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          How It Works
        </div>
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] text-white">
          You dream it. We ship it.
        </h2>
        <p className="mt-5 max-w-2xl text-white/60 font-body font-light text-sm md:text-base">
          Share your vision. Our AI handles the rest--wireframes, design, code,
          launch. All in days, not quarters.
        </p>

        <Button
          asChild
          variant="glassStrong"
          className="mt-8 rounded-full px-6 py-3 h-auto"
        >
          <a href="#get-started">
            Get Started <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}

