"use client"

import { useState, useRef, useEffect } from "react"
import { X, Play, Pause, Volume2, VolumeX, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TrailerModalProps {
  film: {
    id: string
    title: string
    trailerUrl: string
    thumbnail: string
  }
  onClose: () => void
}

export function TrailerModal({ film, onClose }: TrailerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === " " || e.key === "k") {
        togglePlay()
        e.preventDefault()
      } else if (e.key === "m") {
        toggleMute()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const togglePlay = () => {
    if (videoRef.current && !error) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        // Use a try-catch to handle potential play() promise rejection
        try {
          const playPromise = videoRef.current.play()
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.error("Error playing video:", err)
              setError("Unable to play video. Please try again later.")
            })
          }
        } catch (err) {
          console.error("Error playing video:", err)
          setError("Unable to play video. Please try again later.")
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoLoaded = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleVideoError = () => {
    setIsLoading(false)
    setError("Unable to load trailer. The video may be unavailable or in an unsupported format.")
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative aspect-video bg-black">
          {isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-maroon-900/50 flex items-center justify-center animate-pulse">
                <Play className="h-8 w-8 text-maroon-400" />
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 p-6 text-center">
              <AlertCircle className="h-12 w-12 text-maroon-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Trailer Unavailable</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <Button onClick={onClose} className="bg-maroon-700 hover:bg-maroon-600">
                Close
              </Button>
            </div>
          )}

          {/* Fallback thumbnail while video is loading or on error */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${film.thumbnail})` }}
          />

          {!error && (
            <video
              ref={videoRef}
              src={film.trailerUrl}
              poster={film.thumbnail}
              className="w-full h-full"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              onEnded={handleVideoEnded}
              onClick={togglePlay}
              playsInline
            />
          )}

          {/* Video Controls Overlay */}
          {!error && (
            <div className="absolute inset-0 flex flex-col">
              {/* Center play button */}
              {!isPlaying && (
                <div className="flex-1 flex items-center justify-center">
                  <Button
                    className="h-20 w-20 rounded-full bg-maroon-700/80 hover:bg-maroon-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                  >
                    {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1" />}
                  </Button>
                </div>
              )}

              {/* Bottom controls */}
              <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{film.title} - Official Trailer</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
