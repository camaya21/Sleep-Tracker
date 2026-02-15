import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';


// async function signUpUser(credentials){
//   return fetch('http://localhost:8080/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
// }
async function signUpUser(payload) {
  const res = await fetch('http://localhost:8080/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Sign up failed (${res.status})`);
  }
  return data;
}

export default function SignUp() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const data = await signUpUser({ username, password, email });

      localStorage.setItem('userId', data.userId);

      navigate('/profile'); // go to onboarding page
    } catch (err) {
      alert(err.message);
    }
  };




  return(
    <div className="register-wrapper">
      <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Email</p>
        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password"onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Start</button>
      </div>
    </form>
    </div>
  )
}

SignUp.propTypes = {
  setUserId: PropTypes.func.isRequired
}
