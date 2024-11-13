import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import FilterButtons from './FilterButtons';
import '../../styles/news/News.css';

const mockNewsData = [
    {
        id: 1,
        title: "GDP Growth Forecasts Revised",
        description: "Recent reports indicate that GDP growth forecasts for major economies have been revised upwards.",
        rssUrl: "https://example.com/news1",
        category: "Global Economy",
        publishedAt: "2 hours ago", 
        coverImageUrl: "https://www.thisiscolossal.com/wp-content/uploads/2024/10/jonk-1.jpg", 
        source: "Economic Times",
    },
    {
        id: 2,
        title: "Major Indices Reach All-Time Highs",
        description: "The stock market sees a significant uptick as major indices reach all-time highs.",
        rssUrl: "https://example.com/news2",
        category: "Stock Market",
        publishedAt: "3 hours ago",
        // coverImageUrl: "https://example.com/images/news2.jpg", 
        source: "Market Watch", 
    },
    {
        id: 3,
        title: "Bitcoin Surges Past $60,000",
        description: "Bitcoin's value has surged past $60,000 amid increased institutional adoption.",
        rssUrl: "https://example.com/news3",
        category: "Cryptocurrency",
        publishedAt: "1 hour ago", 
        // coverImageUrl: "https://example.com/images/news3.jpg", 
        source: "CoinDesk", 
    },
    {
        id: 4,
        title: "Rising Costs Impact Consumers",
        description: "Inflation rates are rising, leading to increased costs for consumers on everyday goods.",
        rssUrl: "https://example.com/news4",
        category: "Inflation",
        publishedAt: "4 hours ago", 
        // coverImageUrl: "https://example.com/images/news4.jpg", 
        source: "Bloomberg", 
    },
    {
        id: 5,
        title: "Unemployment Rates Hit Record Low",
        description: "The job market strengthens as unemployment rates hit a record low across the nation.",
        rssUrl: "https://example.com/news5",
        category: "Job Market",
        publishedAt: "5 hours ago", 
        coverImageUrl: "https://1finance.co.in/magazine/wp-content/uploads/2024/01/Blog-5-b-scaled.jpg", 
        source: "The Wall Street Journal",
    },
];

// Mock data for RSS feeds
const mockRssFeedData = [
    {
        id: 6,
        title: "New Agreements Boost International Trade",
        description: "New trade agreements are set to boost international trade among participating countries.",
        rssUrl: "https://example.com/news6",
        category: "Trade",
        publishedAt: "3 days ago",
        // coverImageUrl: "https://example.com/images/news6.jpg",
        source: "Reuters",
    },
    {
        id: 7,
        title: "Emerging Markets on the Rise",
        description: "Emerging markets are gaining traction as investors look for new opportunities.",
        rssUrl: "https://example.com/news7",
        category: "Market Trends",
        publishedAt: "2 days ago", 
        // coverImageUrl: "https://example.com/images/news7.jpg",
        source: "Forbes", 
    },
    {
        id: 8,
        title: "Interest Rates Held Steady",
        description: "The Federal Reserve has announced that interest rates will remain steady for the foreseeable future.",
        rssUrl: "https://example.com/news8",
        category: "Federal Reserve",
        publishedAt: "1 day ago", 
        // coverImageUrl: "https://example.com/images/news8.jpg",
        source: "CNBC", 
    },
];


const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [rssNewsData, setRssNewsData] = useState([]);
    const all = 'All';
    const [selectedCategory, setSelectedCategory] = useState(all);
    const [selectedRssCategory, setSelectedRssCategory] = useState(all);

    useEffect(() => {
        setNewsData(mockNewsData);
        setRssNewsData(mockRssFeedData);
    }, []);

    const newsCategories = [all, ...new Set(mockNewsData.map(news => news.category))];
    const rssCategories = [all, ...new Set(mockRssFeedData.map(news => news.category))];

    const filteredNews = newsData.filter((news) =>
        selectedCategory === all ? true : news.category === selectedCategory
    );

    const filteredRssNews = rssNewsData.filter((news) =>
        selectedRssCategory === all ? true : news.category === selectedRssCategory
    );

    return (
        <div className="news-page">
            <div className="news-header">
                <h1 className="news-title">Economic News</h1>
                <h2 className="news-subtitle">Your daily updates on economic trends</h2>
            </div>

            <div className="news-content">
                <h3 className="news-section-title">Mock Economic News Section</h3>
                <div className="news-filter-buttons">
                    <FilterButtons categories={newsCategories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />    
                </div>
                <div className="news-scrollable-section">
                    {filteredNews.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>

                <h3 className="news-section-title">Mock RSS Feed Economic News Section</h3>
                <div className="news-filter-buttons">
                    <FilterButtons categories={rssCategories} setSelectedCategory={setSelectedRssCategory} selectedCategory={selectedRssCategory} />
                </div>
                <div className="news-scrollable-section">
                    {filteredRssNews.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
