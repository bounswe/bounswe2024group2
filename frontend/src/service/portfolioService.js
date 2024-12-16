import { apiClient } from './apiClient';
import log from '../utils/logger';
import { StockService } from './stockService';

async function transformPortfolioItem(portfolioItem){
    return {
        id: portfolioItem.id,
        name: portfolioItem.name,
        description: portfolioItem.description || "",
        userId: portfolioItem.user_id,
        createdAt: portfolioItem.created_at ? new Date(portfolioItem.created_at).toLocaleDateString() : "Unknown",
        updatedAt: portfolioItem.updated_at ? new Date(portfolioItem.updated_at).toLocaleDateString() : "Unknown",
        stocks: await Promise.all(portfolioItem.stocks.map(transformPortfolioStockItem)) || [],
    };
};

async function transformPortfolioStockItem(stockItem) {
    try {
        const stock = await StockService.fetchStockById(stockItem.stock);
        return {
            id: stock.id,
            code: stock.code,
            name: stock.name,
            currentPrice: stock.price,
            boughtPrice: stockItem.price_bought,
            quantity: stockItem.quantity,
        };
    } catch (error) {
        log.error('Error transforming portfolio stock item:', error);
        throw error;
    }
}

export const PortfolioService = {
    // Fetch all portfolios with pagination
    async fetchPortfolios(page = 1) {
        try {
            const response = await apiClient.get(`/portfolios/`, { params: { page } });
            const rawPortfolios = response.data;

            const transformedPortfolios = rawPortfolios.results.map(transformPortfolioItem);
            return {
                count: rawPortfolios.count,
                next: rawPortfolios.next,
                previous: rawPortfolios.previous,
                results: transformedPortfolios,
            };
        } catch (error) {
            log.error('Error fetching portfolios:', error);
            throw error;
        }
    },

    // Fetch a specific portfolio by ID
    async fetchPortfolioById(id) {
        try {
            const response = await apiClient.get(`/portfolios/${id}/`);
            return transformPortfolioItem(response.data);
        } catch (error) {
            log.error(`Error fetching portfolio with ID ${id}:`, error);
            throw error;
        }
    },

    // Create a new portfolio
    async createPortfolio(portfolioData) {
        try {
            const response = await apiClient.post(`/portfolios/`, portfolioData);
            return transformPortfolioItem(response.data);
        } catch (error) {
            log.error('Error creating portfolio:', error);
            throw error;
        }
    },

    // Update a portfolio by ID (PUT)
    async updatePortfolio(id, portfolioData) {
        try {
            const response = await apiClient.put(`/portfolios/${id}/`, portfolioData);
            return transformPortfolioItem(response.data);
        } catch (error) {
            log.error(`Error updating portfolio with ID ${id}:`, error);
            throw error;
        }
    },
    
    async patchPortfolioStocks(id, portfolio) {
        try {
            const data = {
                "stocks": portfolio.stocks.map(stock => ({
                    stock: stock.id,
                    price_bought: parseFloat(stock.boughtPrice).toFixed(2),
                    quantity: stock.quantity
                }))
            }
            const response = await apiClient.patch(`/portfolios/${id}/`, data);

            return transformPortfolioItem(response.data);
        } catch (error) {
            log.error(`Error patching portfolio with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete a portfolio by ID
    async deletePortfolio(id) {
        try {
            await apiClient.delete(`/portfolios/${id}/`);
            return { message: `Portfolio with ID ${id} deleted successfully.` };
        } catch (error) {
            log.error(`Error deleting portfolio with ID ${id}:`, error);
            throw error;
        }
    },

    // Fetch portfolio by user id
    async fetchPortfolioByUserId(userId) {
        try {
            const response = await apiClient.get(`/portfolios/portfolios-by-user/${userId}/`);
            // a list of portfolios
            const rawPortfolios = response.data;
            const transformedPortfolios = await Promise.all(rawPortfolios.map(transformPortfolioItem));
            return transformedPortfolios;
        } catch (error) {
            log.error(`Error fetching portfolio with user ID ${userId}:`, error);
            throw error;
        }
    },

};
