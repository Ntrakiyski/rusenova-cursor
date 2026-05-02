import { HlsBackground } from './HlsBackground'

const STATS_HLS =
  'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const stats = [
  { value: '200+', label: 'Sites launched' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '5 days', label: 'Average delivery' },
]

export function Stats() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <HlsBackground
          src={STATS_HLS}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'saturate(0)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8 py-28 lg:px-16">
        <div className="liquid-glass rounded-3xl p-12 md:p-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-white/60 font-body font-light text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

