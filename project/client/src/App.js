import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/SignUp/Login'; 
import ForgotPassword from './pages/SignUp/ForgotPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} /> 
        <Route path="/" element={<SignUp />} /> {/* Default route to SignUp */}
      </Routes>
    </Router>
  );
}

export default App;
