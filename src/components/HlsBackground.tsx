import Hls from 'hls.js'
import React from 'react'

type HlsBackgroundProps = {
  src: string
  className?: string
  poster?: string
  style?: React.CSSProperties
}

export function HlsBackground({ src, className, poster, style }: HlsBackgroundProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    if (!Hls.isSupported()) return

    const hls = new Hls({ enableWorker: true })
    hls.loadSource(src)
    hls.attachMedia(video)

    return () => {
      hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
    />
  )
}

