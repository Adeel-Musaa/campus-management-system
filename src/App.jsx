import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Signup from './pages/Login/Signup';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './students/Dashboard/Dashboard';

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
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [mode, setMode] = useState('dark');
  const [users, setUsers] = useState([
    { email: 'admin@gmail.com', password: '123456', role: 'admin' },
    { email: 'student@gmail.com', password: '123456', role: 'student' },
    { email: 'teacher@gmail.com', password: '123456', role: 'teacher' },
  ]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (newUser) => {
    setUsers([...users, newUser]);
    setShowSignup(false);
  };

  const paletteMode = palette[mode];

  if (!user) {
    return (
      <div style={{ background: paletteMode.bg, minHeight: '100vh', transition: 'background 0.3s' }}>
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <button
            style={{ background: paletteMode.accent, color: paletteMode.text, border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          >
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {showSignup ? (
          <Signup
            onSignup={handleSignup}
            onSwitch={() => setShowSignup(false)}
          />
        ) : (
          <Login
            onLogin={handleLogin}
            users={users}
            onSwitch={() => setShowSignup(true)}
            mode={mode}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      {user.role === 'student' && <Sidebar />}
      <div style={{ flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: paletteMode.bg, color: paletteMode.text, transition: 'background 0.3s, color 0.3s' }}>
        <div style={{ position: 'absolute', top: 20, right: 20 }}>
          <button
            style={{ background: paletteMode.accent, color: paletteMode.text, border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          >
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
