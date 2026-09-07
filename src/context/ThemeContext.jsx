import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('ffm_theme')
    return savedTheme ? JSON.parse(savedTheme) : 'dark'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('ffm_theme', JSON.stringify(theme))
  }, [theme])

  const applyTheme = (themeMode) => {
    document.documentElement.setAttribute('data-theme', themeMode)
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('ffm_theme', JSON.stringify(newTheme))
    applyTheme(newTheme)
    
    // Dispatch custom event for backward compatibility
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }))
  }

  const setSpecificTheme = (newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark') return
    setTheme(newTheme)
    localStorage.setItem('ffm_theme', JSON.stringify(newTheme))
    applyTheme(newTheme)
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: newTheme } }))
  }

  const palette = {
    dark: {
      bg: '#232A37',
      card: '#354252',
      accent: '#76838F',
      text: '#DFDAD4',
      border: '#AAA6A3',
    },
    light: {
      bg: '#DFDAD4',
      card: '#AAA6A3',
      accent: '#76838F',
      text: '#232A37',
      border: '#354252',
    },
  }

  const colors = palette[theme]

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setSpecificTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}
