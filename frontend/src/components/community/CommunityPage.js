import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/community/CommunityPage.css";
import PostCard from "./PostCard";
import "../../styles/Page.css";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../service/apiClient";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("dsc");
  const [searchActive, setSearchActive] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/posts");
        const usersResponse = await apiClient.get("/users");
        const usersById = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsers(usersById);

        const transformedPosts = await Promise.all(
          response.data.map(async (post) => {
            try {
              const commentsResponse = await apiClient.get(
                `/comments/post-comments/${post.id}`
              );

              return {
                "post-id": post.id,
                user: usersById[post.author] || "Unknown",
                title: post.title,
                content: [{ type: "plain-text", "plain-text": post.content }],
                comments: commentsResponse.data,
                likes: post.liked_by?.length || 0,
                tags: post.tags || [],
                "publication-date": new Date(post.created_at),
              };
            } catch (error) {
              console.error(
                `Error fetching comments for post ${post.id}:`,
                error
              );
              return {
                "post-id": post.id,
                user: usersById[post.author] || "Unknown",
                title: post.title,
                content: [{ type: "plain-text", "plain-text": post.content }],
                comments: 0,
                likes: post.liked_by?.length || 0,
                tags: post.tags || [],
                "publication-date": new Date(post.created_at),
              };
            }
          })
        );
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
    });

  const handleSubmitPost = () => {
    navigate("/community/create-post");
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Explore Community</h1>
        <h2 className="page-subtitle">
          Find out ideas, analysis on the finance world.
        </h2>
        <button className="submit-button" onClick={handleSubmitPost}>
          Create A Post
        </button>
      </div>
      <div className="page-content">
        <div className="search-bar">
          <div className={`search-container ${searchActive ? "active" : ""}`}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
            <FaSearch className="search-icon" />
          </div>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="asc">Sort by Likes (Low to High)</option>
            <option value="desc">Sort by Likes (High to Low)</option>
          </select>
        </div>

        <div className="post-cards">
          {filteredPosts.map((post) => (
            <PostCard key={post["post-id"]} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
