"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Save, Key, Bell, Shield, CreditCard } from "lucide-react"

export function Settings() {
  return (
    <Card className="bg-gray-900 border-maroon-700 border">
      <CardHeader className="bg-gradient-to-r from-maroon-900 to-maroon-700 text-white">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          <CardTitle>Settings</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Key className="h-5 w-5 text-maroon-400" />
              API Keys
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pinataApiKey">Pinata API Key</Label>
                <Input
                  id="pinataApiKey"
                  placeholder="Enter your Pinata API Key"
                  className="bg-gray-800 border-gray-700"
                  type="password"
                  defaultValue="YOUR_PINATA_API_KEY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinataSecretKey">Pinata Secret Key</Label>
                <Input
                  id="pinataSecretKey"
                  placeholder="Enter your Pinata Secret Key"
                  className="bg-gray-800 border-gray-700"
                  type="password"
                  defaultValue="YOUR_PINATA_SECRET_API_KEY"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-800" />

          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-maroon-400" />
              Contract Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractAddress">Film Contract Address</Label>
                <Input
                  id="contractAddress"
                  placeholder="Enter your contract address"
                  className="bg-gray-800 border-gray-700"
                  defaultValue="0x123..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultPrice">Default Film Price (ETH)</Label>
                <Input
                  id="defaultPrice"
                  type="number"
                  step="0.00001"
                  placeholder="Default price for new films"
                  className="bg-gray-800 border-gray-700"
                  defaultValue="0.00049"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-800" />

          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-maroon-400" />
              Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive email notifications for film purchases</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Revenue Alerts</p>
                  <p className="text-sm text-gray-400">Get notified when you receive revenue</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Comments</p>
                  <p className="text-sm text-gray-400">Get notified when viewers comment on your films</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-800" />

          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-maroon-400" />
              Privacy
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-gray-400">Make your creator profile visible to others</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Revenue</p>
                  <p className="text-sm text-gray-400">Display your revenue publicly</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              className="bg-gradient-to-r from-maroon-800 to-maroon-600 hover:from-maroon-700 hover:to-maroon-500"
              onClick={() => alert("Settings saved successfully!")}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
