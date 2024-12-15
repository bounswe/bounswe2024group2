import React from "react";
import { FaDollarSign, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa"; 
import '../../../styles/markets/stocks/StockOverviewPage.css';

const StockMetricsSection = ({ stockDetails }) => {

    return (
        <div className="stock-tab-section">
            <h2>Metrics</h2>
            <div className="stock-tab-section-content">

                {/* Price and Valuation */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Price & Valuation</h3>
                    <p><FaDollarSign className="icon" /> <strong>Current Price:</strong> {stockDetails?.currentPrice || "N/A"}$</p>
                    <p><FaArrowDown className="icon" /> <strong>52 Week Low:</strong> {stockDetails?.fiftyTwoWeekLow || "N/A"}$</p>
                    <p><FaArrowUp className="icon" /> <strong>52 Week High:</strong> {stockDetails?.fiftyTwoWeekHigh || "N/A"}$</p>
                    <p><FaChartLine className="icon" /> <strong>Market Cap:</strong> {formatNumber(stockDetails?.marketCap || "N/A")}$</p>
                    <p><FaChartLine className="icon" /> <strong>Enterprise Value:</strong> {formatNumber(stockDetails?.enterpriseValue || "N/A")}$</p>
                    <p><FaChartLine className="icon" /> <strong>Trailing PE:</strong> {stockDetails?.trailingPE || "N/A"}</p>
                    <p><FaChartLine className="icon" /> <strong>Forward PE:</strong> {stockDetails?.forwardPE || "N/A"}</p>
                    <p><FaChartLine className="icon" /> <strong>Price to Book:</strong> {stockDetails?.priceToBook || "N/A"}</p>
                </div>

                {/* Dividends */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Dividends</h3>
                    <p><strong>Dividend Rate:</strong> {stockDetails?.dividendRate || "N/A"}$</p>
                    <p><strong>Dividend Yield:</strong> {stockDetails?.dividendYield || "N/A"}%</p>
                    <p><strong>Payout Ratio:</strong> {stockDetails?.payoutRatio || "N/A"}%</p>
                    <p><strong>Five Year Avg Dividend Yield:</strong> {stockDetails?.fiveYearAvgDividendYield || "N/A"}%</p>
                    <p><strong>Last Dividend Date:</strong> {stockDetails?.lastDividendDate || "N/A"}</p>
                </div>

                {/* Financials */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Financials</h3>
                    <p><strong>Total Revenue:</strong> {formatNumber(stockDetails?.totalRevenue || "N/A")}$</p>
                    <p><strong>Net Income to Common:</strong> {formatNumber(stockDetails?.netIncomeToCommon || "N/A")}$</p>
                    <p><strong>Profit Margins:</strong> {stockDetails?.profitMargins || "N/A"}%</p>
                    <p><strong>Return on Assets:</strong> {stockDetails?.returnOnAssets || "N/A"}%</p>
                    <p><strong>Return on Equity:</strong> {stockDetails?.returnOnEquity || "N/A"}%</p>
                </div>

                {/* Analysts & Recommendations */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Analysts & Recommendations</h3>
                    <p><strong>Target High Price:</strong> {stockDetails?.targetHighPrice || "N/A"}$</p>
                    <p><strong>Target Low Price:</strong> {stockDetails?.targetLowPrice || "N/A"}$</p>
                    <p><strong>Target Mean Price:</strong> {stockDetails?.targetMeanPrice || "N/A"}$</p>
                    <p><strong>Recommendation:</strong> {stockDetails?.recommendationKey || "N/A"}</p>
                    <p><strong>Number of Analyst Opinions:</strong> {stockDetails?.numberOfAnalystOpinions || "N/A"}</p>
                </div>

                {/* Stock Metrics */}
                <div className="stock-tab-section-item">
                    <h3 className="section-subtitle">Stock Metrics</h3>
                    <p><strong>Beta:</strong> {stockDetails?.beta || "N/A"}</p>
                    <p><strong>Trailing EPS:</strong> {stockDetails?.trailingEps || "N/A"}</p>
                    <p><strong>Forward EPS:</strong> {stockDetails?.forwardEps || "N/A"}</p>
                    <p><strong>Revenue per Share:</strong> {stockDetails?.revenuePerShare || "N/A"}$</p>
                    <p><strong>Total Cash per Share:</strong> {stockDetails?.totalCashPerShare || "N/A"}$</p>
                    <p><strong>Previous Close:</strong> {stockDetails?.previousClose || "N/A"}$</p>
                    <p><strong>Day Low:</strong> {stockDetails?.dayLow || "N/A"}$</p>
                    <p><strong>Day High:</strong> {stockDetails?.dayHigh || "N/A"}$</p>
                    <p><strong>Volume:</strong> {formatNumber(stockDetails?.volume || "N/A")}</p>
                    <p><strong>Average Volume:</strong> {formatNumber(stockDetails?.averageVolume || "N/A")}</p>
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
