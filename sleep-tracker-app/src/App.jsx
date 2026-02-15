import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Preferences from './components/Preferences/Preferences.jsx';
import Profile from './components/Profile/Profile.jsx';
import ExcelReader from './components/ReadExcelFileData/ReadExcel.jsx';

export default function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  useEffect(() => {
    if (userId) localStorage.setItem("userId", userId);
    else localStorage.removeItem("userId");
  }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        {!userId ? (
          <>
            <Route path="/login" element={<Login setUserId={setUserId} />} />
            <Route path="/signup" element={<SignUp setUserId={setUserId} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard setUserId={setUserId} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

