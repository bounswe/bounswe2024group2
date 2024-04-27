import React, { useState } from 'react';
import './SignUp.css'; // Similar styling as SignUp

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here, typically sending a request to backend
    console.log('Logging in', { username, password });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-header">
            <img src="/logo.png" alt="Logo" className="logo" />
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="login-footer">
            <span><a href="/forgotPassword">Forgot your password?</a></span>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-footer">
          <span>Don't have an account <a href="/">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
