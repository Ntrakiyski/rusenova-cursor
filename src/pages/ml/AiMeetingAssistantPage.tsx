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

import AI_ASSISTANT_VIDEO from '../../../source/real-time-ai-assistant.mov'

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="liquid-glass rounded-2xl border border-border px-6 py-6">
      <div className="text-2xl md:text-3xl font-instrumentSans font-bold tracking-tight text-foreground">
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

function Capability({
  title,
  subtitle,
  tech,
}: {
  title: string
  subtitle: string
  tech: string
}) {
  return (
    <div className="liquid-glass rounded-3xl border border-border p-8 md:p-10">
      <div className="text-foreground font-instrumentSans font-bold text-2xl tracking-tight">
        {title}
      </div>
      <div className="mt-3 text-foreground/60 font-body text-sm leading-relaxed">{subtitle}</div>
      <div className="mt-6 inline-flex rounded-full border border-border bg-black/[0.03] px-3 py-1 text-xs font-body text-foreground/75">
        {tech}
      </div>
    </div>
  )
}

export function AiMeetingAssistantPage() {
  return (
    <div className="theme-light min-h-screen bg-background text-foreground">
      <main>
        <ProjectPageHeroSection>
          <ProjectHeroEyebrow>Case study · ML Engineering · Real-time</ProjectHeroEyebrow>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-instrumentSans font-bold tracking-tight leading-[0.9]">
            Real‑Time Meeting Agent
          </h1>
          <p className="project-hero-lead mt-5 max-w-3xl font-body font-light text-sm md:text-base leading-relaxed">
            Real-time AI meeting agent which reduces meeting follow-up time by{' '}
            <span className="project-hero-emphasis font-medium">75%</span>.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProjectHeroMetricCard
              size="md"
              value="<2 second latency"
              label="for real-time transcription"
            />
            <ProjectHeroMetricCard size="md" value="90% accuracy" label="in agenda progress tracking" />
            <ProjectHeroMetricCard
              size="md"
              value="3–5 actionable insights"
              label="generated per 15‑minute segment"
            />
          </div>
        </ProjectPageHeroSection>

        <div data-nav-bg="light">
        <ProjectCaseStudyBody>
        <section className={projectCaseStudySectionClass()} aria-label="Meeting agent demo video">
          <div className="liquid-glass rounded-3xl border border-border overflow-hidden">
            <video
              className="aspect-[16/7] w-full object-cover"
              src={AI_ASSISTANT_VIDEO}
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
            subtitle="A three-layer architecture for speech recognition, natural language understanding, and intelligent analysis—with four core capabilities."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BulletCard
              title="Three-layer architecture"
              bullets={[
                'Speech recognition (audio → text).',
                'Natural language understanding (structured extraction).',
                'Intelligent analysis (agenda + suggestions).',
              ]}
            />
            <BulletCard
              title="Four core capabilities"
              bullets={[
                'Real-time transcription.',
                'Automatic insight extraction.',
                'Agenda progress tracking.',
                'Proactive suggestions.',
              ]}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="The Meeting Intelligence Gap"
            subtitle="The problem isn’t only meetings—it’s the cognitive overhead to capture, synthesize, and act on what was discussed."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <BulletCard
              title="Information loss"
              bullets={['Critical decisions and action items get lost in conversation flow.']}
            />
            <BulletCard
              title="Cognitive overload"
              bullets={['Participants can’t fully engage while trying to take notes.']}
            />
            <BulletCard
              title="Delayed insights"
              bullets={['By the time notes are reviewed, context is gone.']}
            />
            <BulletCard
              title="No real-time guidance"
              bullets={['Meetings drift off-topic without immediate feedback.']}
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Selecting the Right Approach"
            subtitle="The system processes audio in real-time, transforming raw speech into structured intelligence that helps teams stay focused and capture value."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="liquid-glass rounded-2xl border border-border p-6 text-foreground font-instrumentSans font-semibold">
              Audio input
            </div>
            <div className="liquid-glass rounded-2xl border border-border p-6 text-foreground font-instrumentSans font-semibold">
              Whisper API
            </div>
            <div className="liquid-glass rounded-2xl border border-border p-6 text-foreground font-instrumentSans font-semibold">
              LLM analyses
            </div>
            <div className="liquid-glass rounded-2xl border border-border p-6 text-foreground font-instrumentSans font-semibold">
              Real-time UI
            </div>
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle
            title="Core Capabilities"
            subtitle="Built on a three-layer architecture combining speech recognition, natural language understanding, and intelligent analysis."
          />
          <div className="mt-10 space-y-4">
            <Capability
              title="Real‑Time Transcription"
              subtitle="Sub-second audio-to-text conversion that handles overlapping speech, multiple speakers, and background noise effectively."
              tech="Groq Whisper API + Stream Processing"
            />
            <Capability
              title="Intelligent Insight Extraction"
              subtitle="Automatically identifies decisions, commitments, and key information using context-aware prompts that filter out fluff."
              tech="Custom LLM Prompts + Context Windows"
            />
            <Capability
              title="Agenda Progress Tracking"
              subtitle="Real-time semantic matching against agenda items to keep meetings on track and ensure all key topics are covered."
              tech="Semantic Search + State Management"
            />
            <Capability
              title="Proactive Suggestions"
              subtitle="Generates real-time recommendations, questions, and warnings to prevent off-topic drift and missed opportunities."
              tech="Multi-class Classification"
            />
          </div>
        </section>

        <section className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Performance Benchmarks" subtitle="Key reliability and quality metrics." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard value="<2s" label="Latency (audio → transcript)" />
            <MetricCard value="95%+" label="Parse rate (LLM response parsing)" />
            <MetricCard value="99.2%" label="Uptime (API reliability)" />
            <MetricCard value="87%" label="Dedup rate (duplicate reduction)" />
          </div>
        </section>

        <section id="technologies" className={projectCaseStudySectionClass()}>
          <CaseStudySectionTitle title="Technologies Used" subtitle="Production-ready stack for realtime processing." />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl border border-border p-8">
              <div className="text-foreground font-instrumentSans font-semibold text-lg">Technologies</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  'Python 3.11',
                  'OpenAI Whisper (Fine-tuned)',
                  'GPT-4o',
                  'LangChain',
                  'Pinecone (Vector DB)',
                  'Redis',
                  'WebRTC',
                  'FastAPI',
                  'React / Next.js',
                  'Docker',
                  'Kubernetes',
                  'Kafka',
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
                {['Machine Learning', 'Realtime Systems', 'LLM Integration', 'Full‑Stack Development'].map((t) => (
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

        <SnapshotKeepInMindSection category="ml" currentId="meeting" />

        <ContactCtaSection />
        </div>
      </main>
    </div>
  )
}

