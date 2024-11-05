import React, { useState } from 'react';
import '../../styles/Portfolio.css';

const PortfolioModal = ({ onClose, onSubmit }) => {
  const [portfolioName, setPortfolioName] = useState('');

  const handleSubmit = () => {
    if (portfolioName) {
      onSubmit(portfolioName);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Portfolio</h2>
        <input
          type="text"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          placeholder="Portfolio Name"
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

export default PortfolioModal;
