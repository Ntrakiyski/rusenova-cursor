import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

import { ProductDesignFeatured } from './ProductDesignFeatured'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

export function ProductDesignRows() {
  return (
    <section
      id="product-design"
      data-nav-bg="dark"
      className="relative flex min-h-svh flex-col justify-center bg-[#0a0a0a] text-white"
    >
      <ProductDesignFeatured />
    </section>
  )
}
