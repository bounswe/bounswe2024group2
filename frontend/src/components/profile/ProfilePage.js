import React, { useEffect, useState } from 'react';
import "../../styles/Profile.css";
import "../../styles/Page.css";
import UserService from '../../service/userService';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../service/profileService';
import CircleAnimation from '../CircleAnimation';
import { toast } from "react-toastify";

// Sample data 
const userProfilex = {
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

  // Get user profile from user service
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get active user id
    if (!UserService.isLoggedIn()) {
      navigate('/login');
    }
    const userId = UserService.getUserId();

    setLoading(true);
    // Fetch user profile
    ProfileService.fetchProfileById(userId).then((profile) => {
      // setUserProfile(profile);
      setUserProfile(userProfilex);
      console.log(profile);
      setLoading(false);

    }).catch((error) => {
      console.error('Error fetching user profile:', error);
      toast.error('Error fetching user profile');
      setUserProfile(userProfilex);
      setLoading(false);
    }
    );
  }, [navigate]);

  if (loading) {
    return <CircleAnimation />;
  }

  return (
    <div className='page'>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-avatar">
            <span>IMG</span>
          </div>
          <div className="profile-right-container">
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
            <div className="profile-info">
              <div className="profile-details">
                <h1>{userProfile.name}</h1>
                <p>{userProfile.username}</p>
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
          </div>
        </div>

        <nav className="profile-selector">
          <button className="selector-item">Posts</button>
          <button className="selector-item">Portfolios</button>
          <button className="selector-item">Comments</button>
          <button className="selector-item">Followers</button>
          <button className="selector-item">Following</button>
          <button className="selector-item">Settings</button>
        </nav>
      </div>
    </div>
  );
};

export default ProfilePage;
