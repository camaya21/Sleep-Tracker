import React, { createContext, useContext, useState } from 'react';
import useToken from '../App/useToken.jsx';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { token, setToken, removeToken } = useToken();
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    // Login logic here
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setToken(data);
    // Optionally decode token to set user info
    return data;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}