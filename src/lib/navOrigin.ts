/** Passed via React Router `location.state` when opening a case study. */
export type NavOrigin =
  | { kind: 'home'; hash: string }
  | { kind: 'project'; pathname: string }

export type NavOriginLocationState = {
  navOrigin?: NavOrigin
}

export type HomeSectionHash =
  | '#services'
  | '#ai'
  | '#product-design'
  | '#about'
  | '#contact'

export function stateFromHomeSection(hash: HomeSectionHash): NavOriginLocationState {
  return { navOrigin: { kind: 'home', hash } }
}

export function stateFromProjectPath(pathname: string): NavOriginLocationState {
  return { navOrigin: { kind: 'project', pathname } }
}

/** Target for the primary nav control on case study routes (left: Back). */
export function resolveCaseStudyBackTo(pathname: string, locationState: unknown): string {
  const origin = (locationState as NavOriginLocationState | null | undefined)?.navOrigin

  if (origin?.kind === 'project') {
    return origin.pathname
  }
  if (origin?.kind === 'home') {
    const h = origin.hash.startsWith('#') ? origin.hash : `#${origin.hash}`
    return `/${h}`
  }

  if (pathname.startsWith('/ml/')) return '/#ai'
  if (pathname.startsWith('/product-design/')) return '/#product-design'
  return '/'
}

export function isCaseStudyRoute(pathname: string): boolean {
  return pathname.startsWith('/ml/') || pathname.startsWith('/product-design/')
}
