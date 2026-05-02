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

import EPAM_ECOM_1 from '../../../source/images/epam-ecom-1.png'
import EPAM_ECOM_2 from '../../../source/images/epam-ecom-2.png'
import EPAM_ECOM_3 from '../../../source/images/epam-ecom-3.png'

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

export function EpamProductDesignPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Role · Lead Product Designer · Product Design</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            EPAM
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            EPAM specializes in software engineering services, digital platform engineering, and
            digital product design.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="Multi" label="Client projects" />
            <ProjectHeroMetricCard value="E‑comm" label="Complex systems" />
            <ProjectHeroMetricCard value="Community" label="Design leadership" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Service design philosophy"
            subtitle="Balanced hands‑on delivery across multiple client projects with building an internal design community—organizing learning, mentoring designers, and strengthening practice across the company."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BulletCard
              title="Multiple client projects"
              bullets={[
                'Led product design across multiple client engagements.',
                'Shipped complex e‑commerce experiences under real delivery constraints.',
              ]}
            />
            <BulletCard
              title="Mentoring designers"
              bullets={[
                'Organized conferences and facilitated learning activities.',
                'Built mentorship structures connecting designers across locations and projects.',
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
                title="White label e‑commerce platform"
                bullets={[
                  'Major clothing and cosmetics brands needed a flexible e-commerce platform that could accommodate vastly different approaches to product presentation, communication styles, and customer journeys - all while maintaining a cohesive technical foundation.',
                  "We had to design a white label system covering the full purchase flow - from product discovery through checkout - that could adapt to each brand's unique needs without requiring custom development for every client.",
                  'Identified the core patterns that remained consistent across brands versus the elements that needed flexibility.',
                  'We designed modular components that could be configured rather than redesigned for each implementation.',
                  'Delivered a scalable white label platform that successfully served multiple customers.',
                ]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={EPAM_ECOM_1}
                    alt="EPAM e-commerce example 1"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={EPAM_ECOM_2}
                    alt="EPAM e-commerce example 2"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
                <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                  <img
                    src={EPAM_ECOM_3}
                    alt="EPAM e-commerce example 3"
                    className="w-full h-auto object-contain bg-black/[0.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <BulletCard
              title="Design community leadership"
              bullets={[
                'Designers across the company were working in silos with limited opportunities to learn from each other, share best practices, or build connections across projects and locations.',
                'I had to build a thriving design community by creating consistent touchpoints for learning, collaboration, and professional growth - making design practice stronger across the organization.',
                'Led and organized company-wide design conferences.',
                'Facilitated learning activities and workshops.',
                'Built mentorship structures that connected designers across the organization - elevating the design practice at the company.',
              ]}
            />
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="product-design" currentId="epam" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

