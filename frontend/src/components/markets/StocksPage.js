import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/StocksPage.css"
import { useState } from 'react';
import Tooltip from './Tooltip';
import {mockIndices, mockStocks} from './MockData.js';

const StocksPage = () => {
  const { indexId } = useParams(); 
  const stocks = mockStocks[indexId]; 
  const indexName = mockIndices.find(index => index.id === parseInt(indexId))?.name || 'Unknown Index';

  const [hoveredStock, setHoveredStock] = useState(null); 

  const handleMouseEnter = (stock) => {
    setHoveredStock(stock); 
  };

  const handleMouseLeave = () => {
    setHoveredStock(null); 
  };

  return (
    <>
      <div className="stocks-container">
        <h2>Stocks in {indexName}</h2>
        <div className="stocks-table">
          <table>
            <thead>
              <tr>
                <th>Stock Code</th>
                <th>Stock Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stocks && stocks.length > 0 ? (
                stocks.map(stock => (
                  <tr
                    key={stock.code}
                    className="stock-row"
                    onMouseEnter={() => handleMouseEnter(stock)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td>{stock.code}</td>
                    <td>{stock.name}</td>
                    <td>${stock.price.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No stocks available for this index.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {}
      <Tooltip stock={hoveredStock} />
    </>
  );
};

export default StocksPage;
