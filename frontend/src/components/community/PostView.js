import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinancialGraph from "./FinancialGraph";
import "../../styles/community/PostView.css";
import { apiClient } from "../../service/apiClient";
import CircleAnimation from "../CircleAnimation";
import NotFound from "../notfound/NotFound";
import UserService from "../../service/userService";
import { renderContentWithAnnotations } from "./AnnotationUtils";
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
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [usernameCache, setUsernameCache] = useState(new Map());

  const getUserName = async (userID) => {
    if (usernameCache.has(userID)) {
      return usernameCache.get(userID);
    }

    try {
      const userData = await apiClient.get(`/users/${userID}`);
      const userName = userData.data.username;
      setUsernameCache((prevCache) => new Map(prevCache).set(userID, userName)); // Update the cache
      return userName;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown";
    }
  };

  const fetchAnnotations = async () => {
    try {
      const response = await apiClient.get(
        `/annotations/post-annotations/${postId}`
      );
      console.log("Fetched annotations from API:", response.data);

      const annotationsData = await Promise.all(
        response.data.map(async (annotation) => {
          const username = await getUserName(annotation.user_id); // Fetch username
          const creationDate = new Date(
            annotation.created_at
          ).toLocaleDateString(); // Format creation date
          return {
            ...annotation,
            username,
            creationDate, // Store formatted creation date
          };
        })
      );
      setAnnotations(annotationsData);
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const handleTextSelection = async () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log("range", range);
      // Normalize to prevent capturing whitespace:
      const cleanText = range.toString().trim();
      const cleanStart = range.startOffset + range.toString().search(/\S/);
      const cleanEnd = cleanStart + cleanText.length;

      if (cleanText) {
        const note = prompt("Enter a note for the selected text:");
        if (note) {
          const annotationPayload = {
            post_id: parseInt(postId, 10),
            start: cleanStart,
            end: cleanEnd,
            value: note,
          };

          console.log("Payload to be sent:", annotationPayload);

          try {
            await apiClient.post("/annotations/", annotationPayload);
            setAnnotations((prev) => [...prev, annotationPayload]);
            alert("Annotation added successfully!");
          } catch (error) {
            console.error("Error adding annotation:", error);
          }
        }
      }
    }
  };

  const getColorForTag = (tag) => {
    const tagName = typeof tag === "string" ? tag : tag.name;
    const asciiValue = tagName.charCodeAt(0);
    const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];
    return colors[asciiValue % 5];
  };

  useEffect(() => {
    const fetchBackendPost = async () => {
      try {
        const response = await apiClient.get(`/posts/${postId}/`);
        const backendPost = response.data;
        const commentsResponse = await apiClient.get(
          `/comments/post-comments/${postId}`
        );

        const commentsData = commentsResponse.data;

        const backendComments = await Promise.all(
          commentsData.reverse().map(async (comment) => {
            const username = await getUserName(comment.user_id);
            return {
              "comment-id": comment.id,
              user: username,
              comment: comment.content,
            };
          })
        );

        const loggedInUser = parseInt(UserService.getUserId(), 10);
        const userHasLiked = backendPost.liked_by.includes(loggedInUser);
        const normalizedPost = {
          "post-id": backendPost.id,
          user: await getUserName(backendPost.author),
          title: backendPost.title,
          content: [{ type: "plain-text", "plain-text": backendPost.content }],
          comments: backendComments,
          likes: backendPost.liked_by.length,
          tags: backendPost.tags,
          "publication-date": new Date(
            backendPost.created_at
          ).toLocaleDateString(),
        };
        setIsLikedByUser(userHasLiked);
        setPost(normalizedPost);
        setTags(backendPost.tags);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchBackendPost();
    }
  }, [postId]);

  const handleCommentChange = (e) => setCommentText(e.target.value);

  const handleSubmitComment = async () => {
    if (commentText.trim()) {
      try {
        const username = UserService.getUsername();

        const payload = {
          post_id: postId,
          content: commentText.trim(),
        };

        await apiClient.post("/comments/", payload);

        setPost((prevPost) => ({
          ...prevPost,
          comments: [
            {
              "comment-id": Date.now(), // Temporary ID until refreshed
              user: username,
              comment: commentText.trim(),
            },
            ...prevPost.comments, // Prepend the new comment
          ],
        }));
        setCommentText("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  const handleToggleLike = async () => {
    try {
      const endpoint = isLikedByUser ? `/like` : `/like`; // Reuse the same endpoint for toggling
      const payload = { post_id: postId };

      await apiClient.post(endpoint, payload);

      setPost((prevPost) => ({
        ...prevPost,
        likes: isLikedByUser ? prevPost.likes - 1 : prevPost.likes + 1,
      }));

      setIsLikedByUser((prevLiked) => !prevLiked);
    } catch (error) {
      console.error(`Error toggling like state: ${error.message}`);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchAnnotations();
    }
  }, [postId]);

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
              style={{
                backgroundColor: getColorForTag(tag),
                color: "#ffffff",
              }}
            >
              {tag.name}
            </span>
          ))
        ) : (
          <p></p>
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
              {content.type === "plain-text" && (
                <div
                  onMouseUp={handleTextSelection} // Detect selection for annotation
                  className="annotated-content"
                >
                  {renderContentWithAnnotations(
                    content["plain-text"],
                    annotations
                  )}
                </div>
              )}
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
        <button
          className={`like-button ${isLikedByUser ? "liked" : ""}`}
          onClick={handleToggleLike}
        >
          <FaThumbsUp /> {isLikedByUser ? " Liked" : " Like"}
        </button>
      </div>
    </div>
  );
};

export default PostView;
