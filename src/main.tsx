
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeGA } from './utils/analytics.ts'

// Initialize Google Analytics
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
initializeGA('G-XXXXXXXXXX');

createRoot(document.getElementById("root")!).render(<App />);
