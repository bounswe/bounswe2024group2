import React, { useEffect, useState } from 'react';
import './Posts.css';
import NavBar from './NavBar';

function Posts({ isLoggedIn, setIsLoggedIn }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const csrfToken = localStorage.getItem('csrfToken'); // Get CSRF token from local storage
        const response = await fetch('http://207.154.242.6:8020/post/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${csrfToken}`, // Include CSRF token in the headers
          },
          // body: JSON.stringify({
          //   title: "filmTitle",
          //   content: "text",
          //   film: "filmTitle", // Replace entity_id with the actual entity ID of the film
          // }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="posts">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;