import apiClient from './apiClient';

export const fetchNews = async (feedName) => {
    try {
        const response = await apiClient.post('/news/', { feed_name: feedName });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};
