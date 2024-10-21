import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { FaUserCircle } from 'react-icons/fa';
import bullBearIcon from '../assets/icon-bare-700.png';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

    const handleProfile = () => {
        navigate("/profile");
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-left">
                <img src={bullBearIcon} alt="Bull and Bear Icon" className="bull-bear-icon" />
                <span className="navbar-brand-text">Bull & Bear</span>
                </div>
                
                <ul className="nav-links">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/community">Community</Link></li>
                    <li><Link to="/markets">Markets</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                </ul>
                
                <div className="auth-section">
                    {user ? (
                        <div className="user-profile" onClick={handleProfile}>
                            <FaUserCircle className="user-icon" />
                            <span className="user-name">{user.name}</span>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <button onClick={handleSignIn} className="auth-button">Sign In</button>
                            <button onClick={handleRegister} className="auth-button">Register</button>
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
