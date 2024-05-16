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
    console.log('Signing up', { email, username, password });

    fetch('http://207.154.242.6:8020/register/', {
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
          
          // Send verification email request
          fetch('http://207.154.242.6:8020/email-verify/', {
            method: 'GET',
            headers: {
              'accept': '*/*',
              'X-CSRFToken': 'f8CZ37WQ6SPmqjiWCTzVKE0vU0nwx03K7SgxeSXw9YSY5PNCRJdzxv54RZreV5YH',
            },
            credentials: 'include' // Important if your server requires cookie-based sessions
          })
            .then((verifyResponse) => {
              if (verifyResponse.ok) {
                console.log('Verification email sent');
                toast.info('Verification email sent! Please check your inbox.');
              } else {
                console.log('Failed to send verification email');
                toast.error('Failed to send verification email! Please try again.');
              }
            })
            .catch((error) => {
              console.error('Error sending verification email:', error);
              toast.error('Error sending verification email! Please try again.');
            });
          
          // Redirect to login page
          window.location.href = '/login';
        } else {
          console.log('Sign up failed');
          toast.error('Sign up failed! Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Sign up failed! Please try again.');
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
