import { BarChart3, Palette, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    body: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    body: 'Layouts informed by data. Decisions backed by performance. Results you can measure.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    body: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.',
  },
]

export function FeaturesGrid() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-8 py-28 lg:px-16">
      <div className="flex flex-col items-center text-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          Why Us
        </div>
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          The difference is everything.
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="liquid-glass rounded-2xl p-6">
              <div className="liquid-glass-strong flex h-10 w-10 items-center justify-center rounded-full">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="mt-5 text-white font-body font-medium text-sm">
                {f.title}
              </div>
              <p className="mt-3 text-white/60 font-body font-light text-sm leading-relaxed">
                {f.body}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

