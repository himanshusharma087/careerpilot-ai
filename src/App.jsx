import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CareerPredictor from './pages/CareerPredictor'
import ResumeAnalyzer from './pages/ResumeAnalyzer'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/predict" element={<CareerPredictor />} />
        <Route path="/resume"  element={<ResumeAnalyzer />} />
      </Routes>
    </div>
  )
}