import React from 'react';
import '../MainPage'; // Your CSS for the FilmList

function FilmList({ title, films }) {
    return (
      <section className="film-list">
        <h2 style={{marginBottom: 10, color:"white"}}>{title}</h2>
        <div className="film-container">
          {films.map(film => (
            <div key={film.id} className="movie-item">
              <img src={film.poster} /* alt={film.title} */ />
              {/* i need to see the below text */}
              <span>{film.title}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

export default FilmList;
