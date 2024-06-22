import React, { useState } from 'react';
import { register } from './api';
import Header from './Header';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(email, name, password, password2);
      setMessage(response.data.message);
      setRegistrationSuccess(true);
    } catch (error) {
      setMessage(error.response.data.detail || 'Registration failed.');
    }
  };

  return (
    <div>
      {/* <Header /> */}
      {registrationSuccess ? (
        <div>
          <p>Registration successful! Please log in to continue.</p>
          <button onClick={() => window.location.href = '/login'}>Go to Login</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm Password" required />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
}

export default Register;
