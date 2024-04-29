import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../MainPage.css'; // Make sure the path to your CSS file is correct

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Clear persisted login state
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="navbar">
    <img src="./logo.png" alt="SemanticFlix" className="logo" />
    <div className="nav-links">
      <a href="/films">Films</a>
      <a href="/lists">Lists</a>
      {/* Conditionally render link based on `isLoggedIn` */}
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
    <div className="search-container">
      <input type="text" placeholder="Search" />
      <button type="submit">Q</button>
    </div>
  </div>
  );
}

export default NavBar;
