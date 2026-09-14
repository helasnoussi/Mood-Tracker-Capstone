import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'

import '@rainbow-me/rainbowkit/styles.css'
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { injected } from 'wagmi/connectors'

const config = getDefaultConfig({
  appName: 'MoodTracker Capstone',
  projectId: '0xc892394cbcC5eFc7a4e91E82832e3022BDc8aD95',
  chains: [baseSepolia],
  connectors: [injected()],
  ssr: false,
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)