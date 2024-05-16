import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'; // Adjust the path if necessary
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({ isLoggedIn, username }) => {
  const [profileData, setProfileData] = useState({
    username: username || 'defaultUser',
    followers: 0,
    following: 0,
    films: 0,
    userLists: 0,
    description: 'No description available.',
    favoriteFilms: [],
    recentlyWatched: [],
    recentPosts: [],
    lists: []
  });

  useEffect(() => {
    // Fetch profile data from an API or local storage if needed
    fetch('/api/profile')
    .then(response => response.json())
    .then(data => setProfileData(data));

    // For demonstration, setting a timeout to simulate fetching data
    setTimeout(() => {
      setProfileData({
        username: 'meowie',
        followers: 58,
        following: 92,
        films: 118,
        userLists: 18,
        description: 'Enthusiastic about movies and cats. Watches sci-fi movies.',
        favoriteFilms: [
          { id: 1, title: 'Kiki\'s Delivery Service', poster: 'kikis_delivery_service.jpg' },
          { id: 2, title: 'Over the Moon', poster: 'over_the_moon.jpg' },
          { id: 3, title: 'Parasite', poster: 'parasite.jpg' },
          { id: 4, title: 'Interstellar', poster: 'interstellar.jpg' },
        ],
        recentlyWatched: [
          { id: 1, title: 'Little Forest', poster: 'little_forest.jpg' },
          { id: 2, title: 'Ballerina', poster: 'ballerina.jpg' },
          { id: 3, title: 'Your Name', poster: 'your_name.jpg' },
          { id: 4, title: 'About Dry Grasses', poster: 'about_dry_grasses.jpg' },
        ],
        recentPosts: [
          { id: 1, title: 'Parasite', image: 'parasite.jpg', content: 'Finally some people started to talk not only about series but also about Korean movies, too. The film, you know, perfect.' },
          { id: 2, title: 'Ballerina', image: 'ballerina.jpg', content: 'I watched this film with my little cousins. It’s inspiring and songs are perfect. Definitely recommend!!' },
        ],
        lists: [
          { id: 1, title: 'Animated Movies', image: 'animated_movies.jpg' },
          { id: 2, title: 'Adventure Movies', image: 'adventure_movies.jpg' },
        ]
      });
    }, 2000); // Simulate a 2-second delay for fetching data
  }, [username]);

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={() => {}} /> {/* Add NavBar */}
      <div className="profile-banner">
        <img src="/profile.jpg" alt="Profile" />
        <div className="profile-info">
          <h1>{profileData.username}</h1>
          <p>{profileData.description}</p>
        </div>
        <div className="profile-stats">
          <div>
            <h2>{profileData.followers}</h2>
            <p>followers</p>
          </div>
          <div>
            <h2>{profileData.following}</h2>
            <p>following</p>
          </div>
          <div>
            <h2>{profileData.films}</h2>
            <p>films</p>
          </div>
          <div>
            <h2>{profileData.userLists}</h2>
            <p>lists</p>
          </div>
        </div>
      </div>
      <div className="tab-nav">
        <button className="active">Profile</button>
        <button>Posts</button>
        <button>Films</button>
        <button>Lists</button>
        <button>Likes</button>
      </div>
      <div className="content-section">
        <h2>Favorite films</h2>
        <div className="films-grid">
          {profileData.favoriteFilms.length === 0 ? (
            <p>No favorite films yet.</p>
          ) : (
            profileData.favoriteFilms.map(film => (
              <div key={film.id} className="film-card">
                <img src={film.poster} alt={film.title} />
                <p>{film.title}</p>
              </div>
            ))
          )}
        </div>
        <h2>Recently watched</h2>
        <div className="films-grid">
          {profileData.recentlyWatched.length === 0 ? (
            <p>No recently watched films.</p>
          ) : (
            profileData.recentlyWatched.map(film => (
              <div key={film.id} className="film-card">
                <img src={film.poster} alt={film.title} />
                <p>{film.title}</p>
              </div>
            ))
          )}
        </div>
        <h2>Recent posts</h2>
        <div className="posts-list">
          {profileData.recentPosts.length === 0 ? (
            <p>No recent posts.</p>
          ) : (
            profileData.recentPosts.map(post => (
              <div key={post.id} className="post-card">
                <img src={post.image} alt={post.title} />
                <div>
                  <p>{post.title}</p>
                  <p>{post.content}</p>
                </div>
                <div className="actions">
                  <button>Like</button>
                  <button>Comment</button>
                </div>
              </div>
            ))
          )}
        </div>
        <h2>Lists</h2>
        <div className="lists-grid">
          {profileData.lists.length === 0 ? (
            <p>No lists created.</p>
          ) : (
            profileData.lists.map(list => (
              <div key={list.id} className="list-card">
                <img src={list.image} alt={list.title} />
                <p>{list.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;