import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import RecentPosts from './components/RecentPosts';
import FilmList from './components/FilmList';
import './MainPage.css'; // Make sure this path is correct

function MainPage({ isLoggedIn, setIsLoggedIn }) {
  const [recentFilms, setRecentFilms] = useState([]);

  const mockPosts = [
  {
    id: 1,
    user: 'johndoe',
    title: 'Inception',
    content: 'Mind-blowing narrative and effects. A must-watch!',
    rating: '★★★★☆'
  },
  {
    id: 2,
    user: 'janedoe',
    title: 'Parasite',
    content: 'A brilliant social satire that will keep you on the edge of your seat.',
    rating: '★★★★★'
  },
  {
    id: 3,
    user: 'smith',
    title: 'Interstellar',
    content: 'A visually stunning masterpiece with deep emotional resonance.',
    rating: '★★★★☆'
  },
  // Add more mock post data...
];


  useEffect(() => {
    fetch('http://localhost:8020/recently-release-films/', {
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
  }, []);



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
