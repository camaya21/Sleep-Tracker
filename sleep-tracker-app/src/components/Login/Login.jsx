import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { useNavigate } from 'react-router-dom';


async function loginUser(credentials){
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if(!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export default function Login( { setToken } ) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await loginUser({ username, password });

      setToken(data.token ?? data);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Login failed. Check backend + credentials.');
    }
  };


  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input 
          type="text" 
          onChange={e => setUserName(e.target.value)}
          disabled={loading}
        />
      </label>
      <label>
        <p>Password</p>
        <input 
          type="password"
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          />
      </label>
      <div>
        <button type="submit">Start</button>
      </div>
    </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
