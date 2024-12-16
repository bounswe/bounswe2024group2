import React, { useState, useEffect, useCallback } from "react";
import { createChart } from "lightweight-charts";
import "../../../styles/markets/stocks/StockOverviewPage.css";
import { StockService } from "../../../service/stockService";


const periods = ['1d', '5d', '1mo', '3mo', '1y', '5y'];
const intervals = ['5m', '15m', '90m', '1d', '1d', '1wk'];
const periodLabels = ['1D', '5D', '1M', '3M', '1Y', '5Y'];

const StockChartSection = ({ indexId }) => {
    const [duration, setDuration] = useState("1d");
    const [seriesesData, setSeriesesData] = useState(null);

    const fetchStockData = useCallback(async (index) => {
        const data = new Map(periods.map(period => [period, []]));

        await Promise.all(periods.map(async (period, i) => {
            const interval = intervals[i];
            const response = await StockService.fetchStockHistoricalData(index, period, interval);
            const close = response.Close;
            const date = response.Date;

            const periodData = close.map((value, j) => ({
                time: Math.floor(new Date(date[j]).getTime() / 1000),
                value,
            }));

            data.set(period, periodData);
        }));

        return data;
    }, []);

    useEffect(() => {
        fetchStockData(indexId).then(setSeriesesData).catch(console.error);
    }, [indexId, fetchStockData]);

    const initializeChart = useCallback((container) => {
        return createChart(container, {
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: 'white' },
            },
            height: 400,
            handleScroll: false,
            handleScale: false,
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
            },
            crosshair: {
                horzLine: {
                    visible: true,
                    labelVisible: true,
                },
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },
            },
        });
    }, []);

    const renderChart = useCallback((chart, data, period) => {
        const inProfit = data[0].value < data[data.length - 1].value;
        const areaSeries = chart.addAreaSeries({
            topColor: inProfit ? 'rgba(0, 150, 136, 0.3)' : 'rgba(255, 82, 82, 0.3)',
            bottomColor: inProfit ? 'rgba(0, 150, 136, 0)' : 'rgba(255, 82, 82, 0)',
            lineColor: inProfit ? 'rgba(0, 150, 136, 1)' : 'rgba(255, 82, 82, 1)',
            lineWidth: 2,
        });
        areaSeries.setData(data);
        chart.timeScale().fitContent();
    }, []);

    useEffect(() => {
        const container = document.getElementById('tradingview_chart');
        const chart = initializeChart(container);

        const resizeHandler = () => {
            chart.applyOptions({
                width: container.offsetWidth,
                height: container.offsetHeight,
            });
            chart.timeScale().fitContent();
        };

        window.addEventListener('resize', resizeHandler);
        if (seriesesData) {
            const data = seriesesData.get(duration);
            renderChart(chart, data, duration);
        }

        return () => {
            window.removeEventListener('resize', resizeHandler);
            chart.remove();
        };
    }, [initializeChart, renderChart, duration, seriesesData]);

    return (
        <div className="stock-tab-section">
            <h3>Chart</h3>
            <div id="buttonsContainer" className="duration-buttons">
                {periodLabels.map((label, i) => (
                    <button
                        key={periods[i]}
                        id={periods[i]}
                        onClick={() => setDuration(periods[i])}
                        className={duration === periods[i] ? "active" : ""}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div id="tradingview_chart"></div>
        </div>
    );
};

export default StockChartSection;
