import apiClient from './apiClient';
import log from '../utils/logger';

export const StockService = {

    async fetchSimilarStocks(pattern, limit) {
        try {
            const response = await apiClient.post('/stocks/search/', {
                "pattern": pattern,
                "limit": limit
            }
            );
            return response.data;
        }
        catch (error) {
            log.error('Error fetching similar stocks:', error);
            throw error;
        }
    }

};
