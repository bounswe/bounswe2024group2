import React, { useEffect, useState } from 'react';
import "../../styles/Profile.css";
import "../../styles/Page.css";
import UserService from '../../service/userService';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileService from '../../service/profileService';
import CircleAnimation from '../CircleAnimation';
import { toast } from "react-toastify";
import log from '../../utils/logger';
import UserCard from './UserCard';

// Sample data fallback
const userProfilex = {
  name: 'Unknown',
  image: null,
  username: 'unknown',
  followers: [],
  following: [],
  posts: [],
  comments: [],
  badges: []
};

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('Posts');
  const isCurrentUser = userId === UserService.getUserId();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      navigate('/login');
    }

    log.debug('Fetching profile for user ID:', userId);
    setLoading(true);

    ProfileService.fetchProfileById(userId)
      .then((profile) => {
        setUserProfile(profile);

        updateIsFollowing(userProfile).then(() => {
          setLoading(false);
          log.debug('Profile loaded:', profile);
        }).catch((error) => {
          console.error('Error updating isFollowing:', error);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        toast.error('Error fetching user profile');
        setUserProfile(userProfilex);
        setLoading(false);
      });    
  }, [navigate, userId]);


  useEffect(() => {
    ProfileService.fetchProfileById(userId)
    .then((profile) => {
      setUserProfile(profile);
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });    
  }, [isFollowing]);

  const updateIsFollowing = async (user) => {
    if (!isCurrentUser) {
      const result = await ProfileService.isFollowing(UserService.getUserId(), userId)
      setIsFollowing(result);
    }
  };

  const renderListContent = () => {
    if (!userProfile) return null;

    const contentMap = {
      Posts: userProfile.posts,
      Comments: userProfile.comments,
      Followers: userProfile.followers,
      Following: userProfile.following
    };

    const content = contentMap[currentTab];
    if (!content || content.length === 0) {
      return <p>No {currentTab.toLowerCase()} available.</p>;
    }

    return (
      <ul className="list-content">
        {content.map((item, index) => (
          <li key={index}>
            {currentTab === 'Following' || currentTab === 'Followers' ? (
              <UserCard userId={item} />

            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const handleFollowToggle = (user) => {
    const action = isFollowing ? 'Unfollow' : 'Follow';

    ProfileService.handleFollowToggle(user.username)
      .then(async (message) => {
        toast.success(`${message} ${user.username}`);
        await updateIsFollowing();
      })
      .catch((error) => {
        console.error(`Failed to ${action.toLowerCase()} user:`, error);
        toast.error(`Failed to ${action.toLowerCase()} user.`);
      });

      
  };

  if (loading) {
    return <CircleAnimation />;
  }

  return (
    <div className='page'>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-avatar">
            {userProfile.image ? (
              <img src={userProfile.image} alt="Profile Avatar" />
            ) : (
              <span className="profile-avatar-placeholder">
                {userProfile.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="profile-right-container">
            <div className="profile-stats">
              <div className="stat-item"><p>{userProfile.followersCnt} Followers</p></div>
              <div className="stat-item"><p>{userProfile.followingCnt} Following</p></div>
              <div className="stat-item"><p>{userProfile.postsCnt} Posts</p></div>
              <div className="stat-item"><p>{userProfile.commentsCnt} Comments</p></div>
            </div>
            <div className="profile-info">
              <div className="profile-details">
                <h1>{userProfile.username}</h1>
                {!isCurrentUser && (
                  <button className= {`follow-button ${isFollowing ? 'following' : ''}`}
                    onClick={() => handleFollowToggle(userProfile)}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
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
          {['Posts', 'Comments', 'Followers', 'Following'].map((tab) => (
            <button
              key={tab}
              className={`selector-item ${currentTab === tab ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="profile-content">
          {renderListContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
