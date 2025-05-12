"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Plus, Trash2, Upload, Film, Wallet } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  isEthereumAvailable,
  getEthereumProvider,
  getEthereumSigner,
  getConnectedAccounts,
  requestAccounts,
  createContract,
} from "@/lib/ethereum"

// Replace with your deployed contract address
const FILM_CONTRACT_ADDRESS = "0x123..."

// Replace with your Pinata API keys
const PINATA_API_KEY = "YOUR_PINATA_API_KEY"
const PINATA_SECRET_API_KEY = "YOUR_PINATA_SECRET_API_KEY"

// Mock ABI for the component to work
const QuiflixFilmABI = {
  abi: [
    {
      name: "listFilm",
      type: "function",
      inputs: [
        { name: "tokenId", type: "string" },
        { name: "price", type: "uint256" },
        { name: "videoHash", type: "string" },
        { name: "metadataString", type: "string" },
        { name: "investorAddresses", type: "address[]" },
        { name: "investorShares", type: "uint256[]" },
      ],
      outputs: [],
    },
    {
      name: "preMintForSubscription",
      type: "function",
      inputs: [
        { name: "tokenId", type: "string" },
        { name: "videoHash", type: "string" },
        { name: "metadataString", type: "string" },
      ],
      outputs: [],
    },
  ],
}

