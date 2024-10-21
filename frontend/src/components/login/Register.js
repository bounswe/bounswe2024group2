import React from "react";
import "../../styles/Login.css";
import bullBearIcon from "../../assets/icon-bare-700.png";

function Register() {
  return (
    <div className="login-container">
      <div className="left-side">
        <div className="logo-container">
          <img
            src={bullBearIcon}
            alt="Bull and Bear Icon"
            className="app-logo"
          />
          <h1 className="app-name">Bull&Bear</h1>
        </div>
      </div>
      <div className="right-side">
        <div className="login-heading">
          <h3>Welcome to Bull&Bear!</h3>
        </div>
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>
          <button type="submit" className="sign-in-button">
            Register
          </button>
          <div className="links">
            <a href="/login">Already have an account? Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
