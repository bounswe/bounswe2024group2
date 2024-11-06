import React from 'react';
import "../../styles/Profile.css";

// Sample data 
const userProfile = {
  name: 'Deniz Coşkuner',
  username: '@danzio',
  followers: 151,
  following: 32,
  posts: 15,
  portfolios: 1,
  comments: 12
};

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <span>IMG</span>
          </div>
          <div className="profile-details">
            <h1>{userProfile.name}</h1>
            <p>{userProfile.username}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <h2>{userProfile.followers}</h2>
            <p>Followers</p>
          </div>
          <div className="stat-item">
            <h2>{userProfile.following}</h2>
            <p>Following</p>
          </div>
          <div className="stat-item">
            <h2>{userProfile.posts}</h2>
            <p>Posts</p>
          </div>
          <div className="stat-item">
            <h2>{userProfile.portfolios}</h2>
            <p>Portfolios</p>
          </div>
          <div className="stat-item">
            <h2>{userProfile.comments}</h2>
            <p>Comments</p>
          </div>
        </div>
      </header>

      
    </div>
  );
};

export default ProfilePage;
