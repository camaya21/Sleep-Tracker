import React, { useState } from 'react';
import './Login.css'
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';

async function loginUser(credentials) {
  const res = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data; // expects { userId }
}

export default function Login({ setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ username, password });

      // store userId
      setUserId(data.userId);
      localStorage.setItem('userId', data.userId);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            className="input-field"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button className="my-button" type="submit">Login</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

Login.propTypes = {
  setUserId: PropTypes.func.isRequired,
};
