import React, { useState } from 'react';
import './ForgotPassword.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setemail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here, typically sending a request to backend
    console.log('Receiving email for forgot password', { email});

    fetch('http://localhost:8000/request-reset-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Request email verification is successful');
          console.log(response.json())
          toast.success('Request email verification successful! Please verify your email to reset your password.'); 
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
      
  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-form">
        <div className="forgotPassword-header">
            <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Forgot Password</h1>
        </div>
        <div className = "forgot-password-explanation">
            <h1>Reset your password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="forgotPassword-input-item"
          />
        <button type="submit">Send Verification</button>
        </form>
      </div>
    </div>
  );
}
}
export default ForgotPassword;
