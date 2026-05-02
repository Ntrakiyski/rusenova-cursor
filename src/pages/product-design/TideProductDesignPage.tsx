import {
  ProjectHeroEyebrow,
  ProjectHeroMetricCard,
  ProjectPageHeroSection,
} from '../../components/ProjectPageHeroSection'
import { CaseStudySectionTitle } from '../../components/CaseStudySectionTitle'
import { ProjectCaseStudyBody } from '../../components/ProjectCaseStudyBody'
import { ContactCtaSection } from '../../components/ContactCtaSection'
import { SnapshotKeepInMindSection } from '../../components/SnapshotKeepInMindSection'
import { projectCaseStudySectionClass } from '../../config/projectPageArticleLayout'

import TIDE_COMMS from '../../../source/images/tide-coms.png'
import TIDE_ADMIN_1 from '../../../source/images/tide-admin-1.png'
import TIDE_ADMIN_2 from '../../../source/images/tide-admin-2.png'
import TIDE_ADMIN_3 from '../../../source/images/tide-admin-3.png'
import TIDE_HOME_1 from '../../../source/images/tide-home-1.png'
import TIDE_HOME_2 from '../../../source/images/tide-home-2.png'
import TIDE_HOME_3 from '../../../source/images/tide-home-3.png'

function BulletCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="liquid-glass rounded-2xl border border-border p-6 md:p-8">
      <div className="text-foreground font-instrumentSans font-semibold text-lg">{title}</div>
      <ul className="mt-4 space-y-2 text-foreground/65 font-body text-sm leading-relaxed">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TideProductDesignPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Role · Senior Product Designer · Product Design</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            Tide
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Tide is transforming SME banking &amp; business management with{' '}
            <span className="project-hero-emphasis font-medium">1.6M+</span> members across the UK,
            India, Germany &amp; France.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="1.6M+" label="Members" />
            <ProjectHeroMetricCard value="4" label="Markets" />
            <ProjectHeroMetricCard value="10–30%" label="Engagement lift (experiments)" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="How I worked"
            subtitle="Experience Foundation squad work that cut across product areas—improving the core experience without disrupting existing workflows."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BulletCard
              title="Cross‑functional squad"
              bullets={[
                'Worked in Experience Foundation team—initiatives across multiple squads.',
                'Enabled other teams to ship faster with shared patterns and frameworks.',
              ]}
            />
            <BulletCard
              title="Constant collaboration"
              bullets={[
                'Partnered with engineering, product, marketing, and design.',
                'Balanced user needs with business goals and technical constraints.',
              ]}
            />
          </div>
        </section>

        <section id="selected-work" className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            eyebrow="Selected work"
            title="Projects"
            subtitle="Featured below are select projects from my broader portfolio. Happy to dive deeper into specific work."
          />

          <div className="mt-10 space-y-10">
            <div className="space-y-4">
              <BulletCard
                title="Communication framework"
                bullets={[
                  'Messages were being sent across multiple channels with no consistent structure, creating noise for users and complexity for teams. Different systems handled different message types, and there was no shared approach for prioritizing what users needed to see.',
                  'Built a company‑wide framework for categorizing, prioritizing, and delivering messages.',
                  'Mapped and analyzed every message type across product areas to identify user impact patterns.',
                  'Designed a decision‑tree system for priority, placement, timing, and UI treatment.',
                  'Shipped a scalable framework adopted company‑wide; experiments drove 10–30% engagement increase.',
                ]}
              />
              <div className="liquid-glass mx-auto w-full max-w-3xl rounded-3xl border border-border overflow-hidden">
                <img
                  src={TIDE_COMMS}
                  alt="Tide communication framework"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4">
              <BulletCard
                title="Admin"
                bullets={[
                  'Users struggled to find, access, and use specific products like accounting, invoicing and expenses. We had to improve the discoverability and findability of the products without requiring major changes to existing product areas - making these features discoverable and accessible.',
                  'Improved discoverability of accounting, invoicing, and expenses without major IA disruption.',
                  'Designed an intuitive entry point integrated into existing product architecture.',
                  'Increased active usage of invoicing by 23% (and lifted accounting usage via research-driven decisions).',
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_ADMIN_1}
                    alt="Tide admin example 1"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_ADMIN_2}
                    alt="Tide admin example 2"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_ADMIN_3}
                    alt="Tide admin example 3"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <BulletCard
                title="Home page redesign"
                bullets={[
                  'The home page needed to surface the most important daily information for small business owners while balancing competing priorities from multiple product teams - all without overwhelming users.',
                  'Mapped critical daily info and temporal relevance by user type.',
                  'Conducted iterative research/testing to identify what drove daily decisions and delight.',
                  'Created a prioritization framework balancing user needs with business goals.',
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_HOME_1}
                    alt="Tide home redesign example 1"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_HOME_2}
                    alt="Tide home redesign example 2"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={TIDE_HOME_3}
                    alt="Tide home redesign example 3"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="product-design" currentId="tide" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

