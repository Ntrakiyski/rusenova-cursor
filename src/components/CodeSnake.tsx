import React from 'react'

type CodeSnakeProps = {
  className?: string
  density?: number
  style?: React.CSSProperties
  glyphBlendMode?: React.CSSProperties['mixBlendMode']
  glyphOpacity?: number
  glyphs?: string[]
  glyphClassName?: string
  glyphColor?: string
  speed?: number
  wiggle?: number
  pathPreset?: 'hero' | 'line'
}

type Pt = { x: number; y: number }

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function dist(a: Pt, b: Pt) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.hypot(dx, dy)
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function buildPolyline(w: number, h: number, gentle: boolean): Pt[] {
  if (gentle) {
    // Narrow viewports: two gentle waves — amplitude a bit taller than before for readability.
    const mid = h * 0.5
    const a = h * 0.132
    return [
      { x: -w * 0.15, y: mid },
      { x: w * 0.22, y: mid - a },
      { x: w * 0.52, y: mid + a },
      { x: w * 0.82, y: mid - a },
      { x: w * 1.12, y: mid + a * 0.45 },
    ]
  }

  // Desktop: two waves across the width (was three oscillations).
  const yTop = h * 0.22
  const yMid = h * 0.42
  const yLow = h * 0.64

  return [
    { x: -w * 0.15, y: yMid },
    { x: w * 0.18, y: yTop },
    { x: w * 0.42, y: yLow },
    { x: w * 0.68, y: yTop },
    { x: w * 0.92, y: yMid },
    { x: w * 1.12, y: yLow },
  ]
}

function buildLinePolyline(w: number, h: number): Pt[] {
  // A higher-amplitude path for short, single-line containers.
  const yTop = h * 0.1
  const yMid = h * 0.55
  const yLow = h * 0.95

  return [
    { x: -w * 0.1, y: yMid },
    { x: w * 0.15, y: yTop },
    { x: w * 0.32, y: yLow },
    { x: w * 0.52, y: yTop },
    { x: w * 0.72, y: yLow },
    { x: w * 0.9, y: yTop },
    { x: w * 1.1, y: yMid },
  ]
}

function catmullRom(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  // Uniform Catmull–Rom spline.
  const t2 = t * t
  const t3 = t2 * t
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  }
}

function sampleSmoothPath(ctrl: Pt[], samples = 520): Pt[] {
  if (ctrl.length < 2) return ctrl
  const out: Pt[] = []
  const segCount = ctrl.length - 1
  for (let i = 0; i < samples; i++) {
    const u = i / (samples - 1)
    const s = u * segCount
    const si = Math.floor(s)
    const lt = s - si
    const i0 = clamp(si - 1, 0, ctrl.length - 1)
    const i1 = clamp(si, 0, ctrl.length - 1)
    const i2 = clamp(si + 1, 0, ctrl.length - 1)
    const i3 = clamp(si + 2, 0, ctrl.length - 1)
    out.push(catmullRom(ctrl[i0]!, ctrl[i1]!, ctrl[i2]!, ctrl[i3]!, lt))
  }
  return out
}

function buildSegments(points: Pt[]) {
  const segs: { a: Pt; b: Pt; len: number }[] = []
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!
    const b = points[i + 1]!
    const len = dist(a, b)
    segs.push({ a, b, len })
    total += len
  }
  return { segs, total }
}

function pointAndTangentAt(points: Pt[], t01: number) {
  const { segs, total } = buildSegments(points)
  const target = t01 * total
  let acc = 0

  for (const s of segs) {
    if (acc + s.len >= target) {
      const lt = (target - acc) / s.len
      const x = lerp(s.a.x, s.b.x, lt)
      const y = lerp(s.a.y, s.b.y, lt)
      const tx = s.b.x - s.a.x
      const ty = s.b.y - s.a.y
      const mag = Math.hypot(tx, ty) || 1
      return {
        p: { x, y },
        tangent: { x: tx / mag, y: ty / mag },
      }
    }
    acc += s.len
  }

  const last = points.at(-1) ?? { x: 0, y: 0 }
  const prev = points.at(-2) ?? last
  const tx = last.x - prev.x
  const ty = last.y - prev.y
  const mag = Math.hypot(tx, ty) || 1
  return { p: last, tangent: { x: tx / mag, y: ty / mag } }
}

