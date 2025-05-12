"use client"

import { Film, Upload, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "upload", label: "Upload Film", icon: <Upload className="h-5 w-5" /> },
    { id: "films", label: "My Films", icon: <Film className="h-5 w-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="bg-gray-900 w-full md:w-64 md:min-h-screen p-4 border-r border-maroon-900">
      <div className="flex items-center gap-2 mb-8">
        <Film className="h-8 w-8 text-maroon-500" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-maroon-400 to-red-300 text-transparent bg-clip-text">
          Quiflix Admin
        </h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start ${
              activeTab === item.id
                ? "bg-maroon-900/50 text-maroon-300"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </nav>

      <Separator className="my-6 bg-gray-800" />

      <Button
        variant="ghost"
        className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800"
        onClick={() => {
          if (confirm("Are you sure you want to logout?")) {
            alert("You have been logged out")
            window.location.href = "/"
          }
        }}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </Button>
    </div>
  )
}
