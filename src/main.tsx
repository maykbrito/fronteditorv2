import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'

import { ClerkProvider } from '@clerk/clerk-react'

window.global = window;

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const { href } = window.location

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={href}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
)