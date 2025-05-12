"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, Info, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Film {
  id: string
  title: string
  thumbnail: string
  genre: string
  year: string
  price: string
  trailerUrl?: string
}

interface ContentRowProps {
  title: string
  films: Film[]
  onPlayClick: (film: Film) => void
  onInfoClick: (film: Film, type: string) => void
  onTrailerClick: (film: Film) => void
}

export function ContentRow({ title, films, onPlayClick, onInfoClick, onTrailerClick }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [hoveredFilm, setHoveredFilm] = useState<string | null>(null)
  const [animationIndex, setAnimationIndex] = useState(0)

  // Animation effect for films when they appear
  useEffect(() => {
    const interval = setInterval(() => {
      if (animationIndex < films.length) {
        setAnimationIndex((prev) => prev + 1)
      } else {
        clearInterval(interval)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [films.length])

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })

      // Update arrow visibility after scroll
      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftArrow(rowRef.current.scrollLeft > 0)
          setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10)
        }
      }, 300)
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 0)
      setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10)
    }
  }

  return (
    <div className="relative px-4 md:px-8 mt-8 md:mt-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-maroon-300">{title}</h2>

      <div className="group relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Content Slider */}
        <div
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          {films.map((film, index) => (
            <div
              key={film.id}
              className={`relative flex-shrink-0 w-[300px] transition-all duration-500 ease-out ${
                index < animationIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredFilm(film.id)}
              onMouseLeave={() => setHoveredFilm(null)}
            >
              <div
                className={`relative rounded-md overflow-hidden transition-all duration-300 film-card ${
                  hoveredFilm === film.id ? "scale-110 z-10 shadow-xl shadow-maroon-900/50" : ""
                }`}
              >
                <img
                  src={film.thumbnail || "/placeholder.svg"}
                  alt={film.title}
                  className="w-full h-[169px] object-cover"
                />

                {/* Price Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-maroon-800 text-white text-xs px-2 py-0.5 flex items-center">
                    <DollarSign className="h-3 w-3 mr-0.5" />
                    {film.price} ETH
                  </Badge>
                </div>

                {/* Hover Content */}
                {hoveredFilm === film.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70 p-4 flex flex-col animate-fade-in">
                    <h3 className="font-bold mb-1">{film.title}</h3>
                    <div className="flex items-center space-x-2 text-xs mb-2">
                      <span className="text-maroon-400">{film.year}</span>
                      <span className="px-1 py-0.5 bg-maroon-900/50 rounded">{film.genre}</span>
                    </div>

                    <div className="flex space-x-2 mt-auto">
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white hover:bg-gray-200 text-black animate-pop-in"
                        style={{ animationDelay: "0.1s" }}
                        onClick={() => onPlayClick(film)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-maroon-900/70 hover:bg-maroon-800 animate-pop-in"
                        style={{ animationDelay: "0.2s" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`Added "${film.title}" to your list`)
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-maroon-900/70 hover:bg-maroon-800 animate-pop-in"
                        style={{ animationDelay: "0.3s" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          alert(`You liked "${film.title}"`)
                        }}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-maroon-900/70 hover:bg-maroon-800 ml-auto animate-pop-in"
                        style={{ animationDelay: "0.4s" }}
                        onClick={() => onInfoClick(film, "info")}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-maroon-900/70 hover:bg-maroon-800 animate-pop-in"
                        style={{ animationDelay: "0.35s" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onTrailerClick(film)
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  )
}
