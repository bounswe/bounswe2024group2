import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/news/NewsCard.css';

const NewsCard = ({ news }) => {
    return (
        <div className="news-card" onClick={() => window.open(news.rssUrl, '_blank')}>
            <div className="news-card-header">
                <span className="news-card-source">{news.source}</span>
                <span className="news-card-time">{news.publishedAt}</span>
            </div>
            <div className="news-card-body">
                <div className="news-card-text">
                    <h3 className="news-card-title">{news.title}</h3>
                    <p className="news-card-description">{news.description}</p>
                </div>
                {news.coverImageUrl && (
                    <div className="news-card-icon">
                        <img src={news.coverImageUrl} alt={news.source} />
                    </div>
                )}
            </div>
        </div>

    );
};

NewsCard.propTypes = {
    news: PropTypes.object.isRequired,
};


export default NewsCard;
