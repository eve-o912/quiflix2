"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Film, BarChart3, Upload, Wallet } from "lucide-react"
import { isEthereumAvailable, getEthereumProvider, getConnectedAccounts, requestAccounts } from "@/lib/ethereum"

export function UserProfile() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>("0")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      if (!isEthereumAvailable()) return

      try {
        const accounts = await getConnectedAccounts()

        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)

          // Get balance
          const provider = await getEthereumProvider()
          const balanceWei = await provider.getBalance(accounts[0])
          const balanceEth = Number.parseFloat(balanceWei.toString()) / 1e18
          setBalance(balanceEth.toFixed(4))
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }

    checkConnection()
  }, [])

  const connectWallet = async () => {
    if (!isEthereumAvailable()) {
      alert("Please install MetaMask or another Ethereum wallet")
      return
    }

    try {
      const accounts = await requestAccounts()

      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)

        // Get balance
        const provider = await getEthereumProvider()
        const balanceWei = await provider.getBalance(accounts[0])
        const balanceEth = Number.parseFloat(balanceWei.toString()) / 1e18
        setBalance(balanceEth.toFixed(4))
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  return (
    <Card className="bg-gray-900 border-maroon-700 border overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-center">
          <div className="bg-gradient-to-br from-maroon-900 to-maroon-700 p-6 w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-maroon-500">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
              <AvatarFallback className="bg-maroon-800 text-white">QF</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">Quiflix Creator</h2>
              <p className="text-gray-300 text-sm">Premium Content Producer</p>
            </div>
          </div>

          <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between w-full">
            <div className="flex gap-6 flex-wrap justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-maroon-400" />
                <div>
                  <p className="text-sm text-gray-400">Films</p>
                  <p className="font-medium">12</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-maroon-400" />
                <div>
                  <p className="text-sm text-gray-400">Uploads</p>
                  <p className="font-medium">8</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-maroon-400" />
                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="font-medium">2.45 ETH</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              {isConnected ? (
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Wallet className="h-4 w-4 text-maroon-400" />
                  <span className="text-sm">
                    {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                  </span>
                  <span className="text-maroon-400 text-sm ml-2">{balance} ETH</span>
                </div>
              ) : (
                <Button onClick={connectWallet} className="bg-maroon-700 hover:bg-maroon-600 text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
