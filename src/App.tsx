import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { SiteFooter } from './components/SiteFooter'
import { HomePage } from './pages/HomePage'
import { AiMeetingAssistantPage } from './pages/ml/AiMeetingAssistantPage'
import { FraudDetectionSystemPage } from './pages/ml/FraudDetectionSystemPage'
import { RagEvaluationSystemPage } from './pages/ml/RagEvaluationSystemPage'
import { RecommendationSystemPage } from './pages/ml/RecommendationSystemPage'
import { TideProductDesignPage } from './pages/product-design/TideProductDesignPage'
import { TelenorProductDesignPage } from './pages/product-design/TelenorProductDesignPage'
import { EpamProductDesignPage } from './pages/product-design/EpamProductDesignPage'
import { MentorMateProductDesignPage } from './pages/product-design/MentorMateProductDesignPage'

function SiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <SiteFooter />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ml/fraud-detection-system" element={<FraudDetectionSystemPage />} />
          <Route path="/ml/ai-meeting-assistant" element={<AiMeetingAssistantPage />} />
          <Route path="/ml/rag-evaluation-system" element={<RagEvaluationSystemPage />} />
          <Route path="/ml/recommendation-system" element={<RecommendationSystemPage />} />
          <Route path="/product-design/tide" element={<TideProductDesignPage />} />
          <Route path="/product-design/telenor" element={<TelenorProductDesignPage />} />
          <Route path="/product-design/epam" element={<EpamProductDesignPage />} />
          <Route path="/product-design/mentormate" element={<MentorMateProductDesignPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
