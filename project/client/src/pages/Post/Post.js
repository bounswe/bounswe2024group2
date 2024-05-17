import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Post.css'; // Make sure to create Post.css for styling

const Post = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [filmTitle, setFilmTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [entityId, setEntityId] = useState('')
  const maxRating = 10; // Maximum rating value

  useEffect(() => {
    if (state && state.filmDetails) {
      setFilmTitle(state.filmDetails.label);
      setEntityId(state.filmDetails.entity_id);
      setPoster(state.filmDetails.poster);
    }
  }, [state]);
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handlePost = async () => {
    try {
      const csrfToken = localStorage.getItem('csrfToken'); // Get CSRF token from local storage
      console.log('CSRF Token:', csrfToken);
      // encodeURIComponent(filmTitle) is used to encode the film title to be used in the URL
      const response = await fetch('http://207.154.242.6:8020/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${csrfToken}`, // Include CSRF token in the headers
        },
        body: JSON.stringify({
          title: filmTitle,
          content: text,
          film: filmTitle, // Replace entity_id with the actual entity ID of the film
        }),
      });
      const responseData = await response.json();
      console.log('Posted:', responseData);
      setSuccessMessage('Post successfully created!');
      setText('');
      setRating(0);

      // Navigate back to film details page after 2 seconds
      setTimeout(() => {
        navigate(-1); // Go back to the previous page
      }, 2000);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="post-container">
      <h2>{filmTitle}</h2>
      <div className="poster-section">
        <img src={poster || 'film_poster.jpg'} alt="Film Poster" />
      </div>
      <div className="text-section">
        <textarea
          placeholder="Write your post here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <div className="rating-section">
        <p>Rating:</p>
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
      <button onClick={handlePost}>Post</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Post;
