import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);  // Clears the search results
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;
        fetch('http://localhost:8020/query-film-pattern/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pattern: searchTerm, limit: 5 }),
        })
        .then(response => response.json())
        .then(data => {
            setSearchResults(data.map(item => item.label));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="navbar">
            <img src="./logo.png" alt="SemanticFlix" className="logo" />
            <div className="nav-links">
                <Link to="/films">Films</Link>
                <Link to="/lists">Lists</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
            <form ref={searchRef} className="search-container" onSubmit={handleSearch}>
                <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit">Q</button>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        {searchResults.map((result, index) => (
                            <div key={index} className="search-result-item">{result}</div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}

export default NavBar;
