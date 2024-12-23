import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/community/CreatePostPage.css";
import { apiClient } from "../../service/apiClient";
import userService from "../../service/userService";
import { useAlertModal } from "../alert/AlertModalContext";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { showModal } = useAlertModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [navigation, setNavigation] = useState(false);
  const tagSearchRef = useRef(null);
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      if (!navigation) {
        showModal(
          "You must be logged in to create a post.",
          () => navigate("/login"),
          () => navigate("/community"),
          true,
          "Home",
          "Login"
        );
        setNavigation(true);
      }
    }
  }, [navigate, showModal, navigation]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await apiClient.get("/tags");
        setAvailableTags(response.data);
      } catch (error) {
        console.error("Failed to fetch tags!", error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const availableTagsToShow = availableTags.filter(
      (tag) =>
        !selectedTags.includes(tag) &&
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTags(availableTagsToShow);
  }, [availableTags, selectedTags, searchQuery]);

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
      showModal(
        "You must be logged in to create a post.",
        () => navigate("/login"),
        () => navigate("/community"),
        true,
        "Home",
        "Login"
      );
      return;
    }

    const tagIds = selectedTags.map((tag) => tag.id);
    const userID = userService.getUserId();
    const postData = {
      title,
      content: description,
      author: userID,
      liked_by: [],
      tags: tagIds,
      portfolios: [],
    };

    try {
      const response = await apiClient.post("/posts/", postData);
      console.log("Post created successfully:", response.data);
      showModal(
        "Post created successfully!",
        () => navigate("/community"),
        null,
        false,
        "",
        "Ok"
      );
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
            <div className="tag-input-wrapper">
              <input
                type="text"
                className="tag-search-input"
                placeholder="Search or select tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowTagSuggestions(true)}
              />
              <button className="new-button">+ Add Tag</button>
            </div>
            {showTagSuggestions && (
              <div className="tag-suggestions-box">
                {filteredTags.map((tag, index) => (
                  <button
                    key={tag.id}
                    className={`tag-suggestion`}
                    style={{ backgroundColor: colors[index % colors.length] }}
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
              <span
                key={tag.id}
                className="selected-tag"
                style={{
                  backgroundColor: colors[index % colors.length],
                  color: "white",
                }}
              >
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
          <button
            className="cancel-button"
            onClick={() => navigate("/community")}
          >
            Cancel
          </button>
          <button className="post-button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
