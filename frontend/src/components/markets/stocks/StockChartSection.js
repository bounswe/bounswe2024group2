import React, { useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import "../../../styles/markets/stocks/StockOverviewPage.css";
import RandomUtil from "../../../utils/randomUtil";
import { StockService } from "../../../service/stockService";
import CircleAnimation from "../../CircleAnimation";

// Options for periods
// '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'."

// Options for intervals
// '1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1wk', '1mo', '3mo"
const periods = ['1d', '1w', '1mo', '1y'];
const intervals = ['15m', '1h', '1d', '1wk'];

const StockChartSection = ({ indexId }) => {
    const [duration, setDuration] = useState("1D");
    const [seriesesData, setSeriesesData] = useState(null);

    const getStockData = async () => {

        let data = new Map([]);
        for (let i = 0; i < periods.length; i++) {
            data.set(periods[i].toUpperCase(), []);
        }

        for (let i = 0; i < periods.length; i++) {
            const period = periods[i];
            const interval = intervals[i];
            const response = await StockService.fetchStockHistoricalData(indexId, period, interval);
            console.log("Response:", response);
        }
        return data;
    }

    // const generateRandomData = (mean, deviation) => {
    //     const data = new Map([
    //         ["1D", []],
    //         ["1W", []],
    //         ["1M", []],
    //         ["1Y", []],
    //     ]);
    
    //     let value = mean;
    //     let time = new Date(); // Start from the current date and time
    
    //     // Calculate the time for 1 year ago from today
    //     const yearAgo = new Date();
    //     yearAgo.setFullYear(yearAgo.getFullYear() - 1); // Set to 1 year ago
    
    //     const rng = RandomUtil.createGenerator(indexId);
    //     // Loop through the time intervals and generate random data
    //     // 1d: 30 min intervals
    //     // 1w: 4h intervals
    //     // 1m: 12h intervals
    //     // 1y: 1d intervals
    //     const step = [30, 240, 720, 1440];
    //     const elapsedTimes = [1440, 10080, 43200, 525600];
    //     const keys = ["1D", "1W", "1M", "1Y"];
    //     for (let i = 0; i < step.length; i++) {
    //         const interval = step[i];
    //         time = new Date();
    //         // 30 min floor
    //         time.setMinutes(Math.floor(time.getMinutes() / interval) * interval);
    //         value = mean;
    //         while (time >= yearAgo) {
                
    //             console.log("Value:", value);
    //             const timestamp = Math.floor(time.getTime() / 1000);
    //             const elapsedTime = (new Date() - time) / (1000 * 60);
                
    //             if (elapsedTime <= elapsedTimes[i]) {
    //                 data.get(keys[i]).push({ time: timestamp, value });
    //             }
    //             value = value + RandomUtil.generateRandomNumber(rng) * deviation - deviation / 2;
    //             time = new Date(time - interval * 60 * 1000);
    //         }
    //     }
        

    //     data.forEach((seriesData, key) => {
    //         data.set(key, seriesData.reverse());
    //     });


    //     console.log("Generated data:", data);
    //     return data;
    // };
    
    // const mean = stockData.price;
    // const deviation = 0.2;
    // const seriesesData = generateRandomData(mean, deviation);

    // function for handling series data update

    const updateSeriesData = (data) => {
        setSeriesesData(data);
        renderChart();
    };

    const renderChart = () => {
        const container = document.getElementById('tradingview_chart');
        const chartOptions = {
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: 'white' },

            },
            height: 400,
        };
        const chart = createChart(container, chartOptions);
        const resizeHandler = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            chart.applyOptions({ width, height });
            chart.timeScale().fitContent();
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        function setChartInterval(interval) {
            chart.timeScale().fitContent();
        }
        setChartInterval(duration);
        const intervals = ['1D', '1W', '1M', '1Y'];
        intervals.forEach(interval => {
            // Create buttons if needed
            let button = document.getElementById(interval);
            if (button) {
                return;
            }
            button = document.createElement('button');
            button.id = interval;
            button.innerText = interval;
            button.addEventListener('click', () => {
                setDuration(interval);
                setChartInterval(interval);
            });
            document.getElementById('buttonsContainer').appendChild(button);
        });

        // first vs last point comparison
        const inProfit = seriesesData.get(duration)[0].value < seriesesData.get(duration)[seriesesData.get(duration).length - 1].value;
        // porfit ratio
        const profitRatio = (seriesesData.get(duration)[seriesesData.get(duration).length - 1].value - seriesesData.get(duration)[0].value) / seriesesData.get(duration)[0].value;
        // Gradient color
        console.log("Profit ratio:", profitRatio);
        // First value
        console.log("First value:", seriesesData.get(duration)[0].value);
        // Last value
        console.log("Last value:", seriesesData.get(duration)[seriesesData.get(duration).length - 1].value);
        console.log("Last date in readable:", new Date(seriesesData.get(duration)[seriesesData.get(duration).length - 1].time * 1000).toLocaleDateString());
        console.log("First date in readable:", new Date(seriesesData.get(duration)[0].time * 1000).toLocaleDateString());

        const topAreaColor = inProfit ? 'rgba(0, 150, 136, 0.3)' : 'rgba(255, 82, 82, 0.3)';
        // Gradient fading
        const bottomAreaColor = inProfit ? 'rgba(0, 150, 136, 0)' : 'rgba(255, 82, 82, 0)';
        const lineColor = inProfit ? 'rgba(0, 150, 136, 1)' : 'rgba(255, 82, 82, 1)';

        chart.applyOptions({
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
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
        });
        
        const areaSeries = chart.addAreaSeries({
            topColor: topAreaColor,
            bottomColor: bottomAreaColor,
            lineColor: lineColor,
            lineWidth: 2,
            crossHairMarkerVisible: false,
        });

        areaSeries.setData(seriesesData.get(duration));

        return () => {
            window.removeEventListener('resize', resizeHandler);
            chart.remove();
        };
    }

    useEffect(() => {
        getStockData().then((data) => {
            updateSeriesData(data);
        }).catch((error) => {
            console.error("Error fetching stock data:", error);
        });
    }, []);

    return (
        <div className="stock-tab-section">
            <h3>Price Chart</h3>
            <div id="buttonsContainer" className="duration-buttons"></div>
            <div id="tradingview_chart"></div>
        </div>
    );
};

export default StockChartSection;