// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [pattern, setPattern] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(pattern);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        placeholder="Search films..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
