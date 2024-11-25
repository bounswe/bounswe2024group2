import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import mockPosts from "../../data/mockPosts";
import { FaSearch } from "react-icons/fa";
import "../../styles/community/CommunityPage.css";
import PostCard from "./PostCard";
import "../../styles/Page.css";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("dsc");
  const [searchActive, setSearchActive] = useState(false);
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const navigate = useNavigate();

  // Fetch real posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://159.223.28.163:30002/posts"); // Replace with your API endpoint
        const transformedPosts = response.data.map((post) => ({
          "post-id": post.id,
          user: post.author.username || "Unknown", // Default if author is not found
          title: post.title,
          content: [{ type: "plain-text", "plain-text": post.content }],
          comments: [], // No comments yet
          likes: post.liked_by.length, // Assuming likes are in liked_by
          tags: post.tags, // You might need to map tags to a human-readable format
          "publication-date": new Date(post.created_at).toLocaleDateString(), // Formatting the date
        }));
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts(mockPosts); // Fall back to mock data if API fails
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = [...mockPosts, ...posts] // Combine mock and real posts
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
