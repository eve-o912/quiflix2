"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Edit, Trash2, Eye, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockFilms = [
  {
    id: "1",
    title: "The Blockchain Chronicles",
    genre: "Documentary",
    duration: 120,
    price: "0.00049",
    releaseDate: "2023-05-15",
    status: "active",
    views: 1245,
    revenue: "0.612",
    thumbnail: "/placeholder.svg?height=120&width=200",
    subscriberOnly: false,
  },
  {
    id: "2",
    title: "Crypto Heist",
    genre: "Action",
    duration: 95,
    price: "0.00079",
    releaseDate: "2023-07-22",
    status: "active",
    views: 876,
    revenue: "0.693",
    thumbnail: "/placeholder.svg?height=120&width=200",
    subscriberOnly: false,
  },
  {
    id: "3",
    title: "Web3 Pioneers",
    genre: "Documentary",
    duration: 105,
    price: "0",
    releaseDate: "2023-09-10",
    status: "active",
    views: 2134,
    revenue: "0",
    thumbnail: "/placeholder.svg?height=120&width=200",
    subscriberOnly: true,
  },
  {
    id: "4",
    title: "Metaverse Love Story",
    genre: "Romance",
    duration: 110,
    price: "0.00059",
    releaseDate: "2023-11-05",
    status: "pending",
    views: 0,
    revenue: "0",
    thumbnail: "/placeholder.svg?height=120&width=200",
    subscriberOnly: false,
  },
]

export function FilmsList() {
  return (
    <Card className="bg-gray-900 border-maroon-700 border">
      <CardHeader className="bg-gradient-to-r from-maroon-900 to-maroon-700 text-white">
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5" />
          <CardTitle>My Films</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {mockFilms.map((film) => (
            <div
              key={film.id}
              className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-maroon-700 transition-colors"
            >
              <div className="w-full md:w-48 h-28 bg-gray-700 rounded-md overflow-hidden">
                <img
                  src={film.thumbnail || "/placeholder.svg"}
                  alt={film.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-medium">{film.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={film.status === "active" ? "bg-green-800" : "bg-yellow-800"}>
                      {film.status === "active" ? "Active" : "Pending"}
                    </Badge>
                    {film.subscriberOnly && <Badge className="bg-maroon-800">Subscriber Only</Badge>}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Genre</p>
                    <p className="text-sm">{film.genre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className="text-sm">{film.duration} min</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-sm">{film.subscriberOnly ? "Subscription" : `${film.price} ETH`}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Release Date</p>
                    <p className="text-sm">{film.releaseDate}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-maroon-400" />
                      <span className="text-sm">{film.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-maroon-400" />
                      <span className="text-sm">{film.revenue} ETH</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-maroon-700 text-maroon-400 hover:text-maroon-300 hover:bg-maroon-900/20"
                      onClick={() => alert(`Viewing ${film.title}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-maroon-700 text-maroon-400 hover:text-maroon-300 hover:bg-maroon-900/20"
                      onClick={() => alert(`Editing ${film.title}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-900 text-red-500 hover:text-red-400 hover:bg-red-900/20"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${film.title}"?`)) {
                          alert(`${film.title} has been deleted`)
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
