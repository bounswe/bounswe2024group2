import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mockPosts from "../../data/mockPosts";
import FinancialGraph from "./FinancialGraph";
import "../../styles/community/PostView.css";
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
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState(""); // State for the new comment

  const getColorForTag = (tag) => {
    const asciiValue = tag.charCodeAt(0);
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];
    return colors[asciiValue % 5];
  };

  useEffect(() => {
    const fetchBackendPost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/`
        );
        if (!response.ok) throw new Error("Failed to fetch post");
        const backendPost = await response.json();

        const normalizedPost = {
          "post-id": backendPost.id,
          user: backendPost.author.username || "Unknown",
          title: backendPost.title,
          content: [{ type: "plain-text", "plain-text": backendPost.content }],
          comments: [],
          likes: backendPost.liked_by.length,
          tags: backendPost.tags.map((tag) => tag.name),
          "publication-date": new Date(
            backendPost.created_at
          ).toLocaleDateString(),
        };
        setPost(normalizedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const mockPost = mockPosts.find(
      (post) => post["post-id"] === parseInt(postId)
    );
    if (mockPost) {
      setPost(mockPost);
    } else {
      fetchBackendPost();
    }
  }, [postId]);

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      const newComment = {
        "comment-id": Date.now(), // Generate unique id for the new comment
        user: "Current User", // You can replace with actual user info
        comment: commentText,
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
      setCommentText(""); // Clear the comment box after submission
    }
  };

  if (!post) {
    return <p>Post not found!</p>;
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
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="tag"
            style={{ backgroundColor: getColorForTag(tag), color: "#ffffff" }}
          >
            {tag}
          </span>
        ))}
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
        {/* Comment box and button */}
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
