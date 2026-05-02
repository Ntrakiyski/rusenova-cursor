import { ArrowRight } from 'lucide-react'

/** Match `Hero` contact targets */
const CONTACT_EMAIL = 'gloriarusenova@gmail.com'

export function ContactCtaSection() {
  return (
    <section id="contact" className="relative">
      <div
        data-nav-bg="light"
        className="relative overflow-hidden bg-[#E8E8E8] px-4 pb-28 pt-28 text-neutral-950 sm:px-6 sm:pb-32 sm:pt-32 lg:px-12 lg:pb-40 lg:pt-40"
      >
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_min(100%,20rem)] lg:gap-16 lg:items-center">
            <div>
              <p className="font-instrumentSans text-[clamp(2.75rem,9vw,6.25rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]">
                Let&apos;s work
              </p>
              <p className="mt-2 font-instrumentSans text-[clamp(2.75rem,9vw,6.25rem)] font-black uppercase leading-[0.88] tracking-[-0.02em]">
                Together
              </p>
            </div>

            <div className="max-w-md lg:justify-self-end">
              <p className="font-instrumentSans text-sm font-medium leading-relaxed text-neutral-900 sm:text-base">
                I build solutions using machine learning engineering, data science,
                and product design — end to end.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-8 inline-flex items-center gap-2 font-instrumentSans text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-950 transition-opacity hover:opacity-65 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20"
              >
                Say hello
                <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
