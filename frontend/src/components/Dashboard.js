import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import bullBearIcon from "../assets/icon-bare-700.png";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";
import UserService from "../service/userService";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      setIsLoggedIn(true);
      const storedUserName = UserService.getUsername();
      console.log(storedUserName);
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  
    const storedDarkMode = localStorage.getItem("darkMode");
    const isDarkMode = storedDarkMode === "true";
    setDarkMode(isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
    
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSignOut = () => {
    UserService.logout(); // Clear tokens from localStorage
    setIsLoggedIn(false); // Update state
    toast.success("Signed out successfully!");
  };

  const handleProfile = () => {
    if (UserService.isLoggedIn()) {
      navigate(`/profile/${UserService.getUserId()}`);
    } else {
      toast.warn("Please sign in to view your profile.");
      navigate("/login");
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode); // Save preference in localStorage
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={bullBearIcon}
            alt="Bull and Bear Icon"
            className="bull-bear-icon"
          />
          <span className="navbar-brand-text">Bull & Bear</span>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
          <li>
            <Link to="/markets">Markets</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
        </ul>

        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-profile">
              <FaUserCircle className="user-icon" onClick={handleProfile} />
              <span className="user-name">{userName}</span>
              <button onClick={handleSignOut} className="auth-button">
                Sign Out
              </button>
              <button onClick={toggleDarkMode} className="custom-button">
                {darkMode ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleSignIn} className="auth-button">
                Sign In
              </button>
              <button onClick={handleRegister} className="auth-button">
                Register
              </button>
              <button onClick={toggleDarkMode} className="custom-button">
              {darkMode ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          )}
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
