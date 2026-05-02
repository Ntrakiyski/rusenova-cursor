import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

import { FOOTER_SOCIAL_LINKS } from '../config/footerSocial'
import { stateFromHomeSection, type NavOriginLocationState } from '../lib/navOrigin'

const aiProjects: { label: string; to?: string; externalHref?: string }[] = [
  { label: 'RAG+ Evaluation System', to: '/ml/rag-evaluation-system' },
  { label: 'Fraud Detection System', to: '/ml/fraud-detection-system' },
  { label: 'Real time AI Assistant', to: '/ml/ai-meeting-assistant' },
  { label: 'E-Commerce Recommendation System', to: '/ml/recommendation-system' },
]

const productDesignProjects: { label: string; to: string }[] = [
  { label: 'Tide — Senior Product Designer', to: '/product-design/tide' },
  { label: 'Telenor — Service Designer', to: '/product-design/telenor' },
  { label: 'EPAM — Lead Product Designer', to: '/product-design/epam' },
  { label: 'MentorMate — Product Designer', to: '/product-design/mentormate' },
]

function FooterLink({
  label,
  to,
  externalHref,
  state,
}: {
  label: string
  to?: string
  externalHref?: string
  state?: NavOriginLocationState
}) {
  const className =
    'block font-instrumentSans text-sm text-white/65 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline'

  if (to) {
    return (
      <Link to={to} state={state} className={className}>
        {label}
      </Link>
    )
  }
  if (externalHref) {
    return (
      <a href={externalHref} className={className}>
        {label}
      </a>
    )
  }
  return <span className="block font-instrumentSans text-sm text-white/45">{label}</span>
}

export function SiteFooter() {
  const { github, linkedin, email } = FOOTER_SOCIAL_LINKS

  return (
    <footer
      id="site-footer"
      data-nav-bg="dark"
      className="border-t border-white/[0.08] bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto max-w-6xl px-8 py-14 lg:px-16 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-instrumentSans text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              AI
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {aiProjects.map((p) => (
                <li key={p.label}>
                  <FooterLink
                    label={p.label}
                    to={p.to}
                    externalHref={p.externalHref}
                    state={p.to ? stateFromHomeSection('#ai') : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-instrumentSans text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              Product Design
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {productDesignProjects.map((p) => (
                <li key={p.to}>
                  <FooterLink label={p.label} to={p.to} state={stateFromHomeSection('#product-design')} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-10">
          <nav aria-label="About and contact" className="flex flex-wrap gap-x-8 gap-y-3">
            <FooterLink label="About" to="/#about" state={stateFromHomeSection('#about')} />
            <FooterLink label="Contact" to="/#contact" state={stateFromHomeSection('#contact')} />
          </nav>

          <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-white/[0.08] pt-10 sm:flex-row sm:items-center">
            <p className="font-instrumentSans text-xs text-white/40">
              © {new Date().getFullYear()} Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/85 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F38300]/60"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" strokeWidth={2} />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/85 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F38300]/60"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" strokeWidth={2} />
              </a>
              <a
                href={email}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white/85 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F38300]/60"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
