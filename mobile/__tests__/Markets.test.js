import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Markets from '../src/pages/Markets'; 

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

// Mock fetch globally
global.fetch = jest.fn();

describe('Markets Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading indicator initially', () => {
    const { getByTestId } = render(<Markets navigation={mockNavigation} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('displays stocks correctly after fetching', async () => {
    const mockStocks = [
      { id: 1, name: 'Stock A', symbol: 'A', price: 100, currency: { code: 'USD' } },
      { id: 2, name: 'Stock B', symbol: 'B', price: 200, currency: { code: 'USD' } },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockStocks),
    });

    const { getByText } = render(<Markets navigation={mockNavigation} />);

    await waitFor(() => expect(getByText('Stock A')).toBeTruthy());
    expect(getByText('100.00 USD')).toBeTruthy();
    expect(getByText('Stock B')).toBeTruthy();
    expect(getByText('200.00 USD')).toBeTruthy();
  });

  test('shows an error alert if fetching fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const alertSpy = jest.spyOn(Alert, 'alert');
    render(<Markets navigation={mockNavigation} />);

    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith('Error', 'Unable to fetch stocks. Please try again later.')
    );
  });

  test('search functionality filters results correctly', async () => {
    const mockSearchResults = [
      { id: 3, name: 'Stock C', symbol: 'C', price: 300, currency: { code: 'USD' } },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]), // Initial fetch
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchResults), // Search fetch
      });

    const { getByPlaceholderText, getByText } = render(<Markets navigation={mockNavigation} />);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'Stock C');

    await waitFor(() => expect(getByText('Stock C')).toBeTruthy());
    expect(getByText('300.00 USD')).toBeTruthy();
  });

  test('triggers navigation to StockDetails when a stock is pressed', async () => {
    const mockStocks = [{ id: 1, name: 'Stock A', symbol: 'A', price: 100, currency: { code: 'USD' } }];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockStocks),
    });

    const { getByText } = render(<Markets navigation={mockNavigation} />);

    await waitFor(() => expect(getByText('Stock A')).toBeTruthy());
    fireEvent.press(getByText('Stock A'));
    expect(mockNavigate).toHaveBeenCalledWith('StockDetails', { id: 1 });
  });

  test('loads more stocks when reaching the end of the list', async () => {
    const mockStocksPage1 = [
      { id: 1, name: 'Stock A', symbol: 'A', price: 100, currency: { code: 'USD' } },
    ];
    const mockStocksPage2 = [
      { id: 2, name: 'Stock B', symbol: 'B', price: 200, currency: { code: 'USD' } },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockStocksPage1), // First page
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockStocksPage2), // Second page
      });

    const { getByText, getByTestId } = render(<Markets navigation={mockNavigation} />);

    await waitFor(() => expect(getByText('Stock A')).toBeTruthy());

    fireEvent.scroll(getByTestId('flatlist'), {
      nativeEvent: { contentOffset: { y: 500 }, contentSize: { height: 1000 }, layoutMeasurement: { height: 500 } },
    });

    await waitFor(() => expect(getByText('Stock B')).toBeTruthy());
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
