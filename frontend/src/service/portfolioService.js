import apiClient from './apiClient';
import log from '../utils/logger';

const transformPortfolioItem = (portfolioItem) => {
    return {
        id: portfolioItem.id,
        name: portfolioItem.name,
        description: portfolioItem.description || "",
        userId: portfolioItem.user_id,
        createdAt: portfolioItem.created_at ? new Date(portfolioItem.created_at).toLocaleDateString() : "Unknown",
        updatedAt: portfolioItem.updated_at ? new Date(portfolioItem.updated_at).toLocaleDateString() : "Unknown",
        stocks: portfolioItem.stocks || [],
    };
};

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

    // Partially update a portfolio by ID (PATCH)
    async patchPortfolio(id, partialData) {
        try {
            const response = await apiClient.patch(`/portfolios/${id}/`, partialData);
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
};