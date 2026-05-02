import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type Blob = {
  /** CSS color for the blob. */
  color: string
  /** Diameter in px (pre-blur). Big values + heavy blur → soft cloud. */
  size: number
  /** Initial CSS top/left as % of the container. */
  top: string
  left: string
  /** Blur radius in px. */
  blur: number
  /** Base opacity. */
  opacity: number
  /** Drift envelope — how far the blob can wander from its start. */
  driftX: number
  driftY: number
  /** Random duration range (seconds) for each yoyo cycle. */
  duration: [number, number]
}

/**
 * Brand palette — three-color sunset:
 *   #F44B2F red-orange · #F38300 orange · #E9A8E5 soft pink
 *
 * Drift values are intentionally huge (≈700–850 px each axis) and durations
 * short (4–8 s) so motion reads through the heavy blur — blurred blobs need
 * much more travel than sharp objects to appear "in motion".
 */
const BLOBS: Blob[] = [
  // Soft pink, upper-left
  {
    color: '#E9A8E5',
    size: 820,
    top: '-15%',
    left: '-10%',
    blur: 90,
    opacity: 0.9,
    driftX: 750,
    driftY: 480,
    duration: [5, 8],
  },
  // Orange, upper-right
  {
    color: '#F38300',
    size: 860,
    top: '-10%',
    left: '50%',
    blur: 100,
    opacity: 0.9,
    driftX: 780,
    driftY: 500,
    duration: [4, 7],
  },
  // Red-orange focal point, center
  {
    color: '#F44B2F',
    size: 820,
    top: '35%',
    left: '40%',
    blur: 95,
    opacity: 0.95,
    driftX: 820,
    driftY: 520,
    duration: [4, 7],
  },
  // Big orange, bottom-center
  {
    color: '#F38300',
    size: 1000,
    top: '60%',
    left: '20%',
    blur: 110,
    opacity: 0.95,
    driftX: 840,
    driftY: 540,
    duration: [5, 8],
  },
  // Pink bottom-right accent
  {
    color: '#E9A8E5',
    size: 780,
    top: '70%',
    left: '60%',
    blur: 95,
    opacity: 0.9,
    driftX: 760,
    driftY: 500,
    duration: [4, 7],
  },
]

type MeshGradientProps = {
  className?: string
  style?: React.CSSProperties
}

/**
 * Animated mesh gradient — soft, blurred colored blobs that drift continuously
 * to create a Lovable-style flowing background. Replaces the hero video.
 */
export function MeshGradient({ className = '', style }: MeshGradientProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const blobRefs = React.useRef<Array<HTMLDivElement | null>>([])

  useGSAP(
    () => {
      // Honor reduced-motion users, but otherwise always animate. We use a
      // simple media query check rather than gsap.matchMedia so the default
      // path (no preference / preference unsupported) reliably runs.
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i]
        if (!el) return

        // Seed each blob at a random offset so they don't all start clustered
        // at their CSS top/left.
        gsap.set(el, {
          x: gsap.utils.random(-blob.driftX, blob.driftX),
          y: gsap.utils.random(-blob.driftY, blob.driftY),
          scale: gsap.utils.random(0.7, 1.3),
        })

        // Each blob drifts on its own random schedule. Function-based targets
        // + repeatRefresh: true mean every yoyo cycle picks a fresh
        // destination, so the motion never visibly loops.
        gsap.to(el, {
          x: () => gsap.utils.random(-blob.driftX, blob.driftX),
          y: () => gsap.utils.random(-blob.driftY, blob.driftY),
          scale: () => gsap.utils.random(0.6, 1.5),
          rotation: () => gsap.utils.random(-40, 40),
          duration: () =>
            gsap.utils.random(blob.duration[0], blob.duration[1]),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          // Negative delay so blobs are mid-tween at mount, not all kicking
          // off from a frozen state at the same instant.
          delay: -i * 1.1,
        })
      })
    },
    { scope: containerRef },
  )

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Base gradient: warm cream so the colored blobs pop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #fff5e0 0%, #ffe6cc 50%, #ffd0b0 100%)',
        }}
      />

      {/* Animated colored blobs */}
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el
          }}
          className="absolute rounded-full"
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            top: blob.top,
            left: blob.left,
            backgroundColor: blob.color,
            filter: `blur(${blob.blur}px)`,
            opacity: blob.opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
