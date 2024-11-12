import React, { useState } from "react";
import "../../styles/Login.css";
import bullBearIcon from "../../assets/icon-bare-700.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircleAnimation from "../CircleAnimation";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(false);

    const loginData = { username, password };

    const loadingTimeout = setTimeout(() => {
      setLoading(true);
    }, 1000); 

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login/`,
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      clearTimeout(loadingTimeout);
      setLoading(false);

      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userName", username);

      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
    
      clearTimeout(loadingTimeout);
      setLoading(false);

      toast.error("Login failed! Please ensure that your username and password are correct.");
    }
  };

  return (
    <div className="login-container">
      {loading && <CircleAnimation />} {}
      <div className="left-side">
        <div className="logo-container">
          <img src={bullBearIcon} alt="Bull and Bear Icon" className="app-logo" />
          <h1 className="app-name">Bull&Bear</h1>
        </div>
      </div>
      <div className="right-side">
        <div className="login-heading">
          <h3>Continue to Bull&Bear</h3>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
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
