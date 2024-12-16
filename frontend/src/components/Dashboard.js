import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import bullBearIcon from "../assets/icon-bare-700.png";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa";
import UserService from "../service/userService";
import { StockService } from "../service/stockService";
import ProfileService from "../service/profileService";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("stocks");
  const [similarStocks, setSimilarStocks] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

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
    // Fetch user list
    ProfileService.getUsers().then((users) => {
      setUserList(users);
    });

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

  const handleSearchClick = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    getSimilarStocks(e.target.value);
    getSimilarUsers(e.target.value);
  };

  const getSimilarUsers = async (value) => {
    if (value === "") {
      setSimilarUsers([]);
      return;
    }
    const pattern = value.toLowerCase();
    console.log("pattern", pattern);
    const limit = 10;
    const similarUsers = userList.filter((user) => user.username.toLowerCase().includes(pattern));
    similarUsers.sort((a, b) => {
      if (a.username.toLowerCase().startsWith(pattern) && !b.username.toLowerCase().startsWith(pattern)) {
        return -1;
      }
      if (!a.username.toLowerCase().startsWith(pattern) && b.username.toLowerCase().startsWith(pattern)) {
        return 1;
      }
      return 0;
    }
    );
    setSimilarUsers(similarUsers.slice(0, limit));
  }

  const getSimilarStocks = async (value) => {
    if (value === "") {
      setSimilarStocks([]);
      return;
    }
    const pattern = value.toLowerCase();
    const similarStocks = await StockService.fetchSimilarStocks(pattern, 10);
    console.log(similarStocks);
    setSimilarStocks(similarStocks);
  };

  const redirectToSearch = (path) => {
    setIsSearchExpanded(false);
    handleSearchChange({ target: { value: "" } });
    navigate(path);
  };

  if (isSearchExpanded) {
    return (
      <div className="dashboard-container">
        <nav className="navbar">
          <div className={`navbar-search-bar-container ${isSearchExpanded ? 'expanded' : ''}`}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="navbar-search-input"
            />
            <button className="navbar-close-search" onClick={handleSearchClick}>
              <FaTimes className="navbar-close-icon" />
            </button>
          </div>
        </nav>
        <div className="navbar-search-results">
          <ul className="navbar-search-tabs">
            <li
              className={selectedTab === "users" ? "active" : ""}
              onClick={() => setSelectedTab("users")}
            >
              Users
            </li>
            <li
              className={selectedTab === "stocks" ? "active" : ""}
              onClick={() => setSelectedTab("stocks")}
            >
              Stocks
            </li>
          </ul>
          {selectedTab === "users" && (
            // No found if no similar users
            similarUsers.length === 0 ? <p>No users found</p> :
            <ul>
              {similarUsers.map((user) => (
                <li key={user.id}>
                  <SearchSpanComponent text={user.username} onClick={() => redirectToSearch(`/profile/${user.id}`)} />
                </li>
              ))}
            </ul>

          )}
          {selectedTab === "stocks" && (
            // No found if no similar stocks
            similarStocks.length === 0 ? <p>No stocks found</p> :
            <ul>
              {similarStocks.map((stock) => (
                <li key={stock.symbol}>
                  <SearchSpanComponent text={stock.name} onClick={() => redirectToSearch(`/stocks/${stock.id}`)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

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

        <div className="navbar-center">
          <div className={`navbar-search-bar-container ${isSearchExpanded ? 'expanded' : ''}`}>
            <input
              type="text"
              placeholder="Search..."
              onClick={handleSearchClick}
              className="navbar-search-input"
            />
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
        </div>

        <div className="auth-section">
          {isLoggedIn ? (
            <div className="user-profile">
              <FaUserCircle className="user-icon" onClick={handleProfile} />
              <span className="user-name" onClick={handleProfile}> {userName} </span>
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

const SearchSpanComponent = ({ text, onClick }) => {
  return (
    <span className="navbar-search-span" onClick={onClick}>
      {text}
    </span>
  );
};

export default Dashboard;