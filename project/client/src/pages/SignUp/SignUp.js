import React, { useState } from 'react';
import './SignUp.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here.
    // This would typically involve sending a request to your backend.
    console.log('Signing in', { email, username, password });
    fetch('${process.env.REACT_APP_BACKEND_URL}/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password}),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Sign up successful');
          toast.success('Sign up successful! Please verify your email to log in.'); 
          // Redirect to login page
          window.location.href = '/login';
        } else {
          console.log('Sign up failed');
          toast.error('Sign up failed! Please try again.');
          // Handle sign up failure here
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle sign up failure here
      });

  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-form">
        <div className="signup-header">
            <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-item"
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-item"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-item"
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="signup-footer">
          <span>Already have an account? <a href="/login">Log in</a></span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
