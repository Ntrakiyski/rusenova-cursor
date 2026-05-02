import type { PropsWithChildren } from 'react'

import {
  PROJECT_PAGE_CENTER_BODY_TEXT,
  PROJECT_PAGE_USE_CENTERED_ARTICLE,
  projectCaseStudyContentColumnClass,
} from '../config/projectPageArticleLayout'
import { cn } from '../lib/utils'

export function ProjectCaseStudyBody({ children }: PropsWithChildren) {
  if (!PROJECT_PAGE_USE_CENTERED_ARTICLE) {
    return <>{children}</>
  }

  return (
    <div
      className={cn(
        projectCaseStudyContentColumnClass('py-14 lg:py-16'),
        PROJECT_PAGE_CENTER_BODY_TEXT && [
          'text-center',
          '[&_.liquid-glass]:text-start',
          '[&_figure]:text-center [&_figcaption]:text-center',
        ],
      )}
    >
      <div className="flex flex-col gap-16">{children}</div>
    </div>
  )
}
