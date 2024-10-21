// Tooltip.js
import React from 'react';
import "../../styles/Tooltip.css"; // Create a CSS file for styling

const Tooltip = ({ stock, position }) => {
    return (
        <div className="tooltip" style={{ top: position.top, left: position.left }}>
            <div className="tooltip-content">
                <h3>{stock.code} <span className="big-dot">•</span></h3>
                <div className="tooltip-details">
                    <p><span className="small-dot">•</span> Name: {stock.name}</p>
                    <p><span className="small-dot">•</span> Price: ${stock.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
