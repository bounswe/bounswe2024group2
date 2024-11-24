import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store logged-in user
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  
  const login = (username, access, refresh) => {
    setUser({ username });
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = async () => {
    if (!refreshToken) {
      setUser(null);
      setRefreshToken(null);
      return;
    }

    try {
      const response = await fetch('http://159.223.28.163:30002/logout/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        setUser(null); // Clear user state
        setRefreshToken(null); // Clear token
        console.log('Logged out successfully');
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Network error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

