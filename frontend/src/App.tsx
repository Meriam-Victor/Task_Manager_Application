import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Layout/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Loading from './components/Common/Loading'
import { Toaster } from 'react-hot-toast'


function App() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')  
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))  
    }
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')  
    setToken(null)
    setUser(null)
  }

  const handleLogin = (tokenData: string, userData: any) => {
    localStorage.setItem('token', tokenData)
    localStorage.setItem('user', JSON.stringify(userData))  
    setToken(tokenData)
    setUser(userData)
  }

  if (loading) {
    return <Loading size={60} />
  }

  return (
    <>
      <Navbar token={token} logout={logout} />
      <div className="container">
        <Routes>
          <Route 
            path="/login" 
            element={token ? <Navigate to="/dashboard" /> : <Login setToken={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/dashboard" /> : <Register setToken={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={token ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default App
