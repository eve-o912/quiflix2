"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "@/components/user-profile"
import { Sidebar } from "@/components/sidebar"
import { FilmUpload } from "@/components/film-upload"
import { FilmsList } from "@/components/films-list"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="flex flex-col md:flex-row">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-4 md:p-8">
          <div className="mb-8">
            <UserProfile />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-900 border border-maroon-700">
              <TabsTrigger value="upload" className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white">
                Upload Film
              </TabsTrigger>
              <TabsTrigger value="films" className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white">
                My Films
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-maroon-700 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <FilmUpload />
            </TabsContent>

            <TabsContent value="films" className="mt-6">
              <FilmsList />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Analytics />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
