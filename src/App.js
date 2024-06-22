import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import GameRooms from './GameRooms';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  const handleLoginSuccess = (tokens) => {
    console.log('handleLoginSuccess called with tokens:', tokens);
    setIsAuthenticated(true);
    localStorage.setItem('tokens', JSON.stringify(tokens));
    navigate('/rooms'); 
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleCancelRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <GameRooms />
      ) : isRegistering ? (
        <div>
          <Register onCancel={handleCancelRegister} />
        </div>
      ) : (
        <div>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <button onClick={() => setShowLogin(false)}>Register</button>
          {showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register />
          )}
        </div>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rooms" element={<GameRooms />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
