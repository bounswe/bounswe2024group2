import React, { useState } from 'react';
import './ForgotPassword.css'; 

function Login() {
  const [email, setemail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here, typically sending a request to backend
    console.log('Logging in', { email});
  };

  return (
    <div className="forgotPassword-container">
      <div className="forgotPassword-form">
        <div className="forgotPassword-header">
            <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Forgot Password</h1>
        </div>
        <div className = "forgot-password-epxlanation">
            <h1>Type your email so that we can send you a verification code to reset your password</h1>
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

export default Login;
