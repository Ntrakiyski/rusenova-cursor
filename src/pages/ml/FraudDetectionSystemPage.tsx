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

import FRAUD_DETECTION_VIDEO from '../../../source/fraud-detection-video.mov'

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="liquid-glass rounded-2xl border border-border px-6 py-6">
      <div className="text-4xl md:text-5xl font-instrumentSans font-bold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-sm font-body text-foreground/60">{label}</div>
    </div>
  )
}

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

function FeatureMini({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="liquid-glass rounded-2xl border border-border p-6">
      <div className="text-foreground font-instrumentSans font-semibold">{title}</div>
      <div className="mt-2 text-foreground/60 font-body text-sm leading-relaxed">{desc}</div>
    </div>
  )
}

function SplitBlock({
  title,
  subtitle,
  bullets,
}: {
  title: string
  subtitle: string
  bullets: string[]
}) {
  return (
    <div className="liquid-glass rounded-3xl border border-border p-8 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div className="text-foreground font-instrumentSans font-bold text-2xl md:text-3xl tracking-tight">
            {title}
          </div>
          <div className="mt-3 text-foreground/60 font-body text-sm leading-relaxed">{subtitle}</div>
        </div>
        <div className="lg:col-span-7">
          <ul className="space-y-3 text-foreground/70 font-body text-sm leading-relaxed">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/45" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="liquid-glass rounded-2xl border border-border p-6">
      <div className="text-sm font-body text-foreground/60">{label}</div>
      <div className="mt-2 text-2xl md:text-3xl font-instrumentSans font-bold tracking-tight text-foreground">
        {value}
      </div>
    </div>
  )
}

function AlgoRow({
  algo,
  recall,
  precision,
  roc,
  status,
  highlight,
}: {
  algo: string
  recall: string
  precision: string
  roc: string
  status: string
  highlight?: boolean
}) {
  return (
    <div
      className={[
        'grid grid-cols-12 gap-3 items-center rounded-2xl border px-5 py-4',
        highlight ? 'border-foreground/20 bg-foreground/[0.03]' : 'border-border bg-transparent',
      ].join(' ')}
    >
      <div className="col-span-5 font-instrumentSans font-semibold text-foreground">{algo}</div>
      <div className="col-span-2 text-sm font-body text-foreground/70">{recall}</div>
      <div className="col-span-2 text-sm font-body text-foreground/70">{precision}</div>
      <div className="col-span-2 text-sm font-body text-foreground/70">{roc}</div>
      <div className="col-span-1 text-[11px] font-body text-foreground/60 text-right">{status}</div>
    </div>
  )
}

