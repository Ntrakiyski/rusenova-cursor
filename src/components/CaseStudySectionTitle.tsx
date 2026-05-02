import { cn } from '../lib/utils'
import { caseStudyHeadingGroupClass } from '../config/projectPageArticleLayout'

type CaseStudySectionTitleProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  /** Override default muted subtitle typography */
  subtitleClassName?: string
}

const defaultSubtitleClass =
  'mt-4 text-foreground/60 font-body font-light text-sm md:text-base leading-relaxed'

export function CaseStudySectionTitle({
  eyebrow,
  title,
  subtitle,
  subtitleClassName,
}: CaseStudySectionTitleProps) {
  const subClass = subtitleClassName ?? defaultSubtitleClass

  return (
    <div className={caseStudyHeadingGroupClass()}>
      {eyebrow ? (
        <div className="inline-flex text-xs font-medium font-body text-foreground/65">{eyebrow}</div>
      ) : null}
      <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-instrumentSans font-bold tracking-tight leading-[0.92] text-foreground">
        {title}
      </h2>
      {subtitle ? <p className={cn(subClass)}>{subtitle}</p> : null}
    </div>
  )
}
