import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import type { LoginData, User } from '../types/types'
import Loading from '../components/Common/Loading'


interface LoginProps {
  setToken: (token: string, user: User) => void
}

function Login({ setToken }: LoginProps) {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.login(formData)
      localStorage.setItem('token', response.token)
      setToken(response.token, response.user)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form">
      <h2 className="text-center mb-2">Login</h2>
      
      {error && <div className="error mb-1">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <Loading size={16} color="#ffffff" /> : 'Login'}
        </button>
      </form>
      
      <p className="text-center mt-1">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default Login