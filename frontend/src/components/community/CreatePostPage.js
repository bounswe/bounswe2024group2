import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/community/CreatePostPage.css";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [availableTags] = useState([
    { id: 1, name: "Stock Analysis" },
    { id: 2, name: "BIST30" },
    { id: 3, name: "S&P" },
    { id: 4, name: "NASDAQ" },
    { id: 5, name: "Dow Jones" },
    { id: 6, name: "USA" },
    { id: 7, name: "Türkiye" },
  ]);
  const [filteredTags, setFilteredTags] = useState(availableTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tagSearchRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      alert("You must be logged in to create a post.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const availableTagsToShow = availableTags.filter(
      (tag) =>
        !selectedTags.includes(tag) &&
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTags(availableTagsToShow);
  }, [selectedTags, searchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowTagSuggestions(true);
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchQuery("");
    setShowTagSuggestions(false);
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    setShowTagSuggestions(false);
  };

  const handleClickOutside = (event) => {
    if (tagSearchRef.current && !tagSearchRef.current.contains(event.target)) {
      setShowTagSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePost = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to create a post.");
      return;
    }

    const postData = {
      title,
      content: description,
      author: 2,
      liked_by: [],
      tags: [],
      portfolios: [],
    };

    console.log("Payload:", postData);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/posts/`,
        postData,
        { headers }
      );
      console.log("Post created successfully:", response.data);
      alert("Post created successfully!");
      navigate("/community");
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        const errorMessage =
          error.response.data.message || JSON.stringify(error.response.data);
        alert(`Failed to create the post. Error: ${errorMessage}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("Failed to create the post. No response from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Failed to create the post. Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="create-post-container">
      <div className="left-section">
        <div className="title-section">
          <input
            type="text"
            className="post-title-input"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="tag-selection-section">
          <div className="tag-search-container" ref={tagSearchRef}>
            <input
              type="text"
              className="tag-search-input"
              placeholder="Search or select tags..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowTagSuggestions(true)}
            />
            {showTagSuggestions && (
              <div className="tag-suggestions-box">
                {filteredTags.map((tag, index) => (
                  <button
                    key={tag.id}
                    className={`tag-suggestion color-${index % 4}`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="selected-tags">
            {selectedTags.map((tag, index) => (
              <span key={tag.id} className={`selected-tag color-${index % 4}`}>
                {tag.name}
                <span
                  className="tag-remove"
                  onClick={() => handleTagRemove(tag)}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="description-section">
          <textarea
            className="description-textarea"
            placeholder="Enter description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="right-section">
        <div className="action-buttons">
          <button className="cancel-button" onClick={() => navigate("/home")}>
            Cancel
          </button>
          <button className="preview-button">Preview</button>
          <button className="post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
