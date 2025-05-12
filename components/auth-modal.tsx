"use client"

import { useState } from "react"
import { X, Mail, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedLogo } from "@/components/animated-logo"

interface AuthModalProps {
  onClose: () => void
  onLogin: (method: string) => void
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("email")

  const handleEmailLogin = (e) => {
    e.preventDefault()
    onLogin("email")
  }

  const handleWalletLogin = () => {
    onLogin("wallet")
  }

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
          <div className="flex justify-center mb-6">
            <AnimatedLogo />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="email" className="data-[state=active]:bg-maroon-900 data-[state=active]:text-white">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger value="wallet" className="data-[state=active]:bg-maroon-900 data-[state=active]:text-white">
                <Wallet className="h-4 w-4 mr-2" />
                Wallet
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-maroon-700 hover:bg-maroon-600 text-white">
                    Sign In with Email
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <a href="#" className="text-maroon-400 hover:underline">
                    Sign Up
                  </a>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <p className="text-center text-gray-400">
                Connect your wallet to access your account and purchase films with cryptocurrency.
              </p>

              <Button
                onClick={handleWalletLogin}
                className="w-full bg-maroon-700 hover:bg-maroon-600 text-white flex items-center justify-center"
              >
                <Wallet className="h-5 w-5 mr-2" />
                Connect Wallet
              </Button>

              <div className="flex items-center gap-4 text-xs text-gray-500 before:h-px before:flex-1 before:bg-gray-800 after:h-px after:flex-1 after:bg-gray-800">
                Supported Wallets
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <img src="/placeholder.svg?height=40&width=40" alt="MetaMask" className="h-10 w-10 mb-2" />
                  <span className="text-xs">MetaMask</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <img src="/placeholder.svg?height=40&width=40" alt="WalletConnect" className="h-10 w-10 mb-2" />
                  <span className="text-xs">WalletConnect</span>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                  <img src="/placeholder.svg?height=40&width=40" alt="Coinbase" className="h-10 w-10 mb-2" />
                  <span className="text-xs">Coinbase</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
