import type { ReactNode } from 'react'

export function ProjectPageHeroSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]" data-nav-bg="dark">
      <div className="relative mx-auto max-w-6xl px-8 pt-20 pb-14 lg:px-16 [&_h1]:text-zinc-50 [&_.project-hero-lead]:text-zinc-400 [&_.project-hero-lead_.project-hero-emphasis]:text-zinc-100">
        {children}
      </div>
    </section>
  )
}

export function ProjectHeroEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs font-medium font-body text-zinc-400">{children}</div>
  )
}

export function ProjectHeroMetricCard({
  value,
  label,
  size = 'lg',
}: {
  value: string
  label: string
  size?: 'lg' | 'md'
}) {
  const valueCls = size === 'lg' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
      <div className={`font-instrumentSans font-bold tracking-tight text-zinc-50 ${valueCls}`}>
        {value}
      </div>
      <div className="mt-1 text-sm font-body text-zinc-400">{label}</div>
    </div>
  )
}
