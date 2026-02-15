import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import Profile from './components/Profile/profile.jsx';
import Preferences from './components/Preferences/Preferences.jsx';
import axios from 'axios';

const apiCall = () => {
  axios.get('http://localhost:8000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  const [token, setToken] = useState();

  
  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) :(

      <div className="wrapper">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
