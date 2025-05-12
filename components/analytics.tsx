import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, DollarSign, Eye } from "lucide-react"

export function Analytics() {
  return (
    <Card className="bg-gray-900 border-maroon-700 border">
      <CardHeader className="bg-gradient-to-r from-maroon-900 to-maroon-700 text-white">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          <CardTitle>Analytics Dashboard</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <h3 className="text-2xl font-bold mt-1">4,255</h3>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-maroon-900/50 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-maroon-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">1.305 ETH</h3>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.3% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-maroon-900/50 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-maroon-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Unique Viewers</p>
                  <h3 className="text-2xl font-bold mt-1">892</h3>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.2% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-maroon-900/50 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-maroon-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Performing Films</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "The Blockchain Chronicles", views: 1245, revenue: "0.612 ETH" },
                  { title: "Web3 Pioneers", views: 2134, revenue: "0.000 ETH" },
                  { title: "Crypto Heist", views: 876, revenue: "0.693 ETH" },
                ].map((film, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-maroon-900 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span>{film.title}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-sm text-gray-400">
                        <Eye className="h-3 w-3 inline mr-1" />
                        {film.views}
                      </div>
                      <div className="text-sm text-gray-400">
                        <DollarSign className="h-3 w-3 inline mr-1" />
                        {film.revenue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue by Genre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { genre: "Documentary", percentage: 45, revenue: "0.612 ETH" },
                  { genre: "Action", percentage: 30, revenue: "0.693 ETH" },
                  { genre: "Romance", percentage: 15, revenue: "0.000 ETH" },
                  { genre: "Other", percentage: 10, revenue: "0.000 ETH" },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.genre}</span>
                      <span>{item.revenue}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-maroon-700 to-maroon-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
