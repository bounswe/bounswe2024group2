// src/pages/Main/FilmDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import './FilmDetailsPage.css';

const FilmDetailsPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const { id } = useParams(); // Assuming the film ID is passed as a URL parameter
  const decodedId = decodeURIComponent(id);
  const [filmDetails, setFilmDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8020/get-film-details/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entity_id: decodedId }),
    })
      .then((response) => response.json())
      .then((details) => {
        console.log('Film Details:', details[0]); // Log details
        setFilmDetails(details[0]);
      })
      .catch((error) => {
        console.error('Error fetching film details:', error);
      });
  }, [decodedId]);

  if (!filmDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="film-details-page">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <h2 className="page-title">Film Details Page</h2>
        <div className="film-details">
          <img className="film-poster" src={filmDetails.poster || './no_poster.png'} alt={filmDetails.label} />
          <div className="film-info">
            <h3 className="film-title">{filmDetails.label} <span className="film-rating">★★★★★</span></h3>
            <p className="film-genres">{filmDetails.genres.map(genre => genre.label).join(', ')}</p>
            <p className="film-description">{filmDetails.description}</p>
            <button className="create-post-button">Create Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsPage;
