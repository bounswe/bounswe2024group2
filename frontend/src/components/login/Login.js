import React, { useState, useRef } from "react";
import "../../styles/Login.css";
import bullBearIcon from "../../assets/icon-bare-700.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import CircleAnimation from "../CircleAnimation";
import UserService from "../../service/userService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadingTimeout = useRef(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(false);

    loadingTimeout.current = setTimeout(() => {
      setLoading(true);
    }, 1000); 

    try {
      const response = await UserService.login(username, password);
      console.log(response);
      if (response.success) {
        toast.success("Login successful!");
        
        navigate("/home");
      } else {
        setError(response.error || "Login failed! Please ensure that your username and password are correct.");
        toast.error(response.error || "Login failed! Please ensure that your username and password are correct.");
      }
      
      clearTimeout(loadingTimeout.current);
      setLoading(false);

    } catch (error) {
      clearTimeout(loadingTimeout.current);
      setLoading(false);
      console.error("Login failed!", error);
      toast.error("Login failed! Please ensure that your username and password are correct.");
    }
  };

  // Decode JWT and get expiration time
  function getTokenExpiration(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000; // Convert to milliseconds
  }

  // Set up a timer to refresh the token just before it expires
  function setRefreshTimer(accessToken) {
    const expirationTime = getTokenExpiration(accessToken);
    const currentTime = new Date().getTime();
    const timeToRefresh = expirationTime - currentTime - 60 * 1000; // Refresh 1 minute before expiry

    if (timeToRefresh > 0) {
      //console.log("Setting up token refresh in", timeToRefresh, "ms");
      setTimeout(() => {
        refreshAccessToken();
      }, timeToRefresh);
    } else {
      //console.log("refreshing immediately");
      refreshAccessToken();
    }
  }

  // Refresh the access token using the refresh token
  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("No refresh token found");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/refresh/`,
        { refresh: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access } = response.data;

      // Store the new access token
      localStorage.setItem("accessToken", access);

      // Set a new timer for the refreshed token
      setRefreshTimer(access);

      toast.success("Access token refreshed!");
    } catch (error) {
      console.error("Failed to refresh token", error);
      toast.error("Failed to refresh token. Please log in again.");
      // Optionally, log the user out if refresh fails

      clearTimeout(loadingTimeout.current);
      setLoading(false);

      toast.error("Login failed! Please ensure that your username and password are correct.");
    }
  };

  return (
    <div className="login-container">
      {loading && <CircleAnimation />} {}
      <div className="left-side">
        <div className="logo-container">
          <img 
            src={bullBearIcon}
            alt="Bull and Bear Icon" 
            className="app-logo" />
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
          {error && <p className="error">{error}</p>}
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
