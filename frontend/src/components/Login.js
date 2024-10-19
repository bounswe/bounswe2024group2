import React from 'react';
import '../styles/Login.css'; // Importing the CSS file

const Login = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <button type="button" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default Login;
