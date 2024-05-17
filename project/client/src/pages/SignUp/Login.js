import React, { useState } from 'react';
import './SignUp.css'; // Similar styling as SignUp
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in', { username, password });


    fetch('http://207.154.242.6:8020/login/', {

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
          return response.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        console.log('Login successful');
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true'); // Persist login state

        // Fetch CSRF token
        fetch('http://207.154.242.6:8020/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((tokenData) => {
            localStorage.setItem('csrfToken', tokenData.access); // Store CSRF token
            navigate('/main-page'); // Replace '/main-page' with your main page's route
          })
          .catch((error) => {
            console.error('Error fetching CSRF token:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
