import React from 'react';
import '../../styles/News.css';

const NewsCard = ({ news }) => {
    return (
        <div className="card" onClick={() => window.open(news.rssUrl, '_blank')}>
            <div className="card-header">
                <span className="card-source">{news.source}</span>
                <span className="card-time">{news.publishedAt}</span>
            </div>
            <div className="card-body">
                <div className="card-text">
                    <h3 className="card-title">{news.title}</h3>
                    <p className="card-description">{news.description}</p>
                </div>
                {news.coverImageUrl && (
                    <div className="card-icon">
                        <img src={news.coverImageUrl} alt={news.source} />
                    </div>
                )}
            </div>
        </div>

    );
};

export default NewsCard;
