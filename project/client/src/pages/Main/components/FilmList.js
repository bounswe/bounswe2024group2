// src/pages/Main/components/FilmList.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../MainPage.css'; // Your CSS for the FilmList

function FilmList({ title, films }) {
  return (
    <section className="film-list">
      <h2 style={{ marginBottom: 10, color: "white" }}>{title}</h2>
      <div className="film-container">
        {films.map(film => (
          <Link to={`/film/${encodeURIComponent(film.id)}`} key={film.id} className="movie-item">
            <img src={film.poster} alt={film.title} />
            <span>{film.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FilmList;
