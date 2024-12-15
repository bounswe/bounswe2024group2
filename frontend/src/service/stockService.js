import { apiClient } from './apiClient';
import log from '../utils/logger';

const transformStockItem = (stockItem) => {
    log.debug('Transforming stock item:', {
        id: stockItem.id,
        code: stockItem.symbol,
        name: stockItem.name,
        price: stockItem.detail.currentPrice,
        currency: stockItem.currency
    });
    return {
        id: stockItem.id,
        code: stockItem.symbol,
        name: stockItem.name,
        price: stockItem.detail.currentPrice,
        currency: stockItem.currency
    };
}

const transformStockDetails = (stockItem) => {
    const details = stockItem.detail;
    log.debug('Transforming stock details:', details);
    return details;
}

export const StockService = {
    
    async fetchSimilarStocks(pattern, limit) {
        try {
            const response = await apiClient.post('/stocks/search/', {
                "pattern": pattern,
                "limit": limit
            }
            );
            const stocks = response.data;
            return stocks.map(transformStockItem);
        }
        catch (error) {
            log.error('Error fetching similar stocks:', error);
            throw error;
        }
    },

    // Get stock by ID
    async fetchStockById(id) {
        try {
            const response = await apiClient.get(`/stocks/${id}/`);
            return transformStockItem(response.data);
        } catch (error) {
            log.error(`Error fetching stock with ID ${id}:`, error);
            throw error;
        }
    },
    async fetchStockDetails(id) {
        try {
            const response = await apiClient.get(`/stocks/${id}/`);
            console.log("response", response.data);
            return transformStockDetails(response.data);
        } catch (error) {
            log.error(`Error fetching stock with ID ${id}:`, error);
            throw error;
        }
    },

    async fetchStockHistoricalData(id, period, interval) {
        try {
            const response = await apiClient.post(`/stocks/${id}/get_historical_data/`, {
                period,
                interval
            });
            
            return response.data;
        } catch (error) {
            log.error(`Error fetching stock historical data with ID ${id}:`, error);
            throw error;
        }
    }

};
