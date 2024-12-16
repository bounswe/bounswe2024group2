import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../service/profileService';
import "../../styles/UserCard.css"; // Add specific styling here

const UserCard = ({ userId }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProfileService.fetchUserById(userId)
      .then((userData) => {
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setUser(null);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!user) {
    return <span>Error loading user data.</span>;
  }

  return (
    <div
      className="user-card"
      onClick={() => navigate(`/profile/${user.id}`)}
    >
      <div className="user-avatar">
        {user.image ? (
          <img src={user.image} alt={`${user.username}'s avatar`} />
        ) : (
          <span className="user-avatar-placeholder">
            {user.username.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="user-info">
        <h3>{user.username}</h3>
      </div>
    </div>
  );
};

export default UserCard;
