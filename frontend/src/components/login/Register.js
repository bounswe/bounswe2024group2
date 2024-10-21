import React, { useState } from "react";
import "../../styles/Login.css";
import bullBearIcon from "../../assets/icon-bare-700.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const registerData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      // Send registration request
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/register/`,
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If registration is successful, send login request
      if (registerResponse.status === 201) {
        toast.success("Registration successful!");

        const loginData = {
          username: username, // Use the same username for login
          password: password, // Use the same password for login
        };

        // Send login request
        const loginResponse = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/login/`,
          loginData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { access, refresh } = loginResponse.data;

        // Storing tokens in localStorage
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        // Navigate to home page after successful login
        navigate("/home");
      }
    } catch (error) {
      console.error("Registration failed!", error);
      toast.error("Registration failed! Please try again.");
    }
  };

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
        <form className="login-form" onSubmit={handleRegister}>
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
