// NavBar.js
import React from 'react';
import './NavBar.css'; // Make sure the path to your CSS file is correct

function NavBar() {
  return (
    <div className="navbar">
      <img src="/logo.png" alt="SemanticFlix" className="logo" />
      <div className="nav-links">
        <a href="/meowie">meowie</a>
        <a href="/films">Films</a>
        <a href="/lists">Lists</a>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search" />
        <button type="submit">Q</button>
      </div>
    </div>
  );
}

export default NavBar;
