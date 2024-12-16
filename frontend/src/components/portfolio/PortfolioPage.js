import React, { useEffect, useState } from 'react';
import PortfolioModal from './PortfolioModal';
import AssetModal from './AssetModal';
import AssetList from './AssetList';
import PortfolioDetailsCard from './PortfolioDetailsCard';
import { Chart } from 'react-google-charts';
import '../../styles/portfolio/PortfolioPage.css';
import '../../styles/portfolio/AssetList.css';
import '../../index.css';
import UserService from '../../service/userService';
import { PortfolioService } from '../../service/portfolioService';
import CircleAnimation from '../CircleAnimation';
import { useNavigate } from "react-router-dom";
import log from '../../utils/logger';
import { useAlertModal } from '../alert/AlertModalContext';
import { debug } from 'loglevel';
import { StockService } from '../../service/stockService';


const PortfolioPage = () => {
  const navigate = useNavigate();
  const { showModal } = useAlertModal();
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calculatingPortfolioStats, setCalculatingPortfolioStats] = useState(true);
  const [numAssets, setNumAssets] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  // Fetch portfolios when the component mounts
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const userLoggedIn = UserService.isLoggedIn();
        if (!userLoggedIn) {
          setLoading(false);
          return;
        }
        const userId = UserService.getUserId();
        const fetchedPortfolios = await PortfolioService.fetchPortfolioByUserId(userId);
        log.debug('Fetched portfolios:', fetchedPortfolios);
        setPortfolios(fetchedPortfolios);
        // Select the first portfolio by default
        if (fetchedPortfolios.length > 0) {
          handleSelectPortfolio(fetchedPortfolios[0]);
        }
      } catch (err) {
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDeletePortfolio = async (portfolioId) => {
    log.debug('Deleting portfolio:', portfolioId);
    showModal(
      'Are you sure you want to delete this portfolio?',
      async () => {
        try {
          await PortfolioService.deletePortfolio(portfolioId);
          setPortfolios((prevPortfolios) =>
            prevPortfolios.filter((portfolio) => portfolio.id !== portfolioId)
          );
          if (selectedPortfolio && selectedPortfolio.id === portfolioId) {
            handleSelectPortfolio(null);
          }
        } catch (err) {
          log.error('Error deleting portfolio:', err);
        }
      },
      () => {
        log.debug('Delete portfolio cancelled');
      },
      true,
      "Cancel",
      "Delete"
    );
  };


  const handleCreatePortfolio = async (portfolioName) => {
    try {
      const newPortfolio = await PortfolioService.createPortfolio({
        name: portfolioName,
        description: "This is a new portfolio",
        stocks: [],
      });
      setPortfolios((prevPortfolios) => [...prevPortfolios, newPortfolio]);
      handleSelectPortfolio(newPortfolio);
    } catch (err) {
      log.error('Error creating portfolio:', err);
    } finally {
      setShowPortfolioModal(false);
    }
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    calculatePortfolioStats(portfolio);
  };

  const handleCreatePortfolioModal = () => {
    if (!UserService.isLoggedIn()) {
      navigate('/login');
    } else {
      setShowPortfolioModal(true);
    }
  }

  const handleAddAsset = async (data) => {
    console.log(data);
    const stock = await StockService.fetchStockById(data.stockId);
    const asset = {
      id: data.stockId,
      code: data.stockCode,
      name: stock.name,
      quantity: data.quantity,
      boughtPrice: data.stockPrice,
      currentPrice: stock.price,
    };
    const existingAssetIndex = selectedPortfolio.stocks.findIndex(a => a.id === asset.id);
    log.debug("handleAddAsset", asset, existingAssetIndex);

    if (existingAssetIndex !== -1) {
      const existingAsset = selectedPortfolio.stocks[existingAssetIndex];
      const newQuantity = existingAsset.quantity + asset.quantity;
      const totalCost = (existingAsset.boughtPrice * existingAsset.quantity) + (asset.boughtPrice * asset.quantity);
      const newAveragePrice = totalCost / newQuantity;

      const updatedAssets = selectedPortfolio.stocks.map((a, index) => {
        if (index === existingAssetIndex) {
          return {
            ...a,
            quantity: newQuantity,
            boughtPrice: newAveragePrice,

          };
        }
        return a;
      });

      const updatedPortfolio = {
        ...selectedPortfolio,
        stocks: updatedAssets,
      };
      await PortfolioService.patchPortfolioStocks(selectedPortfolio.id, updatedPortfolio);
      log.debug('Updated portfolio:', updatedPortfolio);

      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((p) =>
          p.id === selectedPortfolio.id ? updatedPortfolio : p
        )
      );
      handleSelectPortfolio(updatedPortfolio);
    } else {
      const updatedPortfolio = {
        ...selectedPortfolio,
        stocks: [...selectedPortfolio.stocks, asset],
      };

      await PortfolioService.patchPortfolioStocks(selectedPortfolio.id, updatedPortfolio);

      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((p) =>
          p.id === selectedPortfolio.id ? updatedPortfolio : p
        )
      );

      handleSelectPortfolio(updatedPortfolio);
    }

    setShowAssetModal(false);
  };

  const handleUpdateAssets = (updatedAssets) => {
    const updatedPortfolio = {
      ...selectedPortfolio,
      stocks: updatedAssets,
    };
    log.debug('Updated portfolio:', updatedPortfolio);
    PortfolioService.patchPortfolioStocks(selectedPortfolio.id, updatedPortfolio);
    setPortfolios((prevPortfolios) =>
      prevPortfolios.map((p) =>
        p.id === selectedPortfolio.id ? updatedPortfolio : p
      )
    );
    handleSelectPortfolio(updatedPortfolio);
  };

  const calculatePortfolioStats = (portfolio) => {
    log.debug('Calculating portfolio stats');
    setCalculatingPortfolioStats(true);
    if (!portfolio || portfolio.stocks.length === 0) {
      log.debug('No assets to calculate');
      setCalculatingPortfolioStats(false);
      setNumAssets(0);
      setTotalValue(0);
      setTotalProfit(0);
      return;
    }
    const numAssets = portfolio.stocks.length;
    const totalValue = portfolio.stocks.reduce((acc, asset) => {
      return acc + (asset.currentPrice * asset.quantity);
    }, 0);
    const totalProfit = portfolio.stocks.reduce((acc, asset) => {
      return acc + ((asset.currentPrice - asset.boughtPrice) * asset.quantity);
    }, 0);

    setCalculatingPortfolioStats(false);
    setNumAssets(numAssets);
    setTotalValue(totalValue);
    setTotalProfit(totalProfit);
  };


  const chartData = [
    ['Stock', 'Value'],
    ...(selectedPortfolio?.stocks ?? []).map((asset) => {
      const value = asset.currentPrice * asset.quantity;
      return [asset.code, value];
    })
  ];

  const getCssVariable = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  };

  const getSliceColor = (asset) => {
    const currentStockPrice = asset.currentPrice;
    const profit = (currentStockPrice - asset.boughtPrice) * asset.quantity;
    const profitPercentage = (profit / (asset.boughtPrice * asset.quantity)) * 100;

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
    slices: selectedPortfolio?.stocks.map((asset, index) => ({
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
                  className={`portfolio-tab ${portfolio.id === selectedPortfolio?.id ? 'selected' : ''}`}
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
                    <div className="button-container">
                      <button onClick={() => setShowAssetModal(true)} className="add-assets-button">
                        Add Assets
                      </button>
                      <hr className="divider" />
                      <button
                        onClick={() => handleDeletePortfolio(selectedPortfolio.id)}
                        className="delete-portfolio-button"
                      >
                        Delete Portfolio
                      </button>
                    </div>
                    {selectedPortfolio.stocks.length > 0 && (
                      <AssetList assets={selectedPortfolio.stocks} setAssets={handleUpdateAssets} />
                    )}
                  </div>
                  <div className="portfolio-details portfolio-card">
                    <PortfolioDetailsCard
                      loading={calculatingPortfolioStats}
                      numAssets={numAssets}
                      totalValue={totalValue}
                      totalProfit={totalProfit}
                    />
                    <div className="portfolio-chart">
                      {selectedPortfolio.stocks.length > 0 ? (
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
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
