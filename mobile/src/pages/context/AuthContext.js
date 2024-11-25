  import React, { createContext, useState, useContext } from 'react';

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store logged-in user
    const [refreshToken, setRefreshToken] = useState(null);// Store refresh token


    const login = (username, token) => {
      setUser({ username });
      setRefreshToken({'refreshToken': token});

    };

    const logout = async () => {

      if (!refreshToken) {
        console.warn('No refresh token available for logout.');
        setUser(null);
        setRefreshToken(null);
        return;
      }else{
        setUser(null);
        setRefreshToken(null);
        return;
      }

    };
    
    

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);
