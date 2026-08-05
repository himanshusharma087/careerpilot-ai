import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import CareerPredictor from './pages/CareerPredictor'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import History from './pages/History'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/predict" element={<CareerPredictor />} />
          <Route path="/resume"  element={<ResumeAnalyzer />} />
          <Route path="/login"   element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
