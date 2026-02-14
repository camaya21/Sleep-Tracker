import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
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
        <h1>Application</h1>
        <button onClick={apiCall}>Make API Call</button>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
      </div>
      )}
    </BrowserRouter>
  );
}

export default App;
