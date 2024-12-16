import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PortfolioDetails from '../src/pages/PortfolioDetails';
import { useAuth } from '../src/pages/context/AuthContext';

// Mock AuthContext
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('PortfolioDetails Component', () => {
  const mockPortfolio = {
    id: '1',
    name: 'My Portfolio',
    description: 'This is a test portfolio',
    created_at: '2023-01-01T00:00:00Z',
    stocks: [
      {
        stock: 'stock1',
        name: 'Stock 1',
        symbol: 'STK1',
        quantity: 10,
        price_bought: 100,
        currentPrice: 150,
        currency: 'USD',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      accessToken: 'testAccessToken',
    });
  });

  test('renders portfolio details', () => {
    const { getByText } = render(<PortfolioDetails route={{ params: { portfolio: mockPortfolio } }} />);
    expect(getByText('My Portfolio')).toBeTruthy();
    expect(getByText('This is a test portfolio')).toBeTruthy();
    expect(getByText('Created on: 1/1/2023')).toBeTruthy();
  });

  test('renders stock details correctly', () => {
    const { getByText } = render(<PortfolioDetails route={{ params: { portfolio: mockPortfolio } }} />);
    expect(getByText('Stock 1')).toBeTruthy();
    expect(getByText('Quantity: 10, Bought at: 100.00 USD, Current: 150.00 USD')).toBeTruthy();
  });

  test('handles stock removal', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const { getByText, queryByText } = render(
      <PortfolioDetails route={{ params: { portfolio: mockPortfolio } }} />
    );

    fireEvent.press(getByText('Remove'));
    await waitFor(() => expect(queryByText('Stock 1')).toBeNull());
  });

  test('handles adding a new stock', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 'stock2',
          name: 'Stock 2',
          symbol: 'STK2',
          price: 200,
          currency: { code: 'USD' },
        }),
      })
    );

    const { getByPlaceholderText, getByText } = render(
      <PortfolioDetails route={{ params: { portfolio: mockPortfolio } }} />
    );

    fireEvent.changeText(getByPlaceholderText('Search Stocks'), 'Stock 2');
    fireEvent.press(getByText('Search'));

    await waitFor(() => fireEvent.press(getByText('Stock 2 (STK2)')));

    fireEvent.changeText(getByPlaceholderText('Price Bought (TRY)'), '200');
    fireEvent.changeText(getByPlaceholderText('Quantity'), '5');
    fireEvent.press(getByText('Add'));

    await waitFor(() => expect(getByText('Stock 2')).toBeTruthy());
  });
});
