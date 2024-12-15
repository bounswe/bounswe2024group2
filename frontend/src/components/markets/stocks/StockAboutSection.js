import React from "react";
import "../../../styles/markets/stocks/StockOverviewPage.css";


const StockAboutSection = ({ stockDetails }) => {
    return (
        <div className="stock-tab-section">
            <h2>About</h2>
            <div className="stock-tab-section-content">
                <div className="stock-tab-section-item">
                    <p><strong>Company:</strong> {stockDetails?.longName}</p>
                    <p><strong>Industry:</strong> {stockDetails?.industryDisp}</p>
                    <p><strong>Sector:</strong> {stockDetails?.sectorDisp}</p>
                    <p><strong>Address:</strong> {stockDetails?.address1}, {stockDetails?.address2}, {stockDetails?.city}, {stockDetails?.country}</p>
                    <p><strong>Website:</strong> <a href={stockDetails?.website} target="_blank" rel="noreferrer">{stockDetails?.website}</a></p>
                    <p><strong>Description:</strong> {stockDetails?.longBusinessSummary}</p>
                </div>
            </div>
        </div>
    );
}

export default StockAboutSection;