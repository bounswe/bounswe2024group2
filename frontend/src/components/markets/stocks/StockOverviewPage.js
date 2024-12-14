import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockChartSection from "./StockChartSection";
import "../../../styles/markets/stocks/StockOverviewPage.css";
import "../../../styles/Page.css";
import { StockService } from "../../../service/stockService";
import StockFinancialsSection from "./StockFinancialsSection";
import StockAboutSection from "./StockAboutSection";
import CircleAnimation from "../../CircleAnimation";

const StockOverviewPage = () => {
    const { indexId } = useParams();
    const [activeTab, setActiveTab] = useState("overview");

    const [stockData, setStockData] = useState(null);
    const [stockDetails, setStockDetails] = useState(null);

    useEffect(() => {
        // Fetch stock data
        StockService.fetchStockById(indexId).then((stock) => {
            setStockData(stock);
        }
        ).catch((error) => {
            console.error("Error fetching stock data:", error);
        }
        );
        // Fetch stock details
        StockService.fetchStockDetails(indexId).then((details) => {
            setStockDetails(details);
        }
        ).catch((error) => {
            console.error("Error fetching stock details:", error);
        }
        );

    }, [indexId]);


    const renderContent = () => {

        if (!stockData) {
            return <CircleAnimation />;
        }
        switch (activeTab) {
            case "chart":
                return <StockChartSection indexId={indexId} stockData={stockData} />;
            case "financials":
                return <StockFinancialsSection indexId={indexId} />;
            case "about":
                return <StockAboutSection stockDetails={stockDetails} />;
            case "overview":
            default:
                return (
                    <>
                        <StockChartSection indexId={indexId} stockData={stockData} />
                        <StockFinancialsSection indexId={indexId} />
                        <StockAboutSection stockDetails={stockDetails} />
                    </>
                );
        }
    };

    return (
        <div className="page">
            <div style={{ marginTop: "32px" }} />
            <div className="page-content">
                <div className="stock-overview-page">
                    <div className="metadata">
                        {stockData?.imageSrc ? (
                            <img
                                src={stockData?.imageSrc}
                                alt="Stock"
                            />
                        ) : (
                            <div className="placeholder">{stockData?.code?.charAt(0)}</div>
                        )}
                        <div className="metadata-text">
                            <h2>{stockData?.code} - {stockData?.name}</h2>
                            <p>Price: {stockData?.price}$</p>
                        </div>
                    </div>

                    <div className="tabs">
                        <button onClick={() => setActiveTab("overview")}>Overview</button>
                        <button onClick={() => setActiveTab("chart")}>Chart</button>
                        <button onClick={() => setActiveTab("financials")}>Financials</button>
                        <button onClick={() => setActiveTab("about")}>About</button>
                    </div>
                    <div className="content">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockOverviewPage;