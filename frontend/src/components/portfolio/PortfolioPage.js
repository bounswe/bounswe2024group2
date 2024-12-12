import React, { useEffect, useState } from 'react';
import PortfolioModal from './PortfolioModal';
import AssetModal from './AssetModal';
import AssetList from './AssetList';
import PortfolioDetailsCard from './PortfolioDetailsCard';
import { Chart } from 'react-google-charts';
import '../../styles/portfolio/PortfolioPage.css';
import '../../styles/portfolio/AssetList.css';
import mockStocks from '../../data/mockStocks';
import '../../index.css';
import UserService from '../../service/userService';
import { PortfolioService } from '../../service/portfolioService';
import CircleAnimation from '../CircleAnimation';
import { useNavigate } from "react-router-dom";


const PortfolioPage = () => {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch portfolios when the component mounts
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const userLoggedIn = UserService.isLoggedIn();
        if (!userLoggedIn) {
          setError('User is not logged in');
          setLoading(false);
          return;
        }
        const userId = UserService.getUserId();
        const fetchedPortfolios = await PortfolioService.fetchPortfolioByUserId(userId);
        setPortfolios(fetchedPortfolios);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
        setError('Failed to fetch portfolios. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);


  const handleCreatePortfolio = async (portfolioName) => {
    try {
      const newPortfolio = await PortfolioService.createPortfolio({
        name: portfolioName,
        description: '',
        stocks: [],
      });
      setPortfolios((prevPortfolios) => [...prevPortfolios, newPortfolio]);
      setSelectedPortfolio(newPortfolio);
    } catch (err) {
      console.error('Error creating portfolio:', err);
      setError('Failed to create portfolio. Please try again.');
    } finally {
      setShowPortfolioModal(false);
    }
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const handleCreatePortfolioModal = () => {
    if (!UserService.isLoggedIn()) {
      navigate('/login');
    }else{
      setShowPortfolioModal(true);
    }
  }

  const handleAddAsset = (asset) => {
    const existingAssetIndex = selectedPortfolio.assets.findIndex(a => a.stockCode === asset.stockCode);

    if (existingAssetIndex !== -1) {
      const existingAsset = selectedPortfolio.assets[existingAssetIndex];
      const newQuantity = existingAsset.quantity + asset.quantity;
      const totalCost = (existingAsset.stockPrice * existingAsset.quantity) + (asset.stockPrice * asset.quantity);
      const newAveragePrice = totalCost / newQuantity;

      const updatedAssets = selectedPortfolio.assets.map((a, index) => {
        if (index === existingAssetIndex) {
          return {
            ...a,
            quantity: newQuantity,
            stockPrice: newAveragePrice,
          };
        }
        return a;
      });

      const updatedPortfolio = {
        ...selectedPortfolio,
        assets: updatedAssets,
      };

      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((p) =>
          p.name === selectedPortfolio.name ? updatedPortfolio : p
        )
      );

      setSelectedPortfolio(updatedPortfolio);
    } else {
      const updatedPortfolio = {
        ...selectedPortfolio,
        assets: [...selectedPortfolio.assets, asset],
      };

      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((p) =>
          p.name === selectedPortfolio.name ? updatedPortfolio : p
        )
      );

      setSelectedPortfolio(updatedPortfolio);
    }

    setShowAssetModal(false);
  };

  const handleUpdateAssets = (updatedAssets) => {
    const updatedPortfolio = {
      ...selectedPortfolio,
      assets: updatedAssets,
    };

    setPortfolios((prevPortfolios) =>
      prevPortfolios.map((p) =>
        p.name === selectedPortfolio.name ? updatedPortfolio : p
      )
    );

    setSelectedPortfolio(updatedPortfolio);
  };

  const calculatePortfolioStats = () => {
    if (!selectedPortfolio || selectedPortfolio.assets.length === 0) {
      return { numAssets: 0, totalValue: 0, totalProfit: 0 };
    }

    const numAssets = selectedPortfolio.assets.length;
    const totalValue = selectedPortfolio.assets.reduce((acc, asset) => {
      const currentStockPrice = mockStocks.find(stock => stock.code === asset.stockCode)?.price || 0;
      return acc + (currentStockPrice * asset.quantity);
    }, 0);

    const totalProfit = selectedPortfolio.assets.reduce((acc, asset) => {
      const currentStockPrice = mockStocks.find(stock => stock.code === asset.stockCode)?.price || 0;
      return acc + ((currentStockPrice - asset.stockPrice) * asset.quantity);
    }, 0);

    return { numAssets, totalValue, totalProfit };
  };

  const { numAssets, totalValue, totalProfit } = calculatePortfolioStats();

  const chartData = [
    ['Stock', 'Value'],
    ...(selectedPortfolio?.assets ?? []).map((asset) => {
      const currentStockPrice = mockStocks.find(stock => stock.code === asset.stockCode)?.price || 0;
      const value = currentStockPrice * asset.quantity;
      return [asset.stockCode, value];
    })
  ];

  const getCssVariable = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  };

  const getSliceColor = (asset) => {
    const currentStockPrice = mockStocks.find(stock => stock.code === asset.stockCode)?.price || 0;
    const profit = (currentStockPrice - asset.stockPrice) * asset.quantity;
    const profitPercentage = (profit / (asset.stockPrice * asset.quantity)) * 100;

    if (profitPercentage <= -90) {
      return getCssVariable('--color-error-900');
    } else if (profitPercentage <= -60) {
      return getCssVariable('--color-error-700');
    } else if (profitPercentage <= -30) {
      return getCssVariable('--color-error-500');
    } else if (profitPercentage < 0) {
      return getCssVariable('--color-error-300');
    } else if (profitPercentage === 0) {
      return getCssVariable('--color-neutral-500');
    } else if (profitPercentage <= 30) {
      return getCssVariable('--color-success-300');
    } else if (profitPercentage <= 60) {
      return getCssVariable('--color-success-500');
    } else if (profitPercentage <= 90) {
      return getCssVariable('--color-success-700');
    } else {
      return getCssVariable('--color-success-900');
    }
  };

  const chartOptions = {
    title: 'Portfolio Distribution',
    pieSliceText: 'value',
    slices: selectedPortfolio?.assets.map((asset, index) => ({
      offset: 0.1,
      color: getSliceColor(asset),
    })),
    pieHole: 0.4,
    chartArea: { width: '90%', height: '90%' },
    fontSize: 12,
    backgroundColor: 'transparent',
  };

  if (loading) {
    return <CircleAnimation />;
  }

  return (
    <div className="page">
      {portfolios.length === 0 ? (
        <div className="page-header">
          <h1 className="page-title">You have no portfolios yet</h1>
          <h2 className="page-subtitle">Create a new portfolio to get started</h2>
        </div>
      ) : (<div></div>)}

      <div className="page-content">

        {portfolios.length === 0 ? (
          <div className="empty-portfolio">
            <button className="create-portfolio-button" onClick={() => handleCreatePortfolioModal()}>
              Create Portfolio
            </button>
          </div>
        ) : (
          <div className="portfolio-section">
            <div className="portfolio-bar">
              {portfolios.map((portfolio, index) => (
                <div
                  key={index}
                  className={`portfolio-tab ${portfolio.name === selectedPortfolio?.name ? 'selected' : ''}`}
                  onClick={() => handleSelectPortfolio(portfolio)}
                >
                  {portfolio.name}
                </div>
              ))}
              <button className="create-portfolio-button" onClick={() => setShowPortfolioModal(true)}>
                Create Portfolio
              </button>
            </div>
            <div className="portfolio-content">
              {selectedPortfolio ? (
                <div className="portfolio-layout">
                  <div className="asset-list-container portfolio-card">
                    <button onClick={() => setShowAssetModal(true)} className="add-assets-button">
                      Add Assets
                    </button>
                    {selectedPortfolio.assets.length > 0 && (
                      <AssetList assets={selectedPortfolio.assets} setAssets={handleUpdateAssets} />
                    )}
                  </div>
                  <div className="portfolio-details portfolio-card">
                    <PortfolioDetailsCard
                      numAssets={numAssets}
                      totalValue={totalValue}
                      totalProfit={totalProfit}
                    />
                    <div className="portfolio-chart">
                      {selectedPortfolio.assets.length > 0 ? (
                        <Chart
                          className='portfolio-chart'
                          chartType="PieChart"
                          data={chartData}
                          options={chartOptions}
                          width={'100%'}
                          height={'300px'}
                        />
                      ) : (
                        <p>No assets to display</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

        )}

        {showPortfolioModal && (
          <PortfolioModal
            onClose={() => setShowPortfolioModal(false)}
            onSubmit={handleCreatePortfolio}
          />
        )}

        {showAssetModal && (
          <AssetModal
            onClose={() => setShowAssetModal(false)}
            onSubmit={handleAddAsset}
            stockData={mockStocks}
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
