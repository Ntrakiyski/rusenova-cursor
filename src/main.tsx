import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/** SPA navigations: avoid the browser restoring scroll from a previous visit or scroll-linked bugs. */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
