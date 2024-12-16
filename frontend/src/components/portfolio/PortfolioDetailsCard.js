import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faClipboardList, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import '../../styles/portfolio/PortfolioDetailsCard.css';
import CircleAnimation from '../CircleAnimation';

const PortfolioDetailsCard = ({ loading, numAssets, totalValue, totalProfit }) => {
  
  if (loading) {
    return <div className="portfolio-details-card"><CircleAnimation relative={true}/></div>;
  }

  return (
    <div className="portfolio-details-card">
      <h3>Portfolio Details</h3>
      <div className="portfolio-detail">
        <FontAwesomeIcon icon={faClipboardList} className="detail-icon" />
        <span className='detail-item'>Number of Assets:</span>
        <span className="detail-value">{numAssets}</span>
      </div>
      <div className="portfolio-detail">
        <FontAwesomeIcon icon={faDollarSign} className="detail-icon" />
        <span className='detail-item'>Total Value:</span>
        <span className="detail-value">${totalValue.toFixed(2)}</span>
      </div>
      <div className="profit-section portfolio-detail">
        <span className='detail-item'>Total Profit:</span>
        <span className={`detail-value ${totalProfit >= 0 ? 'profit' : 'loss'}`}>
            ${totalProfit.toFixed(2)} 
            {totalProfit >= 0 ? (
            <FontAwesomeIcon icon={faArrowUp} className="detail-icon" />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} className="detail-icon" />
          )}
        </span>
          
      </div>
    </div>
  );
};

export default PortfolioDetailsCard;
