import { ArrowUpRight } from 'lucide-react'

import feature1 from '../assets/feature-1.gif'
import feature2 from '../assets/feature-2.gif'
import { Button } from './ui/button'

export function FeaturesChess() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-8 py-28 lg:px-16">
      <div className="flex flex-col items-center text-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          Capabilities
        </div>
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Pro features. Zero complexity.
        </h2>
      </div>

      <div className="mt-16 space-y-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.95]">
              Designed to convert. Built to perform.
            </h3>
            <p className="mt-4 text-white/60 font-body font-light text-sm md:text-base max-w-xl">
              Every pixel is intentional. Our AI studies what works across
              thousands of top sites--then builds yours to outperform them all.
            </p>
            <Button
              asChild
              variant="glassStrong"
              className="mt-7 h-auto rounded-full px-6 py-3"
            >
              <a href="#process">
                Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="liquid-glass rounded-2xl overflow-hidden">
            <img
              src={feature1}
              alt="Feature preview 1"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1 liquid-glass rounded-2xl overflow-hidden">
            <img
              src={feature2}
              alt="Feature preview 2"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-[0.95]">
              It gets smarter. Automatically.
            </h3>
            <p className="mt-4 text-white/60 font-body font-light text-sm md:text-base max-w-xl">
              Your site evolves on its own. AI monitors every click, scroll, and
              conversion--then optimizes in real time. No manual updates. Ever.
            </p>
            <Button
              asChild
              variant="glassStrong"
              className="mt-7 h-auto rounded-full px-6 py-3"
            >
              <a href="#process">
                See how it works <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

