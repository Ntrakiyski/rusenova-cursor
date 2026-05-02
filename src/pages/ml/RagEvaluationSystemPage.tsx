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

import RAG_GRAPH from '../../../source/images/rag-graph.png'

const RAG_VIDEO = '/videos/rag-video.mov'

function BulletCard({
  title,
  bullets,
}: {
  title: string
  bullets: string[]
}) {
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

function FeatureMini({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
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

export function RagEvaluationSystemPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Case study · ML Engineering · RAG</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            RAG+ Evaluation System
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Reduced information retrieval time by{' '}
            <span className="project-hero-emphasis font-medium">85%</span> while achieving{' '}
            <span className="project-hero-emphasis font-medium">92% answer accuracy</span> through a
            custom RAG system with an advanced evaluation framework.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ProjectHeroMetricCard value="92%" label="Precision" />
            <ProjectHeroMetricCard value="89%" label="Recall" />
            <ProjectHeroMetricCard value="85%" label="Time Saved" />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()} aria-label="RAG evaluation system demo video">
          <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
            <video
              className="aspect-[16/7] w-full object-cover"
              src={RAG_VIDEO}
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
            subtitle="A production-ready RAG pipeline with a dedicated evaluation framework—so performance is measurable, debuggable, and improvable."
          />
          <div className="mt-10 flex flex-col gap-4">
            <BulletCard
              title="RAG + Evaluation Framework"
              bullets={[
                'Essential for validating system performance and behavior.',
                'Especially important for unseen information not present in base model training.',
              ]}
            />
            <BulletCard
              title="Correctness Guarantees"
              bullets={[
                'Ensures results are accurate and reliable.',
                'Makes failure modes visible instead of “silent wrong answers.”',
              ]}
            />
            <BulletCard
              title="Continuous Improvement Loop"
              bullets={[
                'Measures failure points and failure rates.',
                'Supports rapid iteration on retrieval, reranking, and prompting.',
              ]}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="The Challenge"
            subtitle="Organizations struggle to extract insights from large document repositories. Teams spend hours searching through technical documentation—and traditional keyword search misses relevant info due to semantic gaps."
          />
          <div className="mt-10 liquid-glass rounded-3xl border border-border p-8 md:p-10">
            <div className="text-foreground font-instrumentSans font-semibold text-lg">
              Problem statement
            </div>
            <p className="mt-3 text-foreground/60 font-body text-sm md:text-base leading-relaxed">
              Traditional keyword search can miss a large portion of relevant results, which leads
              to duplicated work, missed opportunities, and slow decision-making.
            </p>
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Selecting the Right Approach"
            subtitle="Imagine searching hundreds of PDFs to find one answer—then getting it in seconds with sources cited."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureMini
              title="Two‑Stage Retrieval"
              desc="Vector search + AI re‑ranking for significantly better relevance."
            />
            <FeatureMini
              title="Custom Evaluation Framework"
              desc="Precision, Recall, and MRR metrics for continuous improvement."
            />
            <FeatureMini
              title="Real‑Time Q&A Interface"
              desc="Source attribution with low-latency answers."
            />
            <FeatureMini
              title="Production‑Ready API"
              desc="Modular design with scalable architecture."
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="The Architecture"
            subtitle="Understands what you’re really asking (not just keywords), searches the right documents instantly, and returns grounded answers."
          />
          <div className="mt-10 space-y-4">
            <SplitBlock
              title="Smart Retrieval System"
              subtitle="Understands intent—not just matching words."
              bullets={[
                'Vector embeddings (OpenAI) + LanceDB for semantic search.',
                'Cohere re-ranking reduced false positives by 35%.',
                'Achieved 92% precision vs. 67% baseline keyword search.',
                'L2 distance metric for optimal similarity matching.',
              ]}
            />
            <SplitBlock
              title="Evaluation Framework"
              subtitle="Every answer is tested—and we know if it’s correct."
              bullets={[
                'Custom metrics: Precision, Recall, Mean Reciprocal Rank (MRR).',
                'AI-powered correctness validation using GPT‑4.',
                '25 test questions with ground truth for continuous benchmarking.',
                'Automated test harness for iteration and regression detection.',
              ]}
            />
            <SplitBlock
              title="Production Architecture"
              subtitle="Like LEGO blocks—swap parts without rebuilding everything."
              bullets={[
                'Modular design: Indexer → Datastore → Retriever → Generator.',
                'CLI + Web interface built with Python/Reflex framework.',
                'Handles 60+ document chunks with sub‑second retrieval.',
                'SQLAlchemy + Alembic for robust database management.',
              ]}
            />
            <div className="flex justify-start">
              <div className="liquid-glass w-full max-w-3xl rounded-3xl border border-border overflow-hidden">
                <img
                  src={RAG_GRAPH}
                  alt="RAG production architecture graph"
                  className="block w-full h-auto object-contain object-left bg-black/[0.02]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Results & Impact"
            subtitle="What used to take half a morning now happens while coffee is brewing."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">
                Quantifiable outcomes
              </div>
              <ul className="mt-4 space-y-2 text-foreground/70 font-body text-sm leading-relaxed">
                <li>92% precision</li>
                <li>89% recall on test dataset</li>
                <li>85% reduction in information retrieval time</li>
                <li>0.94 Mean Reciprocal Rank for ranking quality</li>
              </ul>
            </div>
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">
                Business value
              </div>
              <ul className="mt-4 space-y-2 text-foreground/70 font-body text-sm leading-relaxed">
                <li>Saves teams hours on documentation search</li>
                <li>Enables instant access to knowledge</li>
                <li>Scales with growing document repositories</li>
                <li>Improves decisions with faster insights</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="tech-stack" className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Tech Stack"
            subtitle="Production-grade tools used to handle real-world scale."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">
                Technologies
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Python',
                  'OpenAI API',
                  'Cohere',
                  'LanceDB',
                  'React',
                  'Docling',
                  'SQLAlchemy',
                  'Alembic',
                  'FastAPI',
                  'Git',
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
              <div className="text-foreground font-instrumentSans font-semibold text-lg">
                Categories
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'ML Engineering',
                  'Vector Databases',
                  'LLM Integration',
                  'System Design',
                  'API Development',
                  'Evaluation Metrics',
                  'Full‑Stack Development',
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
          </div>
        </section>

        </ProjectCaseStudyBody>

        <SnapshotKeepInMindSection category="ml" currentId="rag" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

