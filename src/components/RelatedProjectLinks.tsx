import { Link, useLocation } from 'react-router-dom'

import { stateFromProjectPath } from '../lib/navOrigin'

export type ProductDesignProjectId = 'tide' | 'telenor' | 'epam' | 'mentormate'
export type MlProjectId = 'rag' | 'fraud' | 'meeting' | 'ecom'

const PRODUCT_DESIGN_PROJECTS: { id: ProductDesignProjectId; label: string; href: string }[] = [
  { id: 'tide', label: 'Tide', href: '/product-design/tide' },
  { id: 'telenor', label: 'Telenor', href: '/product-design/telenor' },
  { id: 'epam', label: 'EPAM', href: '/product-design/epam' },
  { id: 'mentormate', label: 'MentorMate', href: '/product-design/mentormate' },
]

const ML_PROJECTS: { id: MlProjectId; label: string; href: string }[] = [
  { id: 'rag', label: 'RAG+ evaluation system', href: '/ml/rag-evaluation-system' },
  { id: 'fraud', label: 'Fraud detection system', href: '/ml/fraud-detection-system' },
  { id: 'meeting', label: 'Real-time AI meeting assistant', href: '/ml/ai-meeting-assistant' },
  { id: 'ecom', label: 'E-commerce recommendation system', href: '/ml/recommendation-system' },
]

type Props =
  | { category: 'product-design'; currentId: ProductDesignProjectId }
  | { category: 'ml'; currentId: MlProjectId }

export function RelatedProjectLinks(props: Props) {
  const { pathname } = useLocation()
  const fromProjectState = stateFromProjectPath(pathname)
  const items = props.category === 'product-design' ? PRODUCT_DESIGN_PROJECTS : ML_PROJECTS
  const others = items.filter((p) => p.id !== props.currentId)

  return (
    <div className="mt-10">
      <h3 className="text-foreground font-instrumentSans font-semibold text-lg md:text-xl tracking-tight">
        Check out the rest of the projects
      </h3>
      <ul className="mt-4 flex flex-col gap-2">
        {others.map((p) => (
          <li key={p.id}>
            <Link
              to={p.href}
              state={fromProjectState}
              className="font-body text-base text-foreground underline underline-offset-[0.2em] decoration-foreground/35 hover:decoration-foreground transition-colors"
            >
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
