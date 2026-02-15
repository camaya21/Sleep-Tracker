import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Preferences from './components/Preferences/Preferences.jsx';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={userId ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/preferences"
          element={userId ? <Preferences /> : <Navigate to="/login" replace />}
        />

        <Route path="/" element={<Navigate to={userId ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

