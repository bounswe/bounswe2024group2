import React, { useState } from 'react';
import './SignUp.css'; 

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here.
    // This would typically involve sending a request to your backend.
    console.log('Signing in', { email, username, password });
  };

  return (
    <div className="signup-container">
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
