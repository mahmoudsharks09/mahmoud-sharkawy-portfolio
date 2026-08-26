import { useEffect, useRef } from 'react'

const SENSITIVITY = 0.8

export function useScrubVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const seekTo = (time: number) => {
      targetTime.current = time
      if (!seeking.current) {
        seeking.current = true
        video.currentTime = targetTime.current
      }
    }

    const handleSeeked = () => {
      if (video.currentTime !== targetTime.current) {
        video.currentTime = targetTime.current
      } else {
        seeking.current = false
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prevX.current === null) {
        prevX.current = e.clientX
        return
      }

      const duration = video.duration
      if (!duration || Number.isNaN(duration)) {
        prevX.current = e.clientX
        return
      }

      const delta = e.clientX - prevX.current
      prevX.current = e.clientX

      const offset = (delta / window.innerWidth) * SENSITIVITY * duration
      const current = seeking.current ? targetTime.current : video.currentTime
      const next = Math.min(Math.max(current + offset, 0), duration)

      seekTo(next)
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return videoRef
}
