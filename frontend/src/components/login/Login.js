import React from "react";
import "../../styles/Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="left-side"></div>
      <div className="right-side">
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          <div className="links">
            <a href="/register">Register</a>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
