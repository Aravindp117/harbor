import { useState, useRef, useEffect, useCallback } from 'react'

const VIDEO_SOURCES = [
  'https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm',
  // Add more video URLs here as needed:
  // 'https://example.com/video-2.webm',
  // 'https://example.com/video-3.webm',
]

const CROSSFADE_DURATION = 1200 // ms for opacity transition
const END_THRESHOLD = 0.5 // seconds before end to trigger crossfade

interface HeroVideoCarouselProps {
  isMuted: boolean
}

export function HeroVideoCarousel({ isMuted }: HeroVideoCarouselProps) {
  const videoARef = useRef<HTMLVideoElement>(null)
  const videoBRef = useRef<HTMLVideoElement>(null)
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A')
  const [currentIndex, setCurrentIndex] = useState(0)
  const crossfadeTriggeredRef = useRef(false)

  const getNextIndex = useCallback(
    (idx: number) => (idx + 1) % VIDEO_SOURCES.length,
    []
  )

  // Set initial sources
  useEffect(() => {
    if (videoARef.current) {
      videoARef.current.src = VIDEO_SOURCES[0]
      videoARef.current.load()
    }
    if (videoBRef.current && VIDEO_SOURCES.length > 1) {
      videoBRef.current.src = VIDEO_SOURCES[getNextIndex(0)]
      videoBRef.current.load()
    }
  }, [getNextIndex])

  // Mute/unmute sync
  useEffect(() => {
    const activeVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current
    const inactiveVideo = activeSlot === 'A' ? videoBRef.current : videoARef.current
    if (activeVideo) {
      activeVideo.muted = isMuted
      activeVideo.volume = isMuted ? 0 : 0.7
    }
    if (inactiveVideo) {
      inactiveVideo.muted = true
      inactiveVideo.volume = 0
    }
  }, [isMuted, activeSlot])

  // Autoplay with mobile fallbacks
  useEffect(() => {
    const activeVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current
    if (!activeVideo) return

    const tryPlay = () => {
      activeVideo.muted = isMuted
      activeVideo.volume = isMuted ? 0 : 0.7
      const p = activeVideo.play()
      if (p) p.catch(() => {})
    }

    tryPlay()

    // iOS Safari fallback
    const handleInteraction = () => {
      tryPlay()
      document.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('click', handleInteraction)
    }
    document.addEventListener('touchstart', handleInteraction, { once: true })
    document.addEventListener('click', handleInteraction, { once: true })

    // IntersectionObserver fallback
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
      },
      { threshold: 0.25 }
    )
    observer.observe(activeVideo)

    return () => {
      observer.disconnect()
      document.removeEventListener('touchstart', handleInteraction)
      document.removeEventListener('click', handleInteraction)
    }
  }, [activeSlot, isMuted])

  // Crossfade logic: listen for timeupdate on active video
  useEffect(() => {
    // Only crossfade if we have multiple videos
    if (VIDEO_SOURCES.length <= 1) return

    const activeVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current
    const inactiveVideo = activeSlot === 'A' ? videoBRef.current : videoARef.current
    if (!activeVideo || !inactiveVideo) return

    crossfadeTriggeredRef.current = false

    const handleTimeUpdate = () => {
      if (crossfadeTriggeredRef.current) return
      const remaining = activeVideo.duration - activeVideo.currentTime
      if (remaining <= END_THRESHOLD && activeVideo.duration > 0) {
        crossfadeTriggeredRef.current = true

        // Prepare next video
        const nextIdx = getNextIndex(currentIndex)
        inactiveVideo.src = VIDEO_SOURCES[nextIdx]
        inactiveVideo.load()
        inactiveVideo.muted = true
        inactiveVideo.volume = 0
        const p = inactiveVideo.play()
        if (p) p.catch(() => {})

        // Swap active slot
        setActiveSlot((prev) => (prev === 'A' ? 'B' : 'A'))
        setCurrentIndex(nextIdx)
      }
    }

    activeVideo.addEventListener('timeupdate', handleTimeUpdate)
    return () => activeVideo.removeEventListener('timeupdate', handleTimeUpdate)
  }, [activeSlot, currentIndex, getNextIndex])

  // When only one video, ensure it loops
  useEffect(() => {
    if (VIDEO_SOURCES.length === 1) {
      if (videoARef.current) videoARef.current.loop = true
    }
  }, [])

  return (
    <>
      {/* Video Slot A */}
      <video
        ref={videoARef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: activeSlot === 'A' ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
          zIndex: activeSlot === 'A' ? 2 : 1,
          pointerEvents: 'none',
        }}
        muted
        playsInline
        preload="auto"
      />

      {/* Video Slot B */}
      <video
        ref={videoBRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: activeSlot === 'B' ? 1 : 0,
          transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
          zIndex: activeSlot === 'B' ? 2 : 1,
          pointerEvents: 'none',
        }}
        muted
        playsInline
        preload="auto"
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />

      {/* Aggressive hide native controls */}
      <style>{`
        video::-webkit-media-controls,
        video::-webkit-media-controls-panel,
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-start-playback-button,
        video::-webkit-media-controls-enclosure {
          display: none !important;
          -webkit-appearance: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </>
  )
}
