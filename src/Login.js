import React, { useState } from 'react';
import { login } from './api';
import Header from './Header';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tokens, setTokens] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
    //   setTokens(response.data);
    //   setMessage('Login successful!');
    setMessage('Login successful!');
    console.log('Login successful, calling onLoginSuccess...');
    onLoginSuccess(response.data); 
    } catch (error) {
      setMessage(error.response.data.detail || 'Login failed.');
    }
  };

  return (
    <div>
        {/* <Header /> */}
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
            {tokens && <pre>{JSON.stringify(tokens, null, 2)}</pre>}
        </form>
    </div>
  );
}

export default Login;
