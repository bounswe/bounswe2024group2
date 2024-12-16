
  import React, { createContext, useState, useContext } from 'react';

  const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(""); // Store logged-in user
    const [userId, setUserId] = useState(0); 
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    
    

    const login = (username, userId, access, refresh) => {
      setUsername(username );
      setUserId(userId);
      setAccessToken(access);
      setRefreshToken(refresh);
      
    };

    const logout = async () => {

      if (!refreshToken) {
        console.warn('No refresh token available for logout.');
        setUsername(null);
        setUserId(null);
        setRefreshToken(null);
        setAccessToken(null);
        return;
      }else{
        setUsername(null);
        setUserId(null);
        setRefreshToken(null);
        setAccessToken(null);
        return;
      }

    };
    
    

    return (
      <AuthContext.Provider value={{ username, userId, accessToken, refreshToken, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);

