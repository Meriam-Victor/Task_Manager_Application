import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authAPI } from '../services/api'
import type { RegisterData, User } from '../types/types'

interface RegisterProps {
  setToken: (token: string, user: User) => void
}

function Register({ setToken }: RegisterProps) {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    fullName: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [showPasswords, setShowPasswords] = useState(false) 

  const validatePassword = (password: string): string[] => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('At least 8 characters')
    }
    if (!/(?=.*[A-Za-z])/.test(password)) {
      errors.push('At least one letter')
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('At least one number')
    }
    if (!/(?=.*[@$!%*#?&])/.test(password)) {
      errors.push('At least one special character (@$!%*#?&)')
    }
    
    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    } else {
      setFormData({
        ...formData,
        [name]: value
      })

      if (name === 'password') {
        setPasswordErrors(validatePassword(value))
        if (confirmPassword && value !== confirmPassword) {
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const passwordValidationErrors = validatePassword(formData.password)
    if (passwordValidationErrors.length > 0) {
      setError('Please fix password requirements')
      return
    }

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const response = await authAPI.register(formData)
      localStorage.setItem('token', response.token)
      setToken(response.token, response.user)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const isPasswordValid = passwordErrors.length === 0 && formData.password.length > 0
  const doPasswordsMatch = formData.password === confirmPassword && confirmPassword.length > 0
  const isFormValid = isPasswordValid && doPasswordsMatch && formData.fullName.trim() && formData.email.trim()

  return (
    <div className="form">
      <h2 className="text-center mb-2">Create Account</h2>
      <p className="text-center" style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Join us to start managing your tasks efficiently
      </p>
      
      {error && <div className="error mb-1">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPasswords ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              style={{
                borderColor: formData.password 
                  ? isPasswordValid 
                    ? '#28a745' 
                    : '#dc3545'
                  : '#ddd',
                paddingRight: '3rem' 
              }}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {showPasswords ? (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
              </svg>
            ) : (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            )}
            </button>
          </div>
          
          {formData.password && (
            <div style={{ marginTop: '0.5rem' }}>
              <small style={{ color: '#666' }}>Password strength:</small>
              <ul style={{ marginTop: '0.25rem', marginLeft: '1rem', fontSize: '0.85rem' }}>
                <li style={{ color: formData.password.length >= 8 ? '#28a745' : '#dc3545' }}>
                  {formData.password.length >= 8 ? '✓' : '✗'} At least 8 characters
                </li>
                <li style={{ color: /(?=.*[A-Za-z])/.test(formData.password) ? '#28a745' : '#dc3545' }}>
                  {/(?=.*[A-Za-z])/.test(formData.password) ? '✓' : '✗'} At least one letter
                </li>
                <li style={{ color: /(?=.*\d)/.test(formData.password) ? '#28a745' : '#dc3545' }}>
                  {/(?=.*\d)/.test(formData.password) ? '✓' : '✗'} At least one number
                </li>
                <li style={{ color: /(?=.*[@$!%*#?&])/.test(formData.password) ? '#28a745' : '#dc3545' }}>
                  {/(?=.*[@$!%*#?&])/.test(formData.password) ? '✓' : '✗'} At least one special character
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input
            type={showPasswords ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            style={{
              borderColor: confirmPassword 
                ? doPasswordsMatch 
                  ? '#28a745' 
                  : '#dc3545'
                : '#ddd'
            }}
          />
          
          {confirmPassword && (
            <div style={{ marginTop: '0.25rem' }}>
              <small style={{ 
                color: doPasswordsMatch ? '#28a745' : '#dc3545',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                {doPasswordsMatch ? (
                  <>✓ Passwords match perfectly</>
                ) : (
                  <>✗ Passwords do not match</>
                )}
              </small>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !isFormValid}
          style={{ 
            opacity: isFormValid ? 1 : 0.6,
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
        >
          {loading ? (
            <>
              <span style={{ marginRight: '0.5rem' }}>⏳</span>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <p className="text-center mt-1" style={{ fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ fontWeight: '500' }}>Sign in here</Link>
      </p>
    </div>
  )
}

export default Register