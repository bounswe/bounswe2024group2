import React from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/community/PostCard.css";

const getColorForTag = (tag) => {
  const tagName = typeof tag === "string" ? tag : tag.name;
  const asciiValue = tagName.charCodeAt(0);
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];
  return colors[asciiValue % 5];
};

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const navigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <p className="post-meta">
          Published on:{" "}
          <span>{new Date(post["publication-date"]).toLocaleDateString()}</span>{" "}
          by <span>{post["user"]}</span>
        </p>
      </div>
      <p>{post.content[0]["plain-text"]}</p>
      <div className="post-info">
        <div className="post-stats">
          <span className="likes">
            <FaHeart className="icon like-icon" /> {post.likes}
          </span>
          <span className="comments-box">
            <FaComment className="icon comment-icon" /> {post.comments.length}
          </span>
        </div>
        <button
          className="view-button"
          onClick={() => navigateToPost(post["post-id"])}
        >
          View Post
        </button>
      </div>
      <div className="post-tags">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="post-tag"
            style={{ backgroundColor: getColorForTag(tag) }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
