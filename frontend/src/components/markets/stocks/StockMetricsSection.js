import React from "react";
import { FaDollarSign, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import '../../../styles/markets/stocks/StockOverviewPage.css';

const StockMetricsSection = ({ stockDetails }) => {
    return (
        <div className="stock-tab-section">
            <h2 className="section-title">Metrics</h2>
            <div className="stock-tab-section-content">

                {/* Price and Valuation */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Price & Valuation</h3>
                    <p><FaDollarSign className="icon" /> <strong>Current Price:</strong> {stockDetails?.currentPrice}$</p>
                    <p><FaArrowDown className="icon" /> <strong>52 Week Low:</strong> {stockDetails?.fiftyTwoWeekLow}$</p>
                    <p><FaArrowUp className="icon" /> <strong>52 Week High:</strong> {stockDetails?.fiftyTwoWeekHigh}$</p>
                    <p><FaChartLine className="icon" /> <strong>Market Cap:</strong> {formatNumber(stockDetails?.marketCap)}</p>
                    <p><FaChartLine className="icon" /> <strong>Enterprise Value:</strong> {formatNumber(stockDetails?.enterpriseValue)}</p>
                    <p><FaChartLine className="icon" /> <strong>Trailing PE:</strong> {stockDetails?.trailingPE}</p>
                    <p><FaChartLine className="icon" /> <strong>Forward PE:</strong> {stockDetails?.forwardPE}</p>
                    <p><FaChartLine className="icon" /> <strong>Price to Book:</strong> {stockDetails?.priceToBook}</p>
                </div>

                {/* Dividends */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Dividends</h3>
                    <p><strong>Dividend Rate:</strong> {stockDetails?.dividendRate}%</p>
                    <p><strong>Dividend Yield:</strong> {stockDetails?.dividendYield}%</p>
                    <p><strong>Payout Ratio:</strong> {stockDetails?.payoutRatio}%</p>
                    <p><strong>Five Year Avg Dividend Yield:</strong> {stockDetails?.fiveYearAvgDividendYield}%</p>
                    <p><strong>Last Dividend Date:</strong> {stockDetails?.lastDividendDate}</p>
                </div>

                {/* Financials */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Financials</h3>
                    <p><strong>Total Revenue:</strong> {formatNumber(stockDetails?.totalRevenue)}</p>
                    <p><strong>Net Income to Common:</strong> {formatNumber(stockDetails?.netIncomeToCommon)}</p>
                    <p><strong>Profit Margins:</strong> {stockDetails?.profitMargins}%</p>
                    <p><strong>Return on Assets:</strong> {stockDetails?.returnOnAssets}%</p>
                    <p><strong>Return on Equity:</strong> {stockDetails?.returnOnEquity}%</p>
                </div>

                {/* Analysts & Recommendations */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Analysts & Recommendations</h3>
                    <p><strong>Target High Price:</strong> {stockDetails?.targetHighPrice}$</p>
                    <p><strong>Target Low Price:</strong> {stockDetails?.targetLowPrice}$</p>
                    <p><strong>Target Mean Price:</strong> {stockDetails?.targetMeanPrice}$</p>
                    <p><strong>Recommendation:</strong> {stockDetails?.recommendationKey}</p>
                    <p><strong>Number of Analyst Opinions:</strong> {stockDetails?.numberOfAnalystOpinions}</p>
                </div>

                {/* Stock Metrics */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Stock Metrics</h3>
                    <p><strong>Beta:</strong> {stockDetails?.beta}</p>
                    <p><strong>Trailing EPS:</strong> {stockDetails?.trailingEps}</p>
                    <p><strong>Forward EPS:</strong> {stockDetails?.forwardEps}</p>
                    <p><strong>Revenue per Share:</strong> {stockDetails?.revenuePerShare}$</p>
                    <p><strong>Total Cash per Share:</strong> {stockDetails?.totalCashPerShare}$</p>
                    <p><strong>Previous Close:</strong> {stockDetails?.previousClose}$</p>
                    <p><strong>Day Low:</strong> {stockDetails?.dayLow}$</p>
                    <p><strong>Day High:</strong> {stockDetails?.dayHigh}$</p>
                    <p><strong>Volume:</strong> {formatNumber(stockDetails?.volume)}</p>
                    <p><strong>Average Volume:</strong> {formatNumber(stockDetails?.averageVolume)}</p>
                </div>

            </div>        
        </div>
    );
}

// Function to format large numbers with commas for better readability
const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A";
}

export default StockMetricsSection;
