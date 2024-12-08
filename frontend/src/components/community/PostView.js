import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mockPosts from "../../data/mockPosts";
import FinancialGraph from "./FinancialGraph";
import "../../styles/community/PostView.css";
import apiClient from "../../service/apiClient";
import CircleAnimation from "../CircleAnimation";
import NotFound from "../notfound/NotFound";
import {
  FaNewspaper,
  FaImage,
  FaChartLine,
  FaThumbsUp,
  FaComment,
  FaUserPlus,
  FaCircle,
} from "react-icons/fa";

const PostView = () => {
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState({});
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  const fetchTags = async (tags) => {
    try {
      const tagPromises = tags.map((tag) => apiClient.get(`/tags/${tag.id}/`));
      const responses = await Promise.all(tagPromises);
      const tagNames = responses.map((response) => response.data.name);

      setTags(tagNames);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/users");
      const usersById = response.data.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
      setUsers(usersById);
      setIsUsersLoaded(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getColorForTag = (tag) => {
    const asciiValue = tag.charCodeAt(0);
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];
    return colors[asciiValue % 5];
  };

  useEffect(() => {
    if (!isUsersLoaded) {
      fetchUsers();
    }
  }, [isUsersLoaded]);

  useEffect(() => {
    const fetchBackendPost = async () => {
      try {
        const response = await apiClient.get(`/posts/${postId}/`);
        const backendPost = response.data;
        const normalizedPost = {
          "post-id": backendPost.id,
          user: users[backendPost.author] || "Unknown",
          title: backendPost.title,
          content: [{ type: "plain-text", "plain-text": backendPost.content }],
          comments: [],
          likes: backendPost.liked_by.length,
          tags: backendPost.tags,
          "publication-date": new Date(
            backendPost.created_at
          ).toLocaleDateString(),
        };

        setPost(normalizedPost);
        fetchTags(backendPost.tags);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (isUsersLoaded) {
      const fetchData = async () => {
        const mockPost = mockPosts.find(
          (post) => post["post-id"] === parseInt(postId)
        );
        if (mockPost) {
          setPost(mockPost);
          setTags(mockPost.tags);
        } else {
          await fetchBackendPost();
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isUsersLoaded, postId, users]);
  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment = {
        "comment-id": Date.now(),
        user: "Current User",
        comment: commentText,
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
      setCommentText("");
    }
  };

  if (loading) {
    return (
      <p>
        <CircleAnimation />
      </p>
    );
  }
  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="post-view">
      <h1>{post.title}</h1>
      <div className="post-author">
        <p>By: {post["user"]}</p>
        <p>Published on: {post["publication-date"]}</p>
        <button className="follow-button">
          <FaUserPlus /> Follow Author
        </button>
      </div>
      <div className="tags">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              style={{ backgroundColor: getColorForTag(tag), color: "#ffffff" }}
            >
              {tag}
            </span>
          ))
        ) : (
          <p>Loading tags...</p>
        )}
      </div>
      <div className="post-content">
        {post.content.map((content, index) => (
          <div className="timeline-item" key={index}>
            <span className="timeline-dot">
              {content.type === "plain-text" && <FaCircle className="icon" />}
              {content.type === "news" && <FaNewspaper className="icon" />}
              {content.type === "image" && <FaImage className="icon" />}
              {content.type === "graph" && <FaChartLine className="icon" />}
            </span>
            <div className="timeline-content">
              {content.type === "plain-text" && <p>{content["plain-text"]}</p>}
              {content.type === "news" && (
                <div className="news">
                  <a
                    href={content["news-link"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h3>{content["news-title"]}</h3>
                    <p>{content["news-description"]}</p>
                  </a>
                  <p className="footer-label">
                    Click the title for more details.
                  </p>
                </div>
              )}
              {content.type === "image" && (
                <div className="image">
                  <img src={content["image-url"]} alt={content["image-alt"]} />
                  <p className="footer-label">
                    Image description: {content["image-alt"]}
                  </p>
                </div>
              )}
              {content.type === "graph" && (
                <div className="graph">
                  <FinancialGraph />
                  <p className="footer-label">
                    Financial trends illustrated above.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="comments">
        <h2>Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment["comment-id"]} className="comment">
            <span className="comment-user">{comment.user}</span>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
        <div className="comment-box">
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          />
          <button className="comment-button" onClick={handleSubmitComment}>
            <FaComment /> Submit Comment
          </button>
        </div>
      </div>
      <div className="post-actions">
        <button className="like-button">
          <FaThumbsUp /> Like
        </button>
        <button className="comment-button">
          <FaComment /> Comment
        </button>
      </div>
    </div>
  );
};

export default PostView;
