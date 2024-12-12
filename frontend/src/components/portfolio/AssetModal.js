import React, { useState } from 'react';
import '../../styles/portfolio/PortfolioModal.css';
import { StockService } from '../../service/stockService';

const AssetModal = ({ onClose, onSubmit, stockData }) => {
  const [stockId, setStockId] = useState('');
  const [stockCode, setStockCode] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  let debounceTimer;
  const handleStockSearch = (code) => {
    if (!code) {
      setStockCode('');
      setSearchResults([]);
      return;
    }

    setStockCode(code);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      StockService.fetchSimilarStocks(code, 5)
        .then((results) => setSearchResults(results))
        .catch((error) => console.error('Error fetching similar stocks:', error));
    }, 300);
  };

  const handleSelectStock = (stock) => {
    setStockId(stock.id);
    setStockCode(stock.code);
    setStockPrice(stock.price);
    setSearchResults([]);
  };

  const handleSubmit = () => {
    if (stockId && stockCode && stockPrice && quantity) {
      onSubmit({ stockId: stockId, stockCode: stockCode, stockPrice: parseFloat(stockPrice), quantity: parseInt(quantity) });
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
