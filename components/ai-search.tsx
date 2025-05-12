"use client"

import { useState, useEffect, useRef } from "react"
import { X, Search, Sparkles, ArrowRight, Film, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AISearchProps {
  onClose: () => void
}

export function AISearch({ onClose }: AISearchProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [aiResponse, setAiResponse] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Load search history from localStorage
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // Sample suggestions
  const defaultSuggestions = [
    "Blockchain documentaries with high ratings",
    "Action films about crypto heists",
    "Films similar to The Blockchain Chronicles",
    "New releases about NFTs",
    "Films that explain DeFi concepts",
  ]

  // Perform AI search using Gemini API
  const performAISearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setAiResponse("")
    setError("")

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      if (!response.ok) {
        throw new Error(`Search request failed with status ${response.status}`)
      }

      const data = await response.json()

      // Simulate typing effect for AI response
      let displayedResponse = ""
      for (let i = 0; i < data.text.length; i++) {
        displayedResponse += data.text[i]
        setAiResponse(displayedResponse)
        await new Promise((resolve) => setTimeout(resolve, 10))
      }

      setSearchResults(data.results || [])
      setAiSuggestions(data.suggestions || [])

      // Save to search history
      if (searchQuery.trim() !== "") {
        const updatedHistory = [searchQuery, ...searchHistory.filter((item) => item !== searchQuery)].slice(0, 5)
        setSearchHistory(updatedHistory)
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
      }
    } catch (error) {
      console.error("Error searching with Gemini AI:", error)
      setError("Sorry, I encountered an error while searching. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performAISearch(query)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    performAISearch(suggestion)
  }

  return (
    <div className="bg-black/95 border border-maroon-700 rounded-lg w-full max-w-3xl mx-auto overflow-hidden">
      <div className="p-4 border-b border-maroon-800 flex items-center">
        <div className="flex items-center gap-2 flex-1">
          <Sparkles className="h-5 w-5 text-maroon-400" />
          <h2 className="text-lg font-semibold">Gemini AI Search</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask Gemini AI to find films for you..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 focus-visible:ring-maroon-500"
            />
          </div>
          <Button
            type="submit"
            className="bg-maroon-700 hover:bg-maroon-600 text-white"
            disabled={isSearching || !query.trim()}
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400 text-sm">{error}</div>
        )}

        {!searchResults.length && !isSearching && !error && (
          <>
            {searchHistory.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-400">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-800 hover:bg-maroon-900 cursor-pointer"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-maroon-400" />
                <h3 className="text-sm font-medium text-gray-400">Try asking Gemini AI</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {defaultSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-900 rounded-md hover:bg-maroon-900/30 cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <p className="text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {isSearching && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-maroon-900/30 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-maroon-400" />
              </div>
              <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full bg-maroon-800 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
            <p className="mt-4 text-gray-400">Searching with Gemini AI...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-4">
            {aiResponse && (
              <div className="mb-6 p-4 bg-maroon-900/20 rounded-lg border border-maroon-800">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Gemini AI" />
                    <AvatarFallback className="bg-maroon-800">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-300">{aiResponse}</p>
                  </div>
                </div>
              </div>
            )}

            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Film className="h-5 w-5 text-maroon-400" />
              Search Results
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-maroon-700 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={result.thumbnail || "/placeholder.svg"}
                      alt={result.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-maroon-700">{result.relevance}</Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium mb-1">{result.title}</h4>
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <span>{result.year}</span>
                      <span className="mx-2">•</span>
                      <span>{result.genre}</span>
                      <span className="mx-2">•</span>
                      <span>{result.price} ETH</span>
                    </div>
                    <Button
                      className="w-full bg-maroon-700 hover:bg-maroon-600 text-white text-sm h-8"
                      onClick={() => {
                        // In a real app, this would navigate to the film page
                        // For now, we'll just alert
                        alert(`Navigating to film: ${result.title}`)
                      }}
                    >
                      Watch Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {aiSuggestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Related Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-800 hover:bg-maroon-900 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
