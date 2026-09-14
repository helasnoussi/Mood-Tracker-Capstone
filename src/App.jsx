import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { formatEther } from 'viem'

const CONTRACT_ADDRESS = "0x0d2e5Eac10881a8878F1366B54239cde11b819fe"
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "currentMood",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_newMood", "type": "string"}],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export function App() {
  const { address, isConnected } = useAccount()
  const [mood, setMood] = useState('')

  // Récupération sécurisée du solde
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })

  // Lecture de l'humeur actuelle depuis la blockchain
  const { data: currentMood, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'currentMood',
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetch()
    }
  }, [isConfirmed, refetch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!mood) return
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'setMood',
      args: [mood],
    })
  }

  // Calcul sécurisé du solde affiché
  const formattedBalance = balance && balance.value !== undefined 
    ? Number(formatEther(balance.value)).toFixed(4) 
    : '0.0000'

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mood Tracker Capstone</h1>
      <ConnectButton showBalance={false} />

      {isConnected && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>Solde : </strong> 
            {isBalanceLoading ? "Chargement..." : `${formattedBalance} ETH`}
          </p>

          <p><strong>Humeur actuelle sur la blockchain :</strong> {currentMood || "Chargement..."}</p>

          <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="Nouvelle humeur..."
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{ padding: '8px', marginRight: '10px', width: '200px' }}
            />
            <button 
              type="submit" 
              disabled={isPending}
              style={{ background: 'black', color: 'white', padding: '8px 15px', cursor: 'pointer' }}
            >
              {isPending ? 'En cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      )}

      {hash && <p>Tx Hash : {hash}</p>}
      {isConfirming && <p>Validation sur Base Sepolia...</p>}
      {isConfirmed && <p style={{ color: 'green' }}>Succès ! L'humeur a été mise à jour.</p>}
    </main>
  )
}