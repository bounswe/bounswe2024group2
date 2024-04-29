import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import RecentPosts from './components/RecentPosts';
import FilmList from './components/FilmList';
import './MainPage.css'; // Make sure this path is correct

function MainPage({ isLoggedIn, setIsLoggedIn }) {
  const [recentFilms, setRecentFilms] = useState([]);

  useEffect(() => {
    fetch('http://207.154.242.6:8020/recently-release-films/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include your CSRF token header as needed for your backend
      },
      body: JSON.stringify({ limit: 5 }),
    })
      .then((response) => response.json())
      .then((data) => {
        const films = data.map((item, index) => ({
          id: index, // Assuming you want a local id
          title: item.label,
          poster: './no_poster.png' // Placeholder if you don't have poster URLs
        }));
        setRecentFilms(films);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures this runs once on mount

  const mockPosts = [
    // Your mockPosts data...
  ];

  return (
    <div className="main-page">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <RecentPosts posts={mockPosts} />
      <FilmList title="Recently released" films={recentFilms} />
      <FilmList title="Popular films" films={recentFilms} /> {/* Replace with actual popular films if you have different data */}
      <FilmList title="Popular lists" films={recentFilms} /> {/* Replace with actual popular lists if you have different data */}
    </div>
  );
}

export default MainPage;
