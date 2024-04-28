// components/RecentPosts.js

import React from 'react';
import './RecentPosts.css'; // Your CSS for the RecentPosts

function RecentPosts({ posts }) {
    return (
      <div className="recent-posts">
        <h2>Recent Posts</h2>
        {posts.map(post => (
          <div key={post.id} className="recent-post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <span>{post.rating}</span>
          </div>
        ))}
      </div>
    );
  }

export default RecentPosts;
