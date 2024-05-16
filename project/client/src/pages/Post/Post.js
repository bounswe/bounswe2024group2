// post.js

import React, { useState, useEffect } from 'react';
import './Post.css'; // Make sure to create Post.css for styling

const Post = () => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [filmTitle, setFilmTitle] = useState('');
  const maxRating = 10; // Maximum rating value

  useEffect(() => {
    // Fetch film title from the API
    fetchFilmTitle();
  }, []);

  // Function to fetch film title from the API
  const fetchFilmTitle = async () => {
    try {
      const response = await fetch('http://207.154.242.6:8020/post/');
      const data = await response.json();
      // Assuming the film title is available in the response data
      setFilmTitle(data.title);
    } catch (error) {
      console.error('Error fetching film title:', error);
    }
  };

  // Function to handle changes in text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Function to handle rating selection
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Function to handle post submission
  const handlePost = async () => {
    try {
      // POST request to post the data to the API
      const response = await fetch('http://207.154.242.6:8020/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'gRq1e5V5s60cKi7AsEvvGM1hOrcBmXfY8B4zpQWLvc3OpOCgHu99tD6QLqgjK2aV', // Assuming the CSRF token is static
        },
        body: JSON.stringify({
          title: filmTitle, // Sending the film title
          content: text,
          rating: rating,
        }),
      });
      const responseData = await response.json();
      console.log('Posted:', responseData);
      // Clear input fields after posting
      setText('');
      setRating(0);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="post-container">
      {/* Display the film title */}
      <h2>{filmTitle}</h2>
      {/* Film poster section */}
      <div className="poster-section">
        <img src="film_poster.jpg" alt="Film Poster" />
      </div>
      {/* Text input section */}
      <div className="text-section">
        <textarea
          placeholder="Write your post here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </div>
      {/* Rating section */}
      <div className="rating-section">
        <p>Rating:</p>
        {/* Rendering stars */}
        {[...Array(maxRating)].map((_, index) => (
          <span
            key={index}
            className={index + 1 <= rating ? 'star filled' : 'star'}
            onClick={() => handleRatingChange(index + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
      {/* Post button */}
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default Post;
