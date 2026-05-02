import {
  ProjectHeroEyebrow,
  ProjectHeroMetricCard,
  ProjectPageHeroSection,
} from '../../components/ProjectPageHeroSection'
import { CaseStudySectionTitle } from '../../components/CaseStudySectionTitle'
import { ProjectCaseStudyBody } from '../../components/ProjectCaseStudyBody'
import { ContactCtaSection } from '../../components/ContactCtaSection'
import { SnapshotKeepInMindSection } from '../../components/SnapshotKeepInMindSection'
import {
  projectCaseStudyContentColumnClass,
  projectCaseStudySectionClass,
} from '../../config/projectPageArticleLayout'

import TELENOR_EXAMPLE_1 from '../../../source/images/telenor-example1.png'
import TELENOR_EXAMPLE_2 from '../../../source/images/telenor-example2.png'
import TELENOR_HOME from '../../../source/images/telenor-home.png'
import TELENOR_INSURANCE from '../../../source/images/telenor-insurance.png'
import TELENOR_GAMIFICATION from '../../../source/images/telenor-gamification.png'

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

function QuoteBlock({ quote, author, role }: { quote: string; author: string; role?: string }) {
  return (
    <div className="liquid-glass rounded-3xl border border-border p-8 md:p-10">
      <div className="text-foreground/80 font-body text-base md:text-lg leading-relaxed">
        “{quote}”
      </div>
      <div className="mt-5 text-foreground font-instrumentSans font-semibold">{author}</div>
      {role ? <div className="text-foreground/60 font-body text-sm">{role}</div> : null}
    </div>
  )
}

export function TelenorProductDesignPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Role · Service Designer · Product Design</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            Telenor
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Back then Telenor was a telecommunication company with more than{' '}
            <span className="project-hero-emphasis font-medium">1M</span> users.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="3+ yrs" label="Tenure" />
            <ProjectHeroMetricCard value="20+" label="Cross‑platform projects" />
            <ProjectHeroMetricCard value="28%" label="Increase in bill payments" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <section className="bg-background border-t border-border">
          <div className={projectCaseStudyContentColumnClass('py-12')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                <img
                  src={TELENOR_EXAMPLE_1}
                  alt="Telenor example 1"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
                <img
                  src={TELENOR_EXAMPLE_2}
                  alt="Telenor example 2"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()}>
          <QuoteBlock
            quote="It was easy to work with Gloria because she is a communicative and team-oriented individual having customer-first thinking. She helped us not only designing but also defining our products and services."
            author="Stefan Dimitrov"
            role="Head of Digital Sales & Marketing"
          />
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
                title="Homepage redesign"
                bullets={[
                  "My goal was to increase the number of paid bills and activated add-ons. Also, we knew that some users couldn't differentiate between current and updated bill, didn't know how to pay their bill and didn't receive value from seeing their Mins & SMS left.",
                  "Prominent MB tracking and top-up action - Research showed users frequently checked their mobile data. I added a visible MB counter with a quick 'Add MB' button, enabling users to proactively top up before running out.",
                  'Unified bill view with clear separation - Displayed both paid and unpaid bills on the same screen with visual distinction. Users consistently requested visibility into their complete billing history.',
                  'Immediate payment action - Added a direct Pay option for unpaid bills, eliminating the need to navigate to other tabs and reducing friction in the payment flow.',
                  'Achieved 28% increase in bill payments and higher add-on activation rate following the redesign.',
                ]}
              />
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden w-full max-w-[300px] mr-auto">
                <img
                  src={TELENOR_HOME}
                  alt="Telenor homepage redesign"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4">
              <BulletCard
                title="Travel insurance"
                bullets={[
                  'We had to understand the market and then to conduct user interviews - the main objective was to find out if travellers were using travel insurance when they traveled, what was their current experience with insurance, what their needs and frustrations were, so we could design a convenient service.',
                  "We had to think how to create Travel insurance which could be activated for just a few minutes even when the people were already abroad, something which didn't exist on the Bulgarian market yet.",
                  "I designed a travel insurance that doesn't require users to think about it beforehand.",
                  'Instead, it notifies users when they are abroad, and they can decide whether they want to activate coverage.',
                ]}
              />
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden w-full max-w-[300px] mr-auto">
                <img
                  src={TELENOR_INSURANCE}
                  alt="Telenor travel insurance"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-4">
              <BulletCard
                title="Gamification"
                bullets={[
                  'Users were churning after paying their bills. We needed to identify what would bring them back consistently and create lasting value beyond just paying their bills. We had to build an engagement system that gives users a reason to return daily - something valuable enough to become part of their routine, not just another notification to ignore.',
                  'I designed gamified rewards platform where users instantly see their winnings and can share gifts with others.',
                  'This social element turned individual rewards into community connections, increasing daily active users by 12%.',
                ]}
              />
              <div className="liquid-glass rounded-3xl border border-border overflow-hidden w-full">
                <img
                  src={TELENOR_GAMIFICATION}
                  alt="Telenor gamification"
                  className="w-full h-auto object-contain bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="product-design" currentId="telenor" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

