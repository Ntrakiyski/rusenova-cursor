import type { ReactNode } from 'react'

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
import {
  RecommendationScaleChart,
  RecommendationTrafficDonut,
} from './RecommendationSystemCharts'

const recommendationSubtitleClass =
  'mt-4 text-sm md:text-base font-body leading-relaxed text-foreground/70'

function VizShell({
  captionTitle,
  caption,
  children,
}: {
  captionTitle?: string
  caption: ReactNode
  children: ReactNode
}) {
  return (
    <figure className="liquid-glass rounded-3xl border border-border p-6 text-center md:p-8">
      {captionTitle ? (
        <div className="text-sm font-instrumentSans font-semibold text-foreground">{captionTitle}</div>
      ) : null}
      <div className={captionTitle ? 'mt-5 flex flex-col items-center' : 'flex flex-col items-center'}>{children}</div>
      <figcaption className="mt-5 text-center text-sm text-foreground/60 font-body leading-relaxed">{caption}</figcaption>
    </figure>
  )
}

function FlowNode({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={[
        'rounded-xl border border-border bg-black/[0.02] px-4 py-3 text-center text-sm font-body leading-snug text-foreground/90',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function FlowDecision({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-xl border-2 border-dashed border-border bg-foreground/[0.02] px-4 py-3 text-center text-sm font-body font-semibold leading-snug text-foreground',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function ArrowRight() {
  return (
    <div
      className="flex shrink-0 items-center justify-center px-2 text-lg text-foreground/30 md:px-3"
      aria-hidden
    >
      →
    </div>
  )
}

function ArrowDown() {
  return (
    <div className="flex justify-center py-1 text-lg text-foreground/30 md:py-2" aria-hidden>
      ↓
    </div>
  )
}

function DiagramNarrativeTension() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
        <FlowNode>Thin histories &amp; cold starts</FlowNode>
        <ArrowRight />
        <FlowNode>Irrelevant ranks</FlowNode>
        <ArrowRight />
        <FlowNode>Trust fades</FlowNode>
      </div>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-center">
        <FlowNode>Governed data · hybrid models · quality gates · logs</FlowNode>
        <ArrowRight />
        <FlowNode>Safer relevance &amp; accountable change</FlowNode>
      </div>
    </div>
  )
}

function DiagramPipeline() {
  const steps = [
    'Governance & identities',
    'Bronze ingest & EDA',
    'Streaming simulation',
    'DLT medallion pipeline',
    'Feature Store registration',
    'Hybrid ML & MLflow',
    'Registry & promotion gate',
    'Serving & inference logs',
    'Workflow automation',
    'Monitoring & dashboard',
  ]
  return (
    <div className="mx-auto flex max-w-xl flex-col items-stretch">
      {steps.map((label, i) => (
        <div key={label}>
          <FlowNode>{label}</FlowNode>
          {i < steps.length - 1 ? <ArrowDown /> : null}
        </div>
      ))}
    </div>
  )
}

function DiagramHybrid() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <FlowNode>Collaborative signal</FlowNode>
          <ArrowDown />
        </div>
        <div className="flex flex-col items-center gap-3">
          <FlowNode>Content similarity</FlowNode>
          <ArrowDown />
        </div>
      </div>
      <div className="flex justify-center">
        <FlowNode>Blend · search α</FlowNode>
      </div>
      <ArrowDown />
      <div className="flex justify-center">
        <FlowNode>Hybrid scores</FlowNode>
      </div>
      <div className="flex flex-col items-center gap-3 border-t border-border pt-8">
        <FlowNode>Cold-start fallbacks</FlowNode>
        <ArrowDown />
        <FlowNode>Hybrid scores</FlowNode>
      </div>
    </div>
  )
}

function DiagramGate() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-stretch">
      <FlowNode>Challenger artifact ready</FlowNode>
      <ArrowDown />
      <FlowDecision>NDCG@10 strictly beats champion?</FlowDecision>
      <div className="grid grid-cols-1 gap-10 pt-8 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col items-center gap-2">
          <ArrowDown />
          <FlowNode>Promote · retain previous champion alias</FlowNode>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ArrowDown />
          <FlowNode>Hold champion · no deploy</FlowNode>
        </div>
      </div>
    </div>
  )
}

function DiagramWeekly() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-stretch">
      <FlowNode>DLT refresh</FlowNode>
      <ArrowDown />
      <FlowNode>Feature publish</FlowNode>
      <ArrowDown />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FlowNode>Train ALS</FlowNode>
        <FlowNode>Train content</FlowNode>
      </div>
      <ArrowDown />
      <FlowNode>Train hybrid</FlowNode>
      <ArrowDown />
      <FlowNode>Promotion flag</FlowNode>
      <ArrowDown />
      <FlowDecision>Branch</FlowDecision>
      <div className="grid grid-cols-1 gap-12 pt-10 sm:grid-cols-2 sm:gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="text-center text-xs font-medium uppercase tracking-wider text-foreground/50">
            Promote allowed
          </div>
          <ArrowDown />
          <FlowNode>Promotion gate</FlowNode>
          <ArrowDown />
          <FlowNode>Serving update</FlowNode>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-center text-xs font-medium uppercase tracking-wider text-foreground/50">Skip</div>
          <ArrowDown />
          <FlowNode>Skip promote</FlowNode>
        </div>
      </div>
    </div>
  )
}