const DEFAULT_GLYPHS = ['<', '>', '/', '[', ']', '{', '}', '=', ')', '(', ';', ':']

/** Matches site accents — yellow, pink, orange, red (see MeshGradient / ProductDesignFeatured). */
const BRAND_SNAKE_COLORS = [
  'rgba(255, 218, 36, 0.9)',
  'rgba(233, 168, 229, 0.9)',
  'rgba(243, 131, 0, 0.9)',
  'rgba(244, 75, 47, 0.9)',
] as const

function brandSnakeColor(i: number) {
  return BRAND_SNAKE_COLORS[i % BRAND_SNAKE_COLORS.length]!
}

export function CodeSnake({
  className,
  density = 52,
  style,
  glyphBlendMode,
  glyphOpacity,
  glyphs,
  glyphClassName,
  glyphColor,
  speed = 0.07,
  wiggle = 7,
  pathPreset = 'hero',
}: CodeSnakeProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const [size, setSize] = React.useState({ w: 0, h: 0 })
  const [tick, setTick] = React.useState(0)

  React.useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (!r) return
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    let raf = 0
    let start = performance.now()
    const loop = (now: number) => {
      // Update at ~30fps to keep it light.
      const elapsed = now - start
      if (elapsed > 33) {
        setTick((t) => t + 1)
        start = now
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const gentlePath = size.w > 0 && size.w < 768

  const points = React.useMemo(() => {
    if (!size.w || !size.h) return []
    const ctrl =
      pathPreset === 'line'
        ? buildLinePolyline(size.w, size.h)
        : buildPolyline(size.w, size.h, gentlePath)
    return sampleSmoothPath(ctrl)
  }, [pathPreset, size.w, size.h, gentlePath])

  const time = tick * 0.033 // seconds (approx)
  const glyphSet = glyphs?.length ? glyphs : DEFAULT_GLYPHS
  const wiggleAmp = gentlePath ? Math.min(wiggle, 3.5) : wiggle
  const travelSpeed = gentlePath ? speed * 1.65 : speed

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      style={{ contain: 'layout paint', pointerEvents: 'none', ...style }}
    >
      {points.length > 1 &&
        Array.from({ length: density }).map((_, i) => {
          const phase = (i + 0.5) / Math.max(1, density)
          const t01 = (time * travelSpeed + phase) % 1
          const { p, tangent } = pointAndTangentAt(points, t01)
          const nx = -tangent.y
          const ny = tangent.x
          const wobble = Math.sin(time * 3 + i * 0.35) * wiggleAmp
          const x = p.x + nx * wobble
          const y = p.y + ny * wobble
          const rot = Math.atan2(tangent.y, tangent.x) * (180 / Math.PI)

          // Keep each glyph stable (no cycling), only the position animates.
          const glyph = glyphSet[(i * 7) % glyphSet.length] ?? glyphSet[0] ?? '<'

          return (
            <span
              key={i}
              className={[
                'absolute select-none leading-none opacity-80',
                glyphClassName ?? 'font-mono font-bold text-[16px] md:text-[16px]',
              ].join(' ')}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`,
                color: glyphColor ?? brandSnakeColor(i),
                textShadow:
                  '0 0 10px rgba(255,255,255,0.15), 0 0 22px rgba(0,0,0,0.35)',
                filter: 'saturate(1.35)',
                mixBlendMode: glyphBlendMode ?? 'screen',
                opacity: glyphOpacity ?? undefined,
                willChange: 'transform',
              }}
            >
              {glyph}
            </span>
          )
        })}
    </div>
  )
}

