import { BrowserProvider, Contract } from "ethers"

// Check if ethereum is available without trying to modify it
export function isEthereumAvailable(): boolean {
  return typeof window !== "undefined" && window.ethereum !== undefined
}

// Get ethereum provider safely
export async function getEthereumProvider() {
  if (!isEthereumAvailable()) {
    throw new Error("Ethereum provider not available")
  }

  try {
    return new BrowserProvider(window.ethereum)
  } catch (error) {
    console.error("Error creating Ethereum provider:", error)
    throw error
  }
}

// Get signer safely
export async function getEthereumSigner() {
  const provider = await getEthereumProvider()
  return provider.getSigner()
}

// Get connected accounts safely
export async function getConnectedAccounts() {
  if (!isEthereumAvailable()) {
    return []
  }

  try {
    return await window.ethereum.request({ method: "eth_accounts" })
  } catch (error) {
    console.error("Error getting accounts:", error)
    return []
  }
}

// Request accounts safely
export async function requestAccounts() {
  if (!isEthereumAvailable()) {
    throw new Error("Ethereum provider not available")
  }

  try {
    return await window.ethereum.request({ method: "eth_requestAccounts" })
  } catch (error) {
    console.error("Error requesting accounts:", error)
    throw error
  }
}

// Get account balance safely
export async function getAccountBalance(address: string) {
  const provider = await getEthereumProvider()
  return provider.getBalance(address)
}

// Create contract instance safely
export function createContract(address: string, abi: any, signer: any) {
  return new Contract(address, abi, signer)
}
