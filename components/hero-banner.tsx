"use client"

import { Play, Info, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Film {
  id: string
  title: string
  description: string
  genre: string
  year: string
  duration: string
  rating: string
  thumbnail: string
  logo?: string
  price: string
}

interface HeroBannerProps {
  film: Film
  onPlayClick: () => void
  onInfoClick: () => void
  onTrailerClick: () => void
}

export function HeroBanner({ film, onPlayClick, onInfoClick, onTrailerClick }: HeroBannerProps) {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${film.thumbnail})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl pt-32 animate-slide-up">
          {film.logo ? (
            <img src={film.logo || "/placeholder.svg"} alt={film.title} className="w-2/3 mb-6" />
          ) : (
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-shadow-lg">{film.title}</h1>
          )}

          <div className="flex items-center space-x-4 mb-4 text-sm">
            <span className="text-maroon-400">{film.rating}</span>
            <span>{film.year}</span>
            <span>{film.duration}</span>
            <span className="px-2 py-0.5 bg-maroon-900/80 rounded text-xs">{film.genre}</span>
            <span className="px-2 py-0.5 bg-maroon-800 rounded text-xs flex items-center">{film.price} ETH</span>
          </div>

          <p className="text-gray-300 mb-8 text-lg">{film.description}</p>

          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-white hover:bg-gray-200 text-black font-medium px-8 animate-pop-in"
              onClick={onPlayClick}
            >
              <Play className="h-5 w-5 mr-2" />
              Play
            </Button>
            <Button
              variant="outline"
              className="border-gray-400 text-white hover:bg-maroon-900/50 animate-pop-in"
              style={{ animationDelay: "0.1s" }}
              onClick={onInfoClick}
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
            <Button
              variant="outline"
              className="border-gray-400 text-white hover:bg-maroon-900/50 animate-pop-in"
              style={{ animationDelay: "0.2s" }}
              onClick={() => alert(`Added "${film.title}" to your list`)}
            >
              <Plus className="h-5 w-5 mr-2" />
              My List
            </Button>
            <Button
              variant="outline"
              className="border-gray-400 text-white hover:bg-maroon-900/50 animate-pop-in"
              style={{ animationDelay: "0.3s" }}
              onClick={onTrailerClick}
            >
              <Play className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
