import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RecentPosts from './components/RecentPosts';
import FilmList from './components/FilmList';
import SearchPage from './SearchPage';
import FilmDetailsPage from './FilmDetailsPage';
import Post from '../Post/Post';
import './MainPage.css';

function MainPage({ isLoggedIn, setIsLoggedIn }) {
  const [recentFilms, setRecentFilms] = useState([]);

  const mockPosts = [
    {
      id: 1,
      user: 'johndoe',
      title: 'Inception',
      content: 'Mind-blowing narrative and effects. A must-watch!',
      rating: '★★★★☆',
    },
    {
      id: 2,
      user: 'janedoe',
      title: 'Parasite',
      content: 'A brilliant social satire that will keep you on the edge of your seat.',
      rating: '★★★★★',
    },
    {
      id: 3,
      user: 'smith',
      title: 'Interstellar',
      content: 'A visually stunning masterpiece with deep emotional resonance.',
      rating: '★★★★☆',
    },
  ];

  useEffect(() => {
    fetch('http://207.154.242.6:8020//recently-release-films/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ limit: 5 }),
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchDetailsPromises = data.map((item) => {
          return fetch('http://207.154.242.6:8020/get-film-details/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ entity_id: item.id }),
          })
            .then((response) => response.json())
            .then((details) => ({
              id: item.id,
              title: item.label,
              poster: details[0].poster || './no_poster.png',
            }))
            .catch((error) => {
              console.error('Error fetching details:', error);
              return { id: item.id, title: item.label, poster: './no_poster.png' };
            });
        });

        Promise.all(fetchDetailsPromises).then((films) => {
          setRecentFilms(films);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="main-page">
      <Routes>
        <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/film/:id" element={<FilmDetailsPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/create-post" element={<Post />} />
        <Route
          path="/"
          element={
            <>
              <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <RecentPosts posts={mockPosts} />
              <FilmList title="Recently released" films={recentFilms} />
              <FilmList title="Popular films" films={recentFilms} />
              <FilmList title="Popular lists" films={recentFilms} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MainPage;
