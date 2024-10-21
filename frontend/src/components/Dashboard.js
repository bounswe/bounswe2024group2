import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
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
        <div className="auth-buttons">
          <button onClick={handleSignIn} className="auth-button">
            Sign In
          </button>
          <button onClick={handleRegister} className="auth-button">
            Register
          </button>
        </div>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
