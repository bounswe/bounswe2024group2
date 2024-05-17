import React, { useState } from 'react';
import './SignUp.css'; // Similar styling as SignUp
import { useNavigate } from 'react-router-dom';


function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the login logic here, typically sending a request to backend
    console.log('Logging in', { username, password });
    // send a request to backend (http://localhost:8020/docs/) to login
    // if login is successful, redirect to main page
    
    fetch('http://207.154.242.6:8020/docs/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true'); // Persist login state
          localStorage.setItem('username', username); 
          navigate('/main-page'); // replace '/main-page' with your main page's route
        } else {
          console.log('Login failed');
          // handle login failure here
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // handle login failure here
      });


    // go to main page when logged in 
    // navigate('/main-page'); // replace '/main-page' with your main page's route
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
          <span>Don't have an account <a href="/SignUp">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
