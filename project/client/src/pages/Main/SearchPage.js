// src/pages/Main/SearchPage.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import './components/NavBar.css';
import './MainPage.css';

const SearchPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');
  const searchCategory = queryParams.get('category');

  useEffect(() => {
    if (searchQuery) {
      // Fetch initial search results
      fetch('http://localhost:8020/query-film-pattern/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pattern: searchQuery, limit: 10 }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Initial Data:', data); // Log initial data
          if (!Array.isArray(data)) {
            throw new Error('Expected data to be an array');
          }
          // Map initial results and fetch detailed information for each result
          const fetchDetailsPromises = data.map((item) => {
            const result = {
              id: item.id,
              title: item.label,
              poster: './no_poster.png',
              description: '',
            };

            // Fetch movie details
            return fetch('http://localhost:8020/get-film-details/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ entity_id: item.id }),
            })
              .then((response) => response.json())
              .then((details) => {
                console.log('Details for', item.id, ':', details[0]); // Log details
                return {
                  id: item.id,
                  title: details[0].label,
                  poster: details[0].poster || './no_poster.png',
                  description: details[0].description,
                };
              })
              .catch((error) => {
                console.error('Error fetching details:', error);
                return result; // Return the initial result if there's an error
              });
          });

          // Wait for all details fetch promises to resolve
          Promise.all(fetchDetailsPromises).then((resultsWithDetails) => {
            console.log('Results with details:', resultsWithDetails); // Log results with details
            setSearchResults(resultsWithDetails);
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="main-page">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <h2>Search Results</h2>
        <div className="search-results">
          {searchResults.map((film) => (
            <Link to={`/film/${encodeURIComponent(film.id)}`} key={film.id} className="search-result-item">
              <img src={film.poster} alt={film.title} />
              <div>
                <h3>{film.title}</h3>
                <p>{film.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