export function FraudDetectionSystemPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Case study · ML Engineering · Fraud</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            Fraud Detection System
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            An AI-powered system that catches{' '}
            <span className="project-hero-emphasis font-medium">84% of fraud</span> while keeping
            false alarms under{' '}
            <span className="project-hero-emphasis font-medium">0.05%</span>, deployed in{' '}
            <span className="project-hero-emphasis font-medium">{'<50ms'}</span>.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="2.7M" label="Annual Savings" />
            <ProjectHeroMetricCard value="83.8%" label="Fraud Caught" />
            <ProjectHeroMetricCard value="75.2%" label="Alert Accuracy" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()} aria-label="Fraud dashboard demo video">
          <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
            <video
              className="aspect-[16/7] w-full object-cover"
              src={FRAUD_DETECTION_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="What I Built"
            subtitle="A fraud detection system to test feature performance across multiple algorithms and optimize for the highest fraud detection rate—without overwhelming analysts with false alarms."
          />
          <div className="mt-10 space-y-4">
            <BulletCard
              title="Imbalanced data reality"
              bullets={[
                'Credit card fraud costs businesses $32B annually, yet only 0.17% of transactions are fraudulent.',
                'Extreme imbalance makes many approaches either miss fraud or create too many false positives.',
              ]}
            />
            <BulletCard
              title="Feature-first strategy"
              bullets={[
                'Engineered features to surface “what makes a transaction suspicious.”',
                'Focused on interpretable risk patterns before model selection.',
              ]}
            />
            <BulletCard
              title="Business translation"
              bullets={[
                'Converted model metrics into cost-benefit outcomes.',
                'Segment analysis to understand strengths and weaknesses.',
              ]}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Selecting the Right Approach"
            subtitle="Instead of jumping straight to algorithms, I started with a human question: “What makes a transaction suspicious?” That framed the system design."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureMini title="Data analyses" desc="Analyzed 284K transactions to uncover risk patterns." />
            <FeatureMini title="Feature engineering" desc="Created 21 custom features using domain knowledge + statistics." />
            <FeatureMini title="Algorithm testing" desc="Compared three algorithms and selected XGBoost." />
            <FeatureMini title="Business results" desc="Calculated $2.7M annual value + segment analysis by threshold." />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Data Analyses" subtitle="Key signals discovered in the dataset." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatLine label="Transactions" value="Analyzed 284K transactions over 2 days" />
            <StatLine label="Outliers" value="Isolation Forest outliers had 217× fraud concentration" />
            <StatLine label="High risk" value="Night transactions = 3× higher risk" />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Feature Engineering"
            subtitle="Created 21 custom features in 3 tiers. Top engineered feature (pca_magnitude) became #1 most important (34.5% model weight)."
          />
          <div className="mt-10 space-y-4">
            <SplitBlock
              title="Statistical"
              subtitle="Strong baseline signals from transformation + time + outlier scoring."
              bullets={[
                'pca magnitude',
                'log amount, amount zscore',
                'hour sin, hour cos, is night',
                'Isolation Forest outlier scores',
              ]}
            />
            <SplitBlock
              title="Domain specific"
              subtitle="Features inspired by how fraud actually shows up in the real world."
              bullets={['amount percentile', 'is round_amount', 'V14 amount interaction']}
            />
            <SplitBlock
              title="Advanced"
              subtitle="Higher-order signals for separation under extreme imbalance."
              bullets={['distance to fraud', 'feature entropy', 'dominant feature value']}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Algorithm Testing"
            subtitle="Compared 3 algorithms and selected XGBoost: 83.8% recall, handling extreme class imbalance."
          />
          <div className="mt-10 liquid-glass rounded-3xl border border-border p-8 md:p-10">
            <div className="text-foreground font-instrumentSans font-semibold text-lg">Best balance</div>
            <div className="mt-6">
              <div className="hidden md:grid grid-cols-12 gap-3 px-5 pb-3 text-[11px] uppercase tracking-[0.22em] text-foreground/50 font-body">
                <div className="col-span-5">Algorithm</div>
                <div className="col-span-2">Recall</div>
                <div className="col-span-2">Precision</div>
                <div className="col-span-2">ROC-AUC</div>
                <div className="col-span-1 text-right">Status</div>
              </div>
              <div className="space-y-3">
                <AlgoRow
                  algo="Logistic Regression"
                  recall="79.4%"
                  precision="63.2%"
                  roc="0.951"
                  status="Lower recall"
                />
                <AlgoRow
                  algo="Random Forest"
                  recall="81.7%"
                  precision="71.8%"
                  roc="0.963"
                  status="Slower"
                />
                <AlgoRow algo="XGBoost" recall="83.8%" precision="75.2%" roc="0.968" status="Selected" highlight />
              </div>
            </div>
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Business Results"
            subtitle="Operational view of throughput, fraud catch rate, and annual savings—aligned with the product demo opening this case study."
          />
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Cost‑Benefit Breakdown" subtitle="How catching fraud impacts business revenue—and how much we can save." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">Without a system</div>
              <p className="mt-3 text-foreground/60 font-body text-sm leading-relaxed">
                All 492 frauds succeed = <span className="text-foreground">-$3.3M</span> lost per year.
              </p>
            </div>
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">With a system</div>
              <ul className="mt-4 space-y-2 text-foreground/70 font-body text-sm leading-relaxed">
                <li>
                  Fraud prevented: 413 frauds → <span className="text-foreground">$2.77M</span> saved
                </li>
                <li>
                  Missed: 79 frauds → <span className="text-foreground">$535K</span> loss
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Technical Performance" subtitle="Comprehensive metrics and key technical achievements." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard value="83.8%" label="Recall (413 / 492 frauds)" />
            <MetricCard value="75.2%" label="Precision (3 out of 4 alerts are real)" />
            <MetricCard value="0.968" label="ROC‑AUC (near-perfect discrimination)" />
            <MetricCard value="0.048%" label="False alarm rate (41 / 85K transactions)" />
            <MetricCard value="<50ms" label="Latency (real-time capable)" />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Segment Analysis (Honest Assessment)"
            subtitle="Balancing recall (catch fraud) vs precision (minimize false alarms) without business context—solved by calculating cost-benefit tradeoffs at different thresholds."
          />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BulletCard
              title="Strengths"
              bullets={[
                'High-value fraud (>$500): 94% recall',
                'Medium transactions ($100-$500): 89% recall',
                'Night transactions: 91% recall',
                'Isolation Forest feature creation: outlier scores had 217× fraud concentration',
              ]}
            />
            <BulletCard
              title="Weaknesses"
              bullets={[
                'Micro-transactions (<$10): 78% recall',
                'Very small frauds likely card testing patterns',
              ]}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="What Worked Well" subtitle="Key learnings that drove performance." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <BulletCard title="Feature engineering over algorithm choice" bullets={['Focused on data signal quality.']} />
            <BulletCard title="Business-driven threshold optimization" bullets={['Optimized for cost-benefit, not just metrics.']} />
            <BulletCard title="Segment analysis" bullets={['Understood where the model wins and fails.']} />
          </div>
        </section>

        <section id="technologies" className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Technologies Used" subtitle="Tools used for modeling, deployment, and dashboards." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">Technologies</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Python 3.13',
                  'XGBoost 3.1.0',
                  'scikit-learn',
                  'imbalanced-learn',
                  'pandas',
                  'numpy',
                  'scipy',
                  'Docker',
                  'plotly',
                  'SQLite',
                  'joblib',
                  'Load balancer',
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-black/[0.03] px-3 py-1 text-xs font-body text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">Categories</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Machine Learning', 'Data Processing', 'Deployment & Infrastructure'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-black/[0.03] px-3 py-1 text-xs font-body text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="ml" currentId="fraud" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

