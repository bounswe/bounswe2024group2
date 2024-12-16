import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import StockDetails from '../src/pages/StockDetails';
import { NavigationContainer } from '@react-navigation/native';

global.fetch = jest.fn();

const mockNavigation = {
    navigate: jest.fn(),
};

const mockRoute = {
    params: { id: 1 },
};

describe('StockDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        const { getByText } = render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        expect(getByText('Unable to load stock details.')).toBeTruthy(); // Default fallback when no data is available.
    });

    test('shows a loading indicator while fetching', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    test('fetches and displays stock details', async () => {
        const mockStockDetails = {
            name: 'Test Stock',
            symbol: 'TS',
            currency: { code: 'TRY' },
            detail: {
                currentPrice: 100,
                marketCap: 500000,
                fiftyTwoWeekHigh: 120,
                fiftyTwoWeekLow: 80,
                volume: 10000,
                averageVolume: 8000,
                open: 95,
                dayLow: 90,
                dayHigh: 105,
                sector: 'Technology',
                industry: 'Software',
                longBusinessSummary: 'This is a test stock used for testing purposes.',
            },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockStockDetails,
        });

        const { getByText } = render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Test Stock')).toBeTruthy();
            expect(getByText('TS')).toBeTruthy();
            expect(getByText('TRY 100')).toBeTruthy();
            expect(getByText('Market Cap: TRY 500000')).toBeTruthy();
            expect(getByText('52-Week High: TRY 120')).toBeTruthy();
            expect(getByText('52-Week Low: TRY 80')).toBeTruthy();
            expect(getByText('Technology')).toBeTruthy();
            expect(getByText('Software')).toBeTruthy();
            expect(getByText('This is a test stock used for testing purposes.')).toBeTruthy();
        });
    });

    test('displays error message if fetch fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        const { getByText } = render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Unable to fetch stock details. Please try again later.')).toBeTruthy();
        });
    });

    test('hides optional fields like business summary if not available', async () => {
        const mockStockDetails = {
            name: 'Test Stock',
            symbol: 'TS',
            currency: { code: 'TRY' },
            detail: {
                currentPrice: 100,
                marketCap: 500000,
            },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockStockDetails,
        });

        const { queryByText } = render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(queryByText('Business Summary')).toBeNull();
        });
    });

    test('ensures correct API call', async () => {
        const mockStockDetails = {
            name: 'Test Stock',
            symbol: 'TS',
            currency: { code: 'TRY' },
            detail: {
                currentPrice: 100,
                marketCap: 500000,
            },
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockStockDetails,
        });

        render(
            <NavigationContainer>
                <StockDetails route={mockRoute} navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('http://159.223.28.163:30002/stocks/1/', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
                    'X-CSRFToken': 'HN4gYGlxSnwtGKK91OG9c6WC6gr8091Pm5Kof3t0WoTHOe0Z2ToubTZUdlOkjR34',
                },
            });
        });
    });
});
