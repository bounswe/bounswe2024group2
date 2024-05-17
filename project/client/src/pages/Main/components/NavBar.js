import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('films');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Clears the search results (if any)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${searchTerm}&category=${searchCategory}`);
  };

  return (
    <div className="navbar">
      <img src="./logo.png" alt="SemanticFlix" className="logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/films">Films</Link>
        <Link to="/lists">Lists</Link>
        <Link to="/posts">Posts</Link> {/* New Posts link */}
        <Link to="/search">Search</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <form ref={searchRef} className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
          <option value="films">Films</option>
          <option value="cast">Cast</option>
          <option value="posts">Posts</option>
        </select>
        <button type="submit">Q</button>
      </form>
    </div>
  );
}

export default NavBar;
