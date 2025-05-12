"use client"

import { X, CreditCard, Wallet, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Film {
  id: string
  title: string
  thumbnail: string
  genre: string
  year: string
  price: string
  trailerUrl?: string
}

interface PurchaseOptionsProps {
  film: Film
  onClose: () => void
  onPurchase: (type: string) => void
  onTrailerClick?: (film: Film) => void
}

export function PurchaseOptions({ film, onClose, onPurchase, onTrailerClick }: PurchaseOptionsProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-maroon-900 rounded-lg w-full max-w-md relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-gray-400 hover:text-white z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={film.thumbnail || "/placeholder.svg"}
              alt={film.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h2 className="text-xl font-bold">{film.title}</h2>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-maroon-400">{film.year}</span>
                <span className="px-1 py-0.5 bg-maroon-900/50 rounded text-xs">{film.genre}</span>
              </div>
            </div>
          </div>

          {film.trailerUrl && onTrailerClick && (
            <Button
              variant="outline"
              className="w-full mb-6 border-maroon-700 text-maroon-400 hover:text-maroon-300 hover:bg-maroon-900/20"
              onClick={() => onTrailerClick(film)}
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Trailer
            </Button>
          )}

          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="single" className="data-[state=active]:bg-maroon-900 data-[state=active]:text-white">
                <CreditCard className="h-4 w-4 mr-2" />
                Buy Film
              </TabsTrigger>
              <TabsTrigger
                value="subscription"
                className="data-[state=active]:bg-maroon-900 data-[state=active]:text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Subscribe
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-6">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Film Price</span>
                  <span className="font-bold">{film.price} ETH</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Platform Fee</span>
                  <span>0.00001 ETH</span>
                </div>
                <div className="border-t border-gray-800 my-2 pt-2 flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-maroon-400">
                    {(Number.parseFloat(film.price) + 0.00001).toFixed(5)} ETH
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => onPurchase("crypto")}
                  className="w-full bg-maroon-700 hover:bg-maroon-600 text-white flex items-center justify-center"
                >
                  <Wallet className="h-5 w-5 mr-2" />
                  Pay with Crypto
                </Button>
                <Button
                  onClick={() => onPurchase("card")}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay with Card
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By purchasing, you agree to our Terms of Service and acknowledge that you will own this film permanently
                in your library.
              </p>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-maroon-700 cursor-pointer transition-colors">
                  <h3 className="font-bold mb-2">Monthly</h3>
                  <p className="text-2xl font-bold mb-1">0.01 ETH</p>
                  <p className="text-xs text-gray-400 mb-4">per month</p>
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>Access all films</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>HD streaming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => onPurchase("monthly")}
                    className="w-full bg-maroon-700 hover:bg-maroon-600 text-white text-sm"
                  >
                    Subscribe Monthly
                  </Button>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border border-maroon-700 cursor-pointer transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-maroon-700 text-xs px-2 py-0.5 rounded-bl-md">
                    Best Value
                  </div>
                  <h3 className="font-bold mb-2">Annual</h3>
                  <p className="text-2xl font-bold mb-1">0.1 ETH</p>
                  <p className="text-xs text-gray-400 mb-4">per year (save 17%)</p>
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>Access all films</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>4K streaming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>Offline downloads</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-maroon-400 mr-2">✓</span>
                      <span>Exclusive content</span>
                    </li>
                  </ul>
                  <Button
                    onClick={() => onPurchase("annual")}
                    className="w-full bg-maroon-700 hover:bg-maroon-600 text-white text-sm"
                  >
                    Subscribe Annually
                  </Button>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Subscriptions automatically renew. You can cancel anytime from your account settings.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
