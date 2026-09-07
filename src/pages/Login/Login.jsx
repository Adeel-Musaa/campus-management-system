import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext.jsx'
import './Login.css'
import { FiSun, FiMoon } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { palette } from './palette';

const Login = ({ onLogin, users }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const matchedUser = users?.find(
      (user) => user.email === formData.email && user.password === formData.password
    )

    const userToLogin = matchedUser || {
      email: formData.email || 'user@gmail.com',
      name: formData.email ? formData.email.split('@')[0] : 'User',
      role: 'admin'
    }

    onLogin(userToLogin)
    setIsLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const { theme, toggleTheme, colors } = useTheme();

  return (
    <div
      className="login-container d-flex align-items-center justify-content-center position-relative overflow-hidden p-4 vh-100 w-100 border rounded"
      style={{
        backgroundColor: colors.bg, // Light or dark background based on theme
        color: colors.text, // Light or dark text based on theme
        border: `2px solid ${colors.border}`,
      }}
    >
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle-login"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        style={{
          backgroundColor: colors.card, // Light or dark card color
          color: colors.text, // Light or dark text color
          border: `1px solid ${colors.border}`,
        }}
      >
        {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
      </button>

      {/* Animated Background */}
      <div className="login-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      {/* Login Card */}
      <div
        className="login-card glass-card"
        style={{
          border: `2px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: colors.card, // Light or dark card background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        {/* Logo/Header Section */}
        <div className="login-header text-center mb-4">
          <div className="login-icon mb-3">
            <FiHome size={32} style={{ color: colors.accent }} />
          </div>
          <h2 className="fw-bold mb-2" style={{ color: colors.text }}>Welcome</h2>
          <p className="text-muted-soft" style={{ color: colors.text }}>Campus Management System</p>
        </div>

        {/* Login Form */}
        <Form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger alert-modern" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <div
            className="login-box"
            style={{
              border: `2px solid ${colors.border}`, // Adding a border around the box
              borderRadius: '12px', // Rounded corners for the box
              padding: '20px', // Padding inside the box
              backgroundColor: colors.card, // Theme-based background color
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding a shadow for a modern look
            }}
          >
            {/* Username Field */}
            <Form.Group className="mb-3">
              <Form.Label className="form-label-modern" style={{ color: colors.text }}>
                <span className="me-2 icon-inline"><FiUser size={16} /></span>
                Email
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className="form-control-modern"
                autoFocus
                style={{
                  border: `2px solid ${colors.inputBorder}`, // Adding theme-based border color
                  borderRadius: '8px', // Adding rounded corners
                  padding: '10px', // Adding padding for better usability
                  backgroundColor: colors.inputBg, // Theme-based background color
                  color: colors.inputText, // Theme-based text color
                }}
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label-modern" style={{ color: colors.text }}>
                <span className="me-2 icon-inline"><FiLock size={16} /></span>
                Password
              </Form.Label>
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-control-modern"
                  style={{
                    border: `2px solid ${colors.inputBorder}`, // Adding theme-based border color
                    borderRadius: '8px', // Adding rounded corners
                    padding: '10px', // Adding padding for better usability
                    backgroundColor: colors.inputBg, // Theme-based background color
                    color: colors.inputText, // Theme-based text color
                  }}
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: colors.eye, // Theme-based color for the eye icon
                  }}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </span>
              </div>
            </Form.Group>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap" style={{ gap: '8px' }}>
              <Form.Check
                type="checkbox"
                label="Remember me"
                className="remember-checkbox"
                style={{ color: colors.text }}
              />
              <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()} style={{ color: colors.accent }}>
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="btn-login w-100"
              disabled={isLoading}
              style={{
                backgroundColor: colors.accent,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '10px 20px',
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <FiLogIn size={16} className="me-2" />
                  Sign In
                </>
              )}
            </Button>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default Login
