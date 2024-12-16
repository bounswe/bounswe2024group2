import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "../../styles/community/CommunityPage.css";
import PostCard from "./PostCard";
import "../../styles/Page.css";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../service/apiClient";
import { transformPost } from "../../service/postService";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("dsc");
  const [searchActive, setSearchActive] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts and users
        const postsResponse = await apiClient.get("/posts");
        const usersResponse = await apiClient.get("/users");
        const usersById = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.username;
          return acc;
        }, {});
        setUsers(usersById);

        // Fetch available tags
        const tagsResponse = await apiClient.get("/tags");
        setTags(tagsResponse.data);

        // Process posts
        const transformedPosts = await Promise.all(
          postsResponse.data.map(async (post) => {
            return {
              "post-id": post.id,
              user: usersById[post.author] || "Unknown",
              title: post.title,
              content: [{ type: "plain-text", "plain-text": post.content }],
              comments: [],
              likes: post.liked_by?.length || 0,
              tags: post.tags || [],
              "publication-date": new Date(post.created_at),
            };
          })

        );
        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts or tags:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => {
      if (selectedTags.length === 0) return true; // No tags selected, show all
      const postTagIds = post.tags.map((tag) => tag.id);
      if (selectedTags.length === 1) {
        // If one tag is selected, check if it's in the post's tags
        return postTagIds.includes(Number(selectedTags[0]));
      } else {
        // If multiple tags are selected, check if they are present as per the "and" or "or" condition
        const hasAllTags = selectedTags.every((tagId) =>
          postTagIds.includes(Number(tagId))
        );
        return hasAllTags; // For "and" filter (all tags must match)
      }
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.likes - b.likes : b.likes - a.likes;
    });

  const handleTagSelection = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

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

        <div className="tags-selection">
          <h3>Select Tags</h3>
          {tags.map((tag) => (
            <label key={tag.id} className="tag-checkbox">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id.toString())}
                onChange={() => handleTagSelection(tag.id.toString())}
              />
              {tag.name}
            </label>
          ))}
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
