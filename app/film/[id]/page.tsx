"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MaroonPatterns } from "@/components/maroon-patterns"
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, Plus, ThumbsUp, Share2 } from "lucide-react"
import { TrailerModal } from "@/components/trailer-modal"

// Mock film data
const mockFilms = {
  "1": {
    id: "1",
    title: "The Blockchain Chronicles",
    description:
      "In a world where digital currencies rule, follow the journey of pioneers who shaped the blockchain revolution and changed the future of finance forever.",
    genre: "Documentary",
    year: "2023",
    duration: "2h 0m",
    rating: "PG-13",
    thumbnail: "/placeholder.svg?height=600&width=1200",
    videoUrl: "https://example.com/blockchain-chronicles.mp4", // This would be a real video URL in production
    trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Updated URL
    director: "Alex Johnson",
    cast: ["Sarah Chen", "Michael Rodriguez", "David Kim"],
    price: "0.00049",
  },
  "2": {
    id: "2",
    title: "Crypto Heist",
    description:
      "When a team of elite hackers targets the world's largest cryptocurrency exchange, a former security expert must stop them before they destabilize the global economy.",
    genre: "Action",
    year: "2023",
    duration: "1h 45m",
    rating: "R",
    thumbnail: "/placeholder.svg?height=600&width=1200",
    videoUrl: "https://example.com/crypto-heist.mp4",
    trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Updated URL
    director: "Maria Sanchez",
    cast: ["John Blake", "Emma Stone", "Robert Lee"],
    price: "0.00079",
  },
  // Add more films as needed
}

export default function FilmPage() {
  const params = useParams()
  const router = useRouter()
  const filmId = params.id as string

  const [film, setFilm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showTrailerModal, setShowTrailerModal] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    } else {
      // Redirect to home if not logged in
      router.push("/")
      return
    }

    // Fetch film data
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      const filmData = mockFilms[filmId]
      if (filmData) {
        setFilm(filmData)
      } else {
        // Handle film not found
        router.push("/")
      }
      setLoading(false)
    }, 1000)

    // Auto-hide controls after 3 seconds
    const controlsTimer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => {
      clearTimeout(controlsTimer)
    }
  }, [filmId, router])

  // Simulate video progress
  useEffect(() => {
    if (!isPlaying || !film) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false)
          return 100
        }
        return prev + 0.5
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, film])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    setShowControls(true)

    // Reset auto-hide timer
    setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleMouseMove = () => {
    setShowControls(true)

    // Reset auto-hide timer
    clearTimeout(window.controlsTimerId)
    window.controlsTimerId = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-maroon-900/50 flex items-center justify-center mb-4">
            <Play className="h-8 w-8 text-maroon-400" />
          </div>
          <p className="text-maroon-400">Loading film...</p>
        </div>
      </div>
    )
  }

  if (!film) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Film Not Found</h2>
          <Button onClick={() => router.push("/")} className="bg-maroon-700 hover:bg-maroon-600">
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <MaroonPatterns />

      <div className="relative z-10">
        <Navbar scrolled={true} onLoginClick={() => {}} isLoggedIn={isLoggedIn} />

        <div className="pt-20">
          {/* Video Player */}
          <div
            className="relative w-full aspect-video bg-black cursor-pointer"
            onClick={togglePlay}
            onMouseMove={handleMouseMove}
          >
            {/* Video Placeholder (would be a real video element in production) */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${film.thumbnail})` }}>
              {/* Overlay for better text visibility */}
              <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
              ></div>
            </div>

            {/* Play/Pause Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
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

            {/* Video Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress Bar */}
              <div className="w-full h-1 bg-gray-700 rounded-full mb-4 cursor-pointer">
                <div className="h-full bg-maroon-600 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMute()
                    }}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>

                  <span className="text-sm">
                    {Math.floor((progress / 100) * 120)}:00 / {film.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Film Info */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/")}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">{film.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className="bg-maroon-700">{film.rating}</Badge>
              <span>{film.year}</span>
              <span>{film.duration}</span>
              <Badge className="bg-gray-800">{film.genre}</Badge>
              <Badge className="bg-maroon-900/80 flex items-center">{film.price} ETH</Badge>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button className="bg-maroon-700 hover:bg-maroon-600">
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
              <Button
                variant="outline"
                className="border-gray-700"
                onClick={() => alert(`Added "${film.title}" to your list`)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to List
              </Button>
              <Button
                variant="outline"
                className="border-gray-700"
                onClick={() => alert(`Thank you for rating "${film.title}"`)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Rate
              </Button>
              <Button
                variant="outline"
                className="border-gray-700"
                onClick={() => alert(`Share link for "${film.title}" copied to clipboard`)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-gray-700" onClick={() => setShowTrailerModal(true)}>
                <Play className="h-4 w-4 mr-2" />
                Watch Trailer
              </Button>
            </div>

            <p className="text-gray-300 mb-8 max-w-3xl">{film.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-400 w-24">Director:</span>
                    <span>{film.director}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Cast:</span>
                    <span>{film.cast.join(", ")}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Genre:</span>
                    <span>{film.genre}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-24">Release:</span>
                    <span>{film.year}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Blockchain Info</h2>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-gray-400 w-32">Token ID:</span>
                    <span className="text-maroon-400">0x3f5a9e7c2b...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-32">Contract:</span>
                    <span className="text-maroon-400">0x8c1c32771c...</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-32">Purchase Price:</span>
                    <span>{film.price} ETH</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 w-32">Ownership:</span>
                    <span>Permanent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trailer Modal */}
      {showTrailerModal && film && <TrailerModal film={film} onClose={() => setShowTrailerModal(false)} />}
    </div>
  )
}
