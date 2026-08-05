import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cp_token'))
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setUser(data))
      .catch(() => {
        // token invalid/expired
        localStorage.removeItem('cp_token')
        setToken(null)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const signup = async (email, password) => {
    const { data } = await api.post('/auth/signup', { email, password })
    localStorage.setItem('cp_token', data.access_token)
    setToken(data.access_token)
  }

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('cp_token', data.access_token)
    setToken(data.access_token)
  }

  const logout = () => {
    localStorage.removeItem('cp_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
