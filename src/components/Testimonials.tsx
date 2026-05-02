const testimonials = [
  {
    quote:
      "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: 'Sarah Chen',
    role: 'CEO, Luminary',
  },
  {
    quote:
      "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: 'Marcus Webb',
    role: 'Head of Growth, Arcline',
  },
  {
    quote:
      "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: 'Elena Voss',
    role: 'Brand Director, Helix',
  },
]

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-8 py-28 lg:px-16">
      <div className="flex flex-col items-center text-center">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          What They Say
        </div>
        <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Don't take our word for it.
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="liquid-glass rounded-2xl p-8">
            <p className="text-white/80 font-body font-light text-sm italic leading-relaxed">
              “{t.quote}”
            </p>
            <div className="mt-6 text-white font-body font-medium text-sm">
              {t.name}
            </div>
            <div className="mt-1 text-white/50 font-body font-light text-xs">
              {t.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

