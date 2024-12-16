import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Portfolio from '../src/pages/Portfolio';
import { useAuth } from '../src/pages/context/AuthContext';

// Mock AuthContext
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('Portfolio Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      userId: 'testUserId',
      accessToken: 'testAccessToken',
    });
  });

  test('renders loading indicator while fetching data', async () => {
    const { getByTestId } = render(<Portfolio navigation={mockNavigation} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('displays "No portfolios yet" when no data is available', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    const { getByText } = render(<Portfolio navigation={mockNavigation} />);
    await waitFor(() => expect(getByText('You have no portfolios yet.')).toBeTruthy());
  });

  test('renders portfolios correctly', async () => {
    const mockPortfolios = [
      { id: '1', name: 'Portfolio 1', stocks: [], totalProfitOrLoss: 100 },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPortfolios),
      })
    );

    const { getByText } = render(<Portfolio navigation={mockNavigation} />);
    await waitFor(() => expect(getByText('Portfolio 1')).toBeTruthy());
  });

  test('navigates to PortfolioDetails on card press', async () => {
    const mockPortfolios = [
      { id: '1', name: 'Portfolio 1', stocks: [], totalProfitOrLoss: 100 },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPortfolios),
      })
    );

    const { getByText } = render(<Portfolio navigation={mockNavigation} />);
    await waitFor(() => fireEvent.press(getByText('Portfolio 1')));
    expect(mockNavigate).toHaveBeenCalledWith('PortfolioDetails', { portfolio: mockPortfolios[0] });
  });
});
