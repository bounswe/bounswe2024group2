
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

