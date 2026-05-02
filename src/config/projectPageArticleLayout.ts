import type { ClassValue } from 'clsx'

import { cn } from '../lib/utils'

/**
 * When true: case-study body uses a single narrow column (max-w-3xl) like the
 * Recommendation System page. When false: each section uses the wider
 * max-w-6xl layout.
 */
export const PROJECT_PAGE_USE_CENTERED_ARTICLE = true

/**
 * Only applies when PROJECT_PAGE_USE_CENTERED_ARTICLE is true.
 * When true: center-align prose in the narrow column (experimental).
 */
export const PROJECT_PAGE_CENTER_BODY_TEXT = false

/**
 * Horizontal shell for case-study prose and shared blocks (e.g. snapshot footer).
 * Keeps project pages aligned whether the body uses a centered narrow column or wide sections.
 */
export function projectCaseStudyContentColumnClass(...extra: ClassValue[]): string {
  return cn(
    'mx-auto w-full px-8 lg:px-16',
    PROJECT_PAGE_USE_CENTERED_ARTICLE ? 'max-w-3xl' : 'max-w-6xl',
    ...extra,
  )
}

export function caseStudyHeadingGroupClass(): string {
  const base = 'max-w-3xl'
  if (!PROJECT_PAGE_USE_CENTERED_ARTICLE) return base
  if (!PROJECT_PAGE_CENTER_BODY_TEXT) return cn(base, 'mx-auto')
  return cn(base, 'mx-auto text-center')
}

export function projectCaseStudySectionClass(...extra: ClassValue[]) {
  if (!PROJECT_PAGE_USE_CENTERED_ARTICLE) {
    return cn(projectCaseStudyContentColumnClass('py-16'), ...extra)
  }
  return cn('scroll-mt-[7.5rem]', ...extra)
}
