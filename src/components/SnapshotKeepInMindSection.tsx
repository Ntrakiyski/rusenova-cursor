import {
  PROJECT_PAGE_CENTER_BODY_TEXT,
  projectCaseStudyContentColumnClass,
} from '../config/projectPageArticleLayout'
import { cn } from '../lib/utils'
import { RelatedProjectLinks, type MlProjectId, type ProductDesignProjectId } from './RelatedProjectLinks'

const SNAPSHOT_QUOTE =
  "What you see here is a snapshot—each project has layers of research, collaboration, and tough decisions that shaped the outcome. If something catches your eye, let's talk about how that experience translates to what you're working on."

type Props =
  | { category: 'product-design'; currentId: ProductDesignProjectId }
  | { category: 'ml'; currentId: MlProjectId }

export function SnapshotKeepInMindSection(props: Props) {
  return (
    <section
      className={cn(
        projectCaseStudyContentColumnClass('py-16'),
        PROJECT_PAGE_CENTER_BODY_TEXT && [
          'text-center',
          '[&_.liquid-glass]:text-start',
          '[&>div:last-child]:text-start',
        ],
      )}
    >
      <div className="liquid-glass rounded-3xl border border-border p-8 md:p-10">
        <div className="mb-5 text-foreground font-instrumentSans font-semibold">Keep in mind</div>
        <div className="text-foreground/80 font-body text-base md:text-lg leading-relaxed">“{SNAPSHOT_QUOTE}”</div>
      </div>
      <div className="ps-8 md:ps-10">
        <RelatedProjectLinks {...props} />
      </div>
    </section>
  )
}