function DiagramObservability() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-14">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-6">
        <FlowNode>Serving endpoint</FlowNode>
        <ArrowRight />
        <FlowNode>Inference payloads</FlowNode>
        <ArrowRight />
        <FlowNode>Lakehouse Monitoring</FlowNode>
        <ArrowRight />
        <FlowNode>Dashboard app</FlowNode>
      </div>
      <div className="flex flex-col items-center gap-4 border-t border-border pt-10">
        <FlowNode>Gold features</FlowNode>
        <ArrowDown />
        <FlowNode>Lakehouse Monitoring</FlowNode>
      </div>
    </div>
  )
}

export function RecommendationSystemPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Use case</ProjectHeroEyebrow>

          <h1 className="mt-6 text-balance text-4xl md:text-5xl lg:text-6xl font-instrumentSans font-bold tracking-tight leading-[0.95]">
            Product recommendation system on Databricks
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Governed data and hybrid ML on Databricks that turns shopper behavior into ranked suggestions
            via a live REST API, with automated retraining, promotion checks so worse models don’t ship,
            and logged traffic for monitoring.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ProjectHeroMetricCard value="50 · 80" label="Users and products (documented showcase)" />
            <ProjectHeroMetricCard value="~10.2k" label="Historical interactions (~10,186)" size="md" />
            <ProjectHeroMetricCard value="90 / 10" label="Champion vs challenger routing intent" size="md" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
          <ProjectCaseStudyBody>
          <section id="pain" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Where naive recommendation rollouts fail"
              subtitle="Most shoppers never scroll far. When suggestions feel arbitrary—or when nobody can explain why the ranking changed last week—confidence in the product drops faster than any single bad recommendation. The business question is not only “turn on recommendations,” but how to keep relevance for loyal shoppers, behave sensibly for new or thin profiles, and ship updates without silent regressions."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="The narrative tension"
                caption={
                  <>
                    Sparse signals and cold-start gaps erode trust; the program offsets that with governance, blending strategies,
                    explicit promotion rules, and telemetry—not with a one-off model notebook.
                  </>
                }
              >
                <DiagramNarrativeTension />
              </VizShell>
            </div>
          </section>

          <section id="why-recsys" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Why a recommendation system"
              subtitle="Collaborative filtering alone struggles when histories are short and catalogs are small. This initiative treats recommendations as a lifecycle: data that stays trustworthy, features that register as contracts, models that declare how cold-start is handled, and deployment paths that refuse to ship obvious ranking regressions."
              subtitleClassName={recommendationSubtitleClass}
            />
          </section>

          <section id="scale" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Showcase scale"
              subtitle="The reference dataset is intentionally modest—enough to expose sparsity rather than hide it. The bars below use a logarithmic vertical scale so both the catalog counts and the larger historical interaction volume stay readable on one chart; exact figures match the executive technical review."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="Recorded entity and event counts"
                caption={
                  <>
                    Users <strong className="text-foreground font-semibold">50</strong>, products{' '}
                    <strong className="text-foreground font-semibold">80</strong>, recent interactions{' '}
                    <strong className="text-foreground font-semibold">251</strong>,
                    historical interactions{' '}
                    <strong className="text-foreground font-semibold">~10,186</strong>. Log scale prevents the historical bar from swallowing the others.
                  </>
                }
              >
                <RecommendationScaleChart />
              </VizShell>
            </div>

          </section>

          <section id="arc" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="End-to-end arc executives can recognize"
              subtitle="Identity and catalog governance landed first so every later step inherited the same boundaries. Bronze ingestion and exploratory analysis anchored how “interest” is weighted before Gold tables were finalized. Streaming simulation stood in for Kafka without rewriting downstream logic; Delta Live Tables folded batch history and live-shaped events into one observable pipeline."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="From substrate to steering committee"
                caption={
                  <>
                    Each stage unlocked the next: registered features tied training to lineage; the registry gate connected metrics to ship/no-ship;
                    workflows added branching so weekly retrains do not automatically bless a weaker ranker.
                  </>
                }
              >
                <DiagramPipeline />
              </VizShell>
            </div>
          </section>

          <section id="hybrid" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Hybrid scoring and cold-start on purpose"
              subtitle="Collaborative signal (ALS-style with an implementation path suited to serverless constraints), content similarity from product-side features, and a tunable blend with grid-searched mixing weights address the “small sparse catalog” reality instead of pretending it away. Separate cold-start helpers make behavior for unknown users or SKUs explicit before serving, not after complaints arrive."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="Where the approaches meet"
                caption={
                  <>
                    α is tuned with documented grid search; nested MLflow runs preserve how each candidate blend was chosen.
                  </>
                }
              >
                <DiagramHybrid />
              </VizShell>
            </div>
          </section>

          <section id="metrics-suite" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="What “better” means in the evaluation suite"
              subtitle="Ranking quality and diversity are tracked across multiple standard metrics; they inform experiments and narrative, while the registry gate below turns one ranking criterion into an operational veto."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="Metrics named in the program documentation"
                caption="No headline uplift numbers are asserted here—tie external revenue claims to your own experimentation layer."
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" role="list">
                  {['NDCG@k', 'Precision@10', 'Recall@10', 'MAP', 'Coverage', 'Diversity'].map((m) => (
                    <div
                      key={m}
                      role="listitem"
                      className="rounded-lg border border-border bg-black/[0.02] px-3 py-2.5 text-center font-mono text-xs text-foreground/80"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </VizShell>
            </div>
          </section>

          <section id="gate" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Promotion only when ranking quality strictly improves"
              subtitle="Challengers advance to the champion alias only when NDCG@10 strictly beats the incumbent; the previous champion alias remains for rollback. That converts experiment output into a leadership-readable guarantee: training can finish without automatically rewriting production behavior."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="Ship / hold decision"
                caption="Regression notebooks explicitly show inferior challengers failing the gate—evidence you can walk through with risk owners."
              >
                <DiagramGate />
              </VizShell>
            </div>
          </section>

          <section id="traffic" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Serving posture and intended traffic split"
              subtitle="The managed REST endpoint logs inference payloads for downstream monitoring; cold-start behavior mirrors the training-era helpers. Configuration encodes a 90% champion / 10% challenger intent, while verification notes that live traffic may remain on a single stable version until both artifact paths are healthy—a stability-first nuance worth stating to executives upfront."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <VizShell
                captionTitle="Configured routing intent"
                caption="Repository configuration expresses the champion/challenger mix; operations may temporarily route 100% to a known-good build."
              >
                <RecommendationTrafficDonut />
              </VizShell>
              <VizShell
                captionTitle="Weekly heavy-path runtime (documented)"
                caption="Verification leaned on selective runs rather than always exercising promote-and-deploy."
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl border border-border bg-black/[0.02] px-5 py-5">
                    <div className="font-instrumentSans text-2xl font-bold tracking-tight text-foreground">15–60+</div>
                    <div className="mt-2 text-xs font-body leading-relaxed text-foreground/65">
                      minutes cited for full orchestrated paths—plan reviews and support windows accordingly.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-black/[0.02] px-5 py-5">
                    <div className="font-instrumentSans text-2xl font-bold tracking-tight text-foreground">Branching</div>
                    <div className="mt-2 text-xs font-body leading-relaxed text-foreground/65">
                      Training tasks can complete without auto-promoting when the gate says hold.
                    </div>
                  </div>
                </div>
              </VizShell>
            </div>
          </section>

          <section id="ops" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Automation without blind deploys"
              subtitle="Asset bundles describe weekly jobs that refresh the lakehouse pipeline, republish features, train collaborative and content paths in parallel, blend the hybrid, derive a promotion flag, and branch—only the passing path hits the registry gate and serving refresh. Daily jobs cover incremental pipeline plus feature refresh between heavier retrains."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12 overflow-x-auto">
              <VizShell
                captionTitle="Weekly skeleton leadership cares about"
                caption="Parallel trainers shorten wall-clock time; the conditional branch is the control lever between experimentation velocity and production safety."
              >
                <div className="min-w-[280px]">
                  <DiagramWeekly />
                </div>
              </VizShell>
            </div>
          </section>

          <section id="observe" className={projectCaseStudySectionClass()}>
            <CaseStudySectionTitle
              title="Closing the loop for operators"
              subtitle="Lakehouse Monitoring profiles inference traffic and Gold feature tables into drift-oriented metrics consumed by SQL views and a multi-page Streamlit app. Without inference logging as a first-class dataset, “how is the model doing?” collapses into anecdote—here it stays grounded in tables executives can audit."
              subtitleClassName={recommendationSubtitleClass}
            />
            <div className="mt-12">
              <VizShell
                captionTitle="Observability spine"
                caption="The same logs that power drift checks also feed stakeholder-facing pages—live recommendations, model performance, pipeline health, and catalog signals."
              >
                <DiagramObservability />
              </VizShell>
            </div>
          </section>

          </ProjectCaseStudyBody>

          <SnapshotKeepInMindSection category="ml" currentId="ecom" />

          <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}
