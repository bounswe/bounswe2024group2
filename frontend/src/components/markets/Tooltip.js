import React from 'react';
import "../../styles/Tooltip.css"; 

const Tooltip = ({ stock }) => {
    return (
      <div className="tooltip">
        <div className="tooltip-content">
          {stock ? (
            <>
              <span className="big-dot">{stock.code}</span>
              <div className="tooltip-details">
                <span className="small-dot">Name: {stock.name}</span>
                <span className="small-dot">Price: ${stock.price.toFixed(2)}</span>
                {stock.about && (
                  <span className="small-dot">About: {stock.about}</span>
                )}
              </div>
            </>
          ) : (
            <div className="empty-tooltip">
              {}
              <span className="small-dot">Hover over a stock to see details</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Tooltip;
