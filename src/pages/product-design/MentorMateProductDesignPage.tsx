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

import MENTORMATE_GOLF from '../../../source/images/mentormate-golf.png'

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

export function MentorMateProductDesignPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Role · Product Designer · Product Design</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            MentorMate
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Global software company offering end‑to‑end digital transformation services.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="Research" label="User research focus" />
            <ProjectHeroMetricCard value="Service" label="Service design" />
            <ProjectHeroMetricCard value="E‑comm" label="Platform delivery" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="How I worked"
            subtitle="Focused on research and service design—going deep into business context and lived user experiences to build solutions grounded in real needs."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BulletCard
              title="Research & service design"
              bullets={[
                'Interviewed customers, observed behavior, and identified pain points.',
                'Built solutions grounded in real needs rather than assumptions.',
              ]}
            />
            <BulletCard
              title="Constant collaboration"
              bullets={[
                'Balanced user motivations with business goals and technical feasibility.',
                'Worked closely with cross‑functional partners throughout delivery.',
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
                title="E‑commerce platform for golf equipment"
                bullets={[
                  'Designed an experience for serious golfers who care about specs, performance metrics, and fit.',
                  'Researched and mapped golfer personas, success metrics, and evaluation behaviors.',
                  'Launched a platform tested for findability, usability, and product discoverability.',
                ]}
              />
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                <img
                  src={MENTORMATE_GOLF}
                  alt="MentorMate golf e‑commerce platform screens"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="product-design" currentId="mentormate" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

