import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/MarketsPage.css';

const mockIndices = [
    { id: 1, name: "BIST30" },
    { id: 2, name: 'S%P TOP 50' },
];

const MarketsPage = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const navigate = useNavigate();

    const handleIndexClick = (id) => {
    // Navigate to the stocks page with the selected index ID
        navigate(`/stocks/${id}`);
    };
    return (
        <div className="markets-container">
      <h1>Indices</h1>
      <div className="indices">
        {mockIndices.map(index => (
          <div 
            key={index.id} 
            onClick={() => handleIndexClick(index.id)} 
            className="index-item"
          >
            {index.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketsPage;

