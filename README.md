# Mood-Tracker-Capstone
42 Blockchain ealearning capstone
Mood Tracker Capstone project, a decentralized application running on the Base Sepolia network.
Overview of the Project

    Core Functionality: A decentralized web application that allows users to connect their Web3 wallet, view the current global mood stored on a smart contract (0x0d2e5Eac10881a8878F1366B54239cde11b819fe), and submit updates to change it.

    Tech Stack: Built with React, Vite, Tailwind/CSS styling, RainbowKit, Wagmi, and Viem interacting directly with the Base Sepolia testnet.

Key Technical Architecture & Implementation

    Wallet Connection & Security: Utilizes Wagmi configuration in main.jsx with explicit injected() connectors and RainbowKitProvider to ensure seamless wallet authentication across different browsing environments.

    Smart Contract Integration:

        Implements useReadContract to fetch the real-time currentMood string from the blockchain.

        Utilizes useWriteContract and useWaitForTransactionReceipt to execute state-changing setMood transactions securely and track transaction confirmation lifecycles.

    UI & Balance Management:

        Features a custom, robust balance reader via useBalance and viem's formatEther to accurately render user balances without rendering NaN bugs.

        Configures showBalance={false} on the <ConnectButton/> to streamline the user interface header.

        Implements automated state-refresh logic (refetch()) via useEffect upon successful transaction confirmation, ensuring the UI immediately reflects on-chain updates.
