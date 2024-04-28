import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/SignUp/Login';
import MainPage from './pages/Main/MainPage'; // Adjust the path according to your project structure


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} /> {/* Default route to SignUp */}
        <Route path="/main-page" element={<MainPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