const QuiflixAdmin = () => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [account, setAccount] = useState(null)
  const [filmContract, setFilmContract] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [statusType, setStatusType] = useState("info") // 'info', 'success', 'error'

  // Film data
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [director, setDirector] = useState("")
  const [cast, setCast] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [duration, setDuration] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [price, setPrice] = useState("0.00049")
  const [tokenId, setTokenId] = useState("")
  const [subscriberOnly, setSubscriberOnly] = useState(false)

  // Investor data for revenue sharing
  const [investors, setInvestors] = useState([{ address: "", share: "" }])

  // Connect to wallet and contract
  useEffect(() => {
    const init = async () => {
      try {
        if (!isEthereumAvailable()) {
          console.error("Ethereum wallet not detected")
          setStatus("Ethereum wallet not detected. Please install MetaMask or another wallet.")
          setStatusType("error")
          return
        }

        // Use our utility functions
        const web3Provider = await getEthereumProvider()
        await requestAccounts()

        // Get signer and account
        const web3Signer = await getEthereumSigner()
        const accounts = await getConnectedAccounts()

        setProvider(web3Provider)
        setSigner(web3Signer)
        setAccount(accounts[0])

        // Create contract
        const filmContractInstance = createContract(FILM_CONTRACT_ADDRESS, QuiflixFilmABI.abi, web3Signer)

        setFilmContract(filmContractInstance)
        setStatus("Wallet connected successfully")
        setStatusType("success")
      } catch (error) {
        console.error("Initialization error:", error)
        setStatus(`Initialization error: ${error.message}`)
        setStatusType("error")
      }
    }

    init()
  }, [])

  // Handle changes to investor fields
  const handleInvestorChange = (index, field, value) => {
    const newInvestors = [...investors]
    newInvestors[index][field] = value
    setInvestors(newInvestors)
  }

  // Add a new investor field
  const addInvestor = () => {
    setInvestors([...investors, { address: "", share: "" }])
  }

  // Remove an investor field
  const removeInvestor = (index) => {
    const newInvestors = [...investors]
    newInvestors.splice(index, 1)
    setInvestors(newInvestors)
  }

  // Upload file to IPFS via Pinata
  const uploadToPinata = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;`,
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })

      return response.data.IpfsHash
    } catch (error) {
      console.error("Error uploading to Pinata:", error)
      throw error
    }
  }

  // Upload metadata JSON to IPFS via Pinata
  const uploadMetadataToPinata = async (metadata) => {
    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      })

      return response.data.IpfsHash
    } catch (error) {
      console.error("Error uploading metadata to Pinata:", error)
      throw error
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!filmContract) {
      setStatus("Contract not initialized")
      setStatusType("error")
      return
    }

    try {
      setLoading(true)
      setStatus("Uploading files to IPFS...")
      setStatusType("info")

      // Upload thumbnail first if available
      let thumbnailHash = ""
      if (thumbnailFile) {
        thumbnailHash = await uploadToPinata(thumbnailFile)
        setStatus("Thumbnail uploaded to IPFS")
      }

      // Upload video file
      const videoHash = await uploadToPinata(videoFile)
      setStatus("Video uploaded to IPFS")

      // Create and upload metadata
      const metadata = {
        title,
        description,
        genre,
        director,
        cast,
        releaseDate,
        duration: Number.parseInt(duration) || 0,
        thumbnail: thumbnailHash,
        shortDescription: description.substring(0, 100) + (description.length > 100 ? "..." : ""),
      }

      const metadataString = JSON.stringify(metadata)

      // Filter out empty investors
      const filteredInvestors = investors.filter((inv) => inv.address && inv.share)
      const investorAddresses = filteredInvestors.map((inv) => inv.address)
      const investorShares = filteredInvestors.map((inv) => ethers.parseUnits(inv.share, 18))

      // List film on the blockchain
      setStatus("Listing film on the blockchain...")

      let tx
      if (subscriberOnly) {
        // Pre-mint for subscriber access
        tx = await filmContract.preMintForSubscription(tokenId || Date.now().toString(), videoHash, metadataString)
      } else {
        // Regular film listing with price
        tx = await filmContract.listFilm(
          tokenId || Date.now().toString(),
          ethers.parseEther(price.toString()),
          videoHash,
          metadataString,
          investorAddresses,
          investorShares,
        )
      }

      await tx.wait()

      setStatus("Film successfully listed on Quiflix!")
      setStatusType("success")
      resetForm()
    } catch (error) {
      console.error("Error uploading film:", error)
      setStatus(`Error: ${error.message}`)
      setStatusType("error")
    } finally {
      setLoading(false)
    }
  }

  // Reset form after submission
  const resetForm = () => {
    setTitle("")
    setDescription("")
    setGenre("")
    setDirector("")
    setCast("")
    setReleaseDate("")
    setDuration("")
    setVideoFile(null)
    setThumbnailFile(null)
    setPrice("0.00049")
    setTokenId("")
    setSubscriberOnly(false)
    setInvestors([{ address: "", share: "" }])
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6" />
              <CardTitle className="text-2xl">Quiflix Admin Panel</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm bg-black/20 px-3 py-1 rounded-full">
              <Wallet className="h-4 w-4" />
              {account ? (
                <span>
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </span>
              ) : (
                <span>Not connected</span>
              )}
            </div>
          </div>
          <CardDescription className="text-gray-200 mt-2">Upload and manage films on the blockchain</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Film
          </h2>

          {status && (
            <Alert
              className={`mb-6 ${
                statusType === "success"
                  ? "bg-green-50 text-green-800 border-green-200"
                  : statusType === "error"
                    ? "bg-red-50 text-red-800 border-red-200"
                    : "bg-blue-50 text-blue-800 border-blue-200"
              }`}
            >
              <AlertCircle
                className={`h-4 w-4 ${
                  statusType === "success"
                    ? "text-green-600"
                    : statusType === "error"
                      ? "text-red-600"
                      : "text-blue-600"
                }`}
              />
              <AlertDescription>{status}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Film Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Enter film title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Enter film description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="e.g., Action, Drama"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      type="number"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 120"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      placeholder="Director name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cast">Cast</Label>
                    <Input id="cast" value={cast} onChange={(e) => setCast(e.target.value)} placeholder="Main actors" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <Input
                      type="date"
                      id="releaseDate"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tokenId">Token ID (optional)</Label>
                    <Input
                      id="tokenId"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                      placeholder="Auto-generated if empty"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (ETH)</Label>
                    <Input
                      type="number"
                      step="0.00001"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      disabled={subscriberOnly}
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox
                      id="subscriberOnly"
                      checked={subscriberOnly}
                      onCheckedChange={(checked) => setSubscriberOnly(checked)}
                    />
                    <Label htmlFor="subscriberOnly">Subscriber Only Content</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoFile">Video File *</Label>
                  <Input
                    type="file"
                    id="videoFile"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    required
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">Maximum file size: 100MB</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnailFile">Thumbnail Image</Label>
                  <Input
                    type="file"
                    id="thumbnailFile"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0])}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">Revenue Sharing</h3>

              {investors.map((investor, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`investorAddress${index}`}>Investor Address</Label>
                    <Input
                      id={`investorAddress${index}`}
                      value={investor.address}
                      onChange={(e) => handleInvestorChange(index, "address", e.target.value)}
                      placeholder="0x..."
                    />
                  </div>

                  <div className="w-1/4 space-y-2">
                    <Label htmlFor={`investorShare${index}`}>Share</Label>
                    <Input
                      type="number"
                      id={`investorShare${index}`}
                      value={investor.share}
                      onChange={(e) => handleInvestorChange(index, "share", e.target.value)}
                      step="0.01"
                      placeholder="Percentage"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeInvestor(index)}
                    disabled={investors.length === 1}
                    className="mb-0.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addInvestor} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Investor
              </Button>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900"
                disabled={loading || !videoFile}
                size="lg"
              >
                {loading ? "Uploading..." : "Upload and List Film"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuiflixAdmin
