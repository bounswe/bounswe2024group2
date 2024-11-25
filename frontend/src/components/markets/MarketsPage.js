import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/MarketsPage.css';
import { mockIndices, mockStocks, biggestCompanies } from './MockData';

const MarketsPage = () => {
    const navigate = useNavigate();

    const handleIndexClick = (id) => {
        navigate(`/stocks/${id}`);
    };

    return (
        <div className="markets-container">
            <h1 className="section-title">Markets Overview</h1>

            <div className="section">
                <h2>Indices</h2>
                <div className="indices">
                    {mockIndices.map((index) => (
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

            <div className="section">
                <h2>Stocks - Turkey</h2>
                <div className="stocks">
                    {mockStocks[1].slice(0, 6).map((stock) => (
                        <div key={stock.code} className="stock-item">
                            <h3>{stock.name}</h3>
                            <p>Price: ${stock.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Stocks - USA</h2>
                <div className="stocks">
                    {mockStocks[2].slice(0, 6).map((stock) => (
                        <div key={stock.code} className="stock-item">
                            <h3>{stock.name}</h3>
                            <p>Price: ${stock.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Biggest Companies</h2>
                <div className="biggest-companies">
                    {biggestCompanies.map((company) => (
                        <div key={company.code} className="company-item">
                            <h3>{company.name}</h3>
                            <p>{company.about}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketsPage;
