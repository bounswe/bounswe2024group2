import apiClient from './apiClient';
import log from '../utils/logger';

const transformStockItem = (stockItem) => {
    log.debug('Transforming stock item:', {
        id: stockItem.id,
        code: stockItem.symbol,
        name: stockItem.name,
        price: stockItem.price,
        currency: stockItem.currency
    });
    return {
        id: stockItem.id,
        code: stockItem.symbol,
        name: stockItem.name,
        price: stockItem.price,
        currency: stockItem.currency
    };
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
    }
};
