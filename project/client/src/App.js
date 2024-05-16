import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/SignUp/Login';
import ForgotPassword from './pages/SignUp/ForgotPassword';
import MainPage from './pages/Main/MainPage';
import Profile from './pages/Main/Profile/Profile';
import SearchPage from './pages/Main/SearchPage';
import Post from './pages/Post/Post';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // If you want to clear the login state when the app loads, comment this out
    // localStorage.setItem('isLoggedIn', isLoggedIn);

    // If you want to keep the user logged in across sessions, uncomment this
    // and remove it from handleLogout in your NavBar component
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // Add a useEffect hook to clear the isLoggedIn state when the app starts
  useEffect(() => {
    // Comment out or remove this line if you want to keep the user logged in across sessions
    setIsLoggedIn(false);
  }, []);

  return (
    <Router>
      {/* <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
        <Route path="/main-page" element={<MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/post" element={<Post />}/>
        {/* ...other routes */}
      </Routes>
    </Router>
  );
}

export default App;
