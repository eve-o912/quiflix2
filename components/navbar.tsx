"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Upload,
  Trash2,
  CreditCard,
  UserCircle,
  Settings,
  LogOut,
  FilmIcon,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnimatedLogo } from "@/components/animated-logo"
import { AISearch } from "@/components/ai-search"
import Link from "next/link"

interface NavbarProps {
  scrolled: boolean
  onLoginClick: () => void
  isLoggedIn: boolean
}

export function Navbar({ scrolled, onLoginClick, isLoggedIn }: NavbarProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAISearch, setShowAISearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false)
        setShowAISearch(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex items-center mr-8">
              <AnimatedLogo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-maroon-400 transition-colors flex items-center">
                <div className="animated-film-icon mr-2">
                  <FilmIcon className="h-4 w-4" />
                </div>
                Home
              </Link>
              <Link href="/films" className="text-sm font-medium hover:text-maroon-400 transition-colors">
                Films
              </Link>
              <Link href="/new" className="text-sm font-medium hover:text-maroon-400 transition-colors">
                New & Popular
              </Link>
              <Link href="/my-list" className="text-sm font-medium hover:text-maroon-400 transition-colors">
                My List
              </Link>
              <Link href="/genres" className="text-sm font-medium hover:text-maroon-400 transition-colors">
                Browse by Genre
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              {showSearch || showAISearch ? (
                <div className="absolute right-0 top-0 flex items-center bg-black/90 border border-maroon-700 rounded-md overflow-hidden">
                  {showAISearch ? (
                    <AISearch onClose={() => setShowAISearch(false)} />
                  ) : (
                    <>
                      <Input
                        type="search"
                        placeholder="Titles, people, genres"
                        className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-64"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full text-maroon-400"
                        onClick={() => setShowAISearch(true)}
                        title="AI Search"
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-full" onClick={() => setShowSearch(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} aria-label="Search">
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => alert("Notifications feature coming soon")}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Menu or Sign In */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-8 w-8 rounded-sm">
                    <Avatar className="h-8 w-8 rounded-sm">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="rounded-sm bg-maroon-800">QF</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black border-maroon-800">
                  <DropdownMenuLabel className="text-maroon-400">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-maroon-900" />

                  <DropdownMenuItem className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50" asChild>
                    <Link href="/profile">
                      <UserCircle className="h-4 w-4 mr-2 text-maroon-400" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2 text-maroon-400" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-maroon-900" />

                  <DropdownMenuItem className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50" asChild>
                    <Link href="/subscription">
                      <CreditCard className="h-4 w-4 mr-2 text-maroon-400" />
                      Subscription
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50" asChild>
                    <Link href="/upload">
                      <Upload className="h-4 w-4 mr-2 text-maroon-400" />
                      Upload Film
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50" asChild>
                    <Link href="/manage-films">
                      <Trash2 className="h-4 w-4 mr-2 text-maroon-400" />
                      Manage Films
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-maroon-900" />

                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-maroon-900/50 focus:bg-maroon-900/50"
                    onClick={() => {
                      // Handle logout
                      console.log("Logging out")
                      window.location.href = "/"
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2 text-maroon-400" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLoginClick} className="bg-maroon-700 hover:bg-maroon-600 text-white">
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-black/95 py-4 px-2 absolute top-16 left-0 right-0 border-t border-maroon-900">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium hover:text-maroon-400 transition-colors px-2 flex items-center"
              >
                <div className="animated-film-icon mr-2">
                  <FilmIcon className="h-4 w-4" />
                </div>
                Home
              </Link>
              <Link href="/films" className="text-sm font-medium hover:text-maroon-400 transition-colors px-2">
                Films
              </Link>
              <Link href="/new" className="text-sm font-medium hover:text-maroon-400 transition-colors px-2">
                New & Popular
              </Link>
              <Link href="/my-list" className="text-sm font-medium hover:text-maroon-400 transition-colors px-2">
                My List
              </Link>
              <Link href="/genres" className="text-sm font-medium hover:text-maroon-400 transition-colors px-2">
                Browse by Genre
              </Link>

              <div className="relative px-2 py-2">
                <div className="flex items-center bg-black/90 border border-maroon-700 rounded-md overflow-hidden">
                  <Input
                    type="search"
                    placeholder="Search with Gemini AI..."
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
                    onClick={() => setShowAISearch(true)}
                  />
                  <Button variant="ghost" size="icon" className="h-full text-maroon-400">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="pt-2 border-t border-maroon-900">
                  <div className="flex items-center space-x-4 px-2">
                    <Avatar className="h-8 w-8 rounded-sm">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="rounded-sm bg-maroon-800">QF</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">User Profile</p>
                      <p className="text-xs text-maroon-400">Account & Settings</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Link
                      href="/subscription"
                      className="flex items-center text-sm px-2 py-1 hover:bg-maroon-900/30 rounded"
                    >
                      <CreditCard className="h-4 w-4 mr-2 text-maroon-400" />
                      Subscription
                    </Link>
                    <Link href="/upload" className="flex items-center text-sm px-2 py-1 hover:bg-maroon-900/30 rounded">
                      <Upload className="h-4 w-4 mr-2 text-maroon-400" />
                      Upload Film
                    </Link>
                    <Link
                      href="/manage-films"
                      className="flex items-center text-sm px-2 py-1 hover:bg-maroon-900/30 rounded"
                    >
                      <Trash2 className="h-4 w-4 mr-2 text-maroon-400" />
                      Manage Films
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-maroon-900">
                  <Button onClick={onLoginClick} className="w-full bg-maroon-700 hover:bg-maroon-600 text-white">
                    Sign In
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* AI Search Modal (Mobile) */}
      {showAISearch && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-50 p-4">
          <AISearch onClose={() => setShowAISearch(false)} />
        </div>
      )}
    </header>
  )
}
