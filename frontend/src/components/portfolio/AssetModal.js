import React, { useState } from 'react';
import '../../styles/portfolio/PortfolioModal.css';

const AssetModal = ({ onClose, onSubmit, stockData }) => {
  const [stockCode, setStockCode] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleStockSearch = (code) => {
    setStockCode(code);
    if (code) {
      const results = stockData
        .filter((s) => s.code.toLowerCase().includes(code.toLowerCase()))
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectStock = (stock) => {
    setStockCode(stock.code);
    setStockPrice(stock.price);
    setSearchResults([]);
  };

  const handleSubmit = () => {
    if (stockCode && stockPrice && quantity) {
      onSubmit({ stockCode, stockPrice: parseFloat(stockPrice), quantity: parseInt(quantity) });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Asset</h2>
        <input
          type="text"
          value={stockCode}
          onChange={(e) => handleStockSearch(e.target.value)}
          placeholder="Stock Code"
          className="modal-input"
        />
        <div className="search-results">
          {searchResults.map((stock) => (
            <div 
              key={stock.code} 
              className="search-result-item" 
              onClick={() => handleSelectStock(stock)}
            >
              {stock.code} - {stock.name}
            </div>
          ))}
        </div>
        <input
          type="number"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
          placeholder="Stock Price"
          className="modal-input"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="modal-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="modal-submit-button">Submit</button>
          <button onClick={onClose} className="modal-cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;
