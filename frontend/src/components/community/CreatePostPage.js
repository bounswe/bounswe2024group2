import React, { useState, useEffect, useRef } from "react";
import "../../styles/community/CreatePostPage.css";

const CreatePostPage = () => {
  const [availableTags] = useState([
    "Stock Analysis",
    "BIST30",
    "S&P",
    "NASDAQ",
    "Dow Jones",
    "USA",
    "Türkiye",
  ]);
  const [filteredTags, setFilteredTags] = useState(availableTags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [description, setDescription] = useState(""); // State for description

  const tagSearchRef = useRef(null); // Reference for the tag search container

  // Update filteredTags when selected tags or search query changes
  useEffect(() => {
    // Filter out selected tags from available tags
    const availableTagsToShow = availableTags.filter(
      (tag) =>
        !selectedTags.includes(tag) &&
        tag.toLowerCase().includes(searchQuery.toLowerCase())
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
    setShowTagSuggestions(false); // Close suggestions when tag is selected
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setShowTagSuggestions(false); // Close suggestions when a tag is removed
  };

  const handleClickOutside = (event) => {
    if (tagSearchRef.current && !tagSearchRef.current.contains(event.target)) {
      setShowTagSuggestions(false); // Close suggestions when clicking outside
    }
  };

  // Add and clean up the event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Update description state
  };

  return (
    <div className="create-post-container">
      {/* Left Section */}
      <div className="left-section">
        {/* Title Section */}
        <div className="title-section">
          <input
            type="text"
            className="post-title-input"
            placeholder="Enter post title..."
          />
        </div>

        {/* Tag Selection Section */}
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
            {/* Tag Suggestions Box */}
            {showTagSuggestions && (
              <div className="tag-suggestions-box">
                {filteredTags.map((tag, index) => (
                  <button
                    key={tag}
                    className={`tag-suggestion color-${index % 4}`}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Tags */}
          <div className="selected-tags">
            {selectedTags.map((tag, index) => (
              <span key={tag} className={`selected-tag color-${index % 4}`}>
                {tag}
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

        {/* Description Section */}
        <div className="description-section">
          <textarea
            className="description-textarea"
            placeholder="Enter description..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>

      {/* Right Section (Tools or other content) */}
      <div className="right-section">
        <h3>Tools</h3>
        <div className="tools-container">
          <div className="tool-item">Graph</div>
          <div className="tool-item">Portfolio</div>
          <div className="tool-item">News</div>
          <div className="tool-item">Image</div>
        </div>
        <div className="action-buttons">
          <button className="cancel-button">Cancel</button>
          <button className="preview-button">Preview</button>
          <button className="post-button">Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
