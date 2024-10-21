import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import bullBearIcon from "../assets/icon-bare-700.png";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if access token exists in localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleSignOut = () => {
    // Clear the tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");

    setIsLoggedIn(false); // Update state
    // navigate("/login"); // Navigate to login? i am not sure
    toast.success("Signed out successfully!");
  };

  const handleProfile = () => {
    navigate("/profile");
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
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleSignIn} className="auth-button">
                Sign In
              </button>
              <button onClick={handleRegister} className="auth-button">
                Register
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
