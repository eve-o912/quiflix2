"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { ContentRow } from "@/components/content-row"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { PurchaseOptions } from "@/components/purchase-options"
import { MaroonPatterns } from "@/components/maroon-patterns"
import { TrailerModal } from "@/components/trailer-modal"

// Mock data for films
const featuredFilm = {
  id: "1",
  title: "The Blockchain Chronicles",
  description:
    "In a world where digital currencies rule, follow the journey of pioneers who shaped the blockchain revolution and changed the future of finance forever.",
  genre: "Documentary",
  year: "2023",
  duration: "2h 0m",
  rating: "PG-13",
  thumbnail: "/placeholder.svg?height=600&width=1200",
  logo: "/placeholder.svg?height=200&width=400",
  price: "0.00049",
  trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Updated URL
}

const trendingFilms = [
  {
    id: "1",
    title: "The Blockchain Chronicles",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2023",
    price: "0.00049",
    trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Updated URL
  },
  {
    id: "2",
    title: "Crypto Heist",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Action",
    year: "2023",
    price: "0.00079",
    trailerUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Updated URL
  },
  {
    id: "3",
    title: "Web3 Pioneers",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2023",
    price: "0.00049",
  },
  {
    id: "4",
    title: "Metaverse Love Story",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Romance",
    year: "2023",
    price: "0.00059",
  },
  {
    id: "5",
    title: "NFT: Digital Revolution",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2022",
    price: "0.00049",
  },
  {
    id: "6",
    title: "Decentralized",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Thriller",
    year: "2023",
    price: "0.00069",
  },
]

const documentaries = [
  {
    id: "3",
    title: "Web3 Pioneers",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2023",
    price: "0.00049",
  },
  {
    id: "5",
    title: "NFT: Digital Revolution",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2022",
    price: "0.00049",
  },
  {
    id: "7",
    title: "Satoshi's Vision",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2021",
    price: "0.00039",
  },
  {
    id: "8",
    title: "Mining the Future",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2022",
    price: "0.00049",
  },
  {
    id: "9",
    title: "DeFi Explained",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2023",
    price: "0.00049",
  },
]

const actionFilms = [
  {
    id: "2",
    title: "Crypto Heist",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Action",
    year: "2023",
    price: "0.00079",
  },
  {
    id: "10",
    title: "Blockchain Bandits",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Action",
    year: "2022",
    price: "0.00069",
  },
  {
    id: "11",
    title: "Digital Assassin",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Action",
    year: "2023",
    price: "0.00079",
  },
  {
    id: "12",
    title: "Hack Attack",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Action",
    year: "2021",
    price: "0.00059",
  },
]

const exclusiveContent = [
  {
    id: "13",
    title: "Quiflix Original: Crypto Dreams",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Drama",
    year: "2023",
    price: "0.00089",
  },
  {
    id: "14",
    title: "Quiflix Original: The Mining Farm",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Documentary",
    year: "2023",
    price: "0.00079",
  },
  {
    id: "15",
    title: "Quiflix Original: Token Tales",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Anthology",
    year: "2023",
    price: "0.00069",
  },
  {
    id: "16",
    title: "Quiflix Original: Whale Watchers",
    thumbnail: "/placeholder.svg?height=169&width=300",
    genre: "Reality",
    year: "2023",
    price: "0.00059",
  },
]

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPurchaseOptions, setShowPurchaseOptions] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [selectedTrailer, setSelectedTrailer] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = (method) => {
    console.log(`Logging in with ${method}`)
    // In a real app, this would handle the authentication
    setIsLoggedIn(true)
    localStorage.setItem("isLoggedIn", "true")
    setShowAuthModal(false)
  }

  const handlePurchase = (film, purchaseType) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }

    setSelectedFilm(film)
    setShowPurchaseOptions(true)
  }

  const handlePlayFilm = (film) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }

    console.log(`Playing film: ${film.title}`)
    // Navigate to film player
    window.location.href = `/film/${film.id}`
  }

  const handleTrailerClick = (film) => {
    if (!film.trailerUrl) {
      alert("Trailer not available for this film.")
      return
    }

    setSelectedTrailer(film)
    setShowTrailerModal(true)
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white relative overflow-hidden">
      {/* Maroon patterns and accents */}
      <MaroonPatterns />

      <div className="relative z-10">
        <Navbar scrolled={scrolled} onLoginClick={() => setShowAuthModal(true)} isLoggedIn={isLoggedIn} />

        <HeroBanner
          film={featuredFilm}
          onPlayClick={() => handlePlayFilm(featuredFilm)}
          onInfoClick={() => handlePurchase(featuredFilm, "info")}
          onTrailerClick={() => handleTrailerClick(featuredFilm)}
        />

        <div className="pb-20">
          <ContentRow
            title="Trending Now"
            films={trendingFilms}
            onPlayClick={handlePlayFilm}
            onInfoClick={handlePurchase}
            onTrailerClick={handleTrailerClick}
          />
          <ContentRow
            title="Documentaries"
            films={documentaries}
            onPlayClick={handlePlayFilm}
            onInfoClick={handlePurchase}
            onTrailerClick={handleTrailerClick}
          />
          <ContentRow
            title="Action"
            films={actionFilms}
            onPlayClick={handlePlayFilm}
            onInfoClick={handlePurchase}
            onTrailerClick={handleTrailerClick}
          />
          <ContentRow
            title="Quiflix Exclusives"
            films={exclusiveContent}
            onPlayClick={handlePlayFilm}
            onInfoClick={handlePurchase}
            onTrailerClick={handleTrailerClick}
          />
        </div>

        <Footer />
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}

      {/* Purchase Options Modal */}
      {showPurchaseOptions && selectedFilm && (
        <PurchaseOptions
          film={selectedFilm}
          onClose={() => setShowPurchaseOptions(false)}
          onPurchase={(type) => {
            console.log(`Purchasing ${selectedFilm.title} with ${type}`)

            // Simulate successful purchase
            setTimeout(() => {
              alert(`Successfully purchased "${selectedFilm.title}" with ${type}!`)
              setShowPurchaseOptions(false)

              // Redirect to film page
              window.location.href = `/film/${selectedFilm.id}`
            }, 1500)
          }}
          onTrailerClick={handleTrailerClick}
        />
      )}

      {/* Trailer Modal */}
      {showTrailerModal && selectedTrailer && (
        <TrailerModal film={selectedTrailer} onClose={() => setShowTrailerModal(false)} />
      )}
    </div>
  )
}
