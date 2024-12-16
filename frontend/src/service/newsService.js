import { apiClient } from './apiClient';
import log from '../utils/logger';

const transformNewsItem = (newsItem) => {
    return {
        id: Math.floor(Math.random() * 10000),
        title: newsItem.title,
        description: newsItem.description || "", 
        rssUrl: newsItem.link,
        category: "General", 
        publishedAt: newsItem.published ? new Date(newsItem.published).toLocaleDateString() : "Unknown",
        coverImageUrl: newsItem.image || "",
        source: newsItem.author ? newsItem.author.split(' by ')[0] || newsItem.author : "Unknown", 
    };
};

export const fetchNews = async (feedName) => {
    try {
        const response = await apiClient.post('/news/', { feed_name: feedName });
        const rawNews = response.data;

        const transformedNews = rawNews.map(transformNewsItem);
        return transformedNews;
    } catch (error) {
        log.error('Error fetching news:', error);
        throw error;
    }
};

