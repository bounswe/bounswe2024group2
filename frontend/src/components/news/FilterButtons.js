import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/news/News.css';

const FilterButtons = ({ categories, setSelectedCategory, selectedCategory }) => {
    return (
        <div className="filter-buttons">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`filter-button ${selectedCategory === category ? 'selected' : ''}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

FilterButtons.propTypes = {
    categories: PropTypes.array.isRequired,
    setSelectedCategory: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
};

export default FilterButtons;
