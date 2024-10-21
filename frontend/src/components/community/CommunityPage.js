import React, { useState } from 'react';
import mockPosts from '../../data/mockPosts';
import { FaSearch } from 'react-icons/fa';
import '../../styles/community/CommunityPage.css';
import PostCard from './PostCard'; 

const CommunityPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('dsc');
    const [searchActive, setSearchActive] = useState(false);

    const filteredPosts = mockPosts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            return sortOrder === 'asc' ? a.likes - b.likes : b.likes - a.likes;
        });

    const handleSubmitPost = () => {
        alert("Submit Post clicked!");
    };

    return (
        <div className="community-page">
            <div className="community-header">
                <h1 className="community-title">Explore Community</h1>
                <h2 className="community-subtitle">Find out ideas, analysis on the finance world.</h2>
                <button className="submit-button" onClick={handleSubmitPost}>Create A Post</button>
            </div>
            <div className="community-content">
                <div className="search-bar">
                    <div className={`search-container ${searchActive ? 'active' : ''}`}>
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
                    <select onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
                        <option value="asc">Sort by Likes (Low to High)</option>
                        <option value="desc">Sort by Likes (High to Low)</option>
                    </select>
                </div>

                <div className="post-cards">
                    {filteredPosts.map(post => (
                        <PostCard key={post["post-id"]} post={post} /> 
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
