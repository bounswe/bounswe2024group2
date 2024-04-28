// components/FilmList.js

import React from 'react';
import './FilmList.css'; // Your CSS for the FilmList

function FilmList({ title, films }) {
    return (
      <section className="film-list">
        <h2>{title}</h2>
        <div className="film-container">
          {films.map(film => (
            <div key={film.id} className="movie-item">
              <img src={film.poster} alt={film.title} />
              <span>{film.title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

export default FilmList;
