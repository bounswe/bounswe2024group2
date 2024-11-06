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
  comments: 12,
  badges: [
    { label: 'Highliked', icon: '🏅' },
    { label: 'Creatager', icon: '🏅' }
  ]
};

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-stats">
          <div className="stat-item">
            <p>{userProfile.followers} Followers</p>
          </div>
          <div className="stat-item">
            <p>{userProfile.following} Following</p>
          </div>
          <div className="stat-item">
            <p>{userProfile.posts} Posts</p>
          </div>
          <div className="stat-item">
            <p>{userProfile.portfolios} Portfolios</p>
          </div>
          <div className="stat-item">
            <p>{userProfile.comments} Comments</p>
          </div>
        </div>

        <div className="profile-info-container">
          <div className="profile-info">
            <div className="profile-avatar">
              <span>IMG</span>
            </div>
            <div className="profile-details">
              <h1>{userProfile.name}</h1>
              <p>{userProfile.username}</p>
            </div>
          </div>
          <div className="profile-badges">
            {userProfile.badges.map((badge, index) => (
              <div key={index} className="badge">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-label">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Profile Selector Section */}
      <nav className="profile-selector">
        <button className="selector-item">Posts</button>
        <button className="selector-item">Portfolios</button>
        <button className="selector-item">Comments</button>
        <button className="selector-item">Followers</button>
        <button className="selector-item">Following</button>
        <button className="selector-item">Settings</button>
      </nav>
    </div>
  );
};

export default ProfilePage;
