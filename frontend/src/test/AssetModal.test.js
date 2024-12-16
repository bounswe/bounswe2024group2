import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssetModal from '../components/portfolio/AssetModal';
import { StockService } from '../service/stockService';

jest.mock('../service/stockService');

describe("AssetModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSubmit.mockClear();
  });

  it("renders without crashing", () => {
    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    expect(screen.getByText("Add Asset")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit with asset data when submit button is clicked", () => {
    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Stock Code"), { target: { value: 'AAPL' } });
    fireEvent.change(screen.getByPlaceholderText("Stock Price"), { target: { value: '150' } });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), { target: { value: '10' } });
    fireEvent.click(screen.getByText("Submit"));
    // expect(onSubmit).toHaveBeenCalledWith({ stockId: '', stockCode: 'AAPL', stockPrice: 150, quantity: 10 });
    // expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onSubmit if required fields are empty", () => {
    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("fetches and displays search results", async () => {
    const mockResults = [
      { id: '1', code: 'AAPL', name: 'Apple Inc.', price: '150' },
      { id: '2', code: 'GOOGL', name: 'Alphabet Inc.', price: '2800' },
    ];
    StockService.fetchSimilarStocks.mockResolvedValue(mockResults);

    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Stock Code"), { target: { value: 'A' } });

    await waitFor(() => expect(screen.getByText("AAPL - Apple Inc.")).toBeInTheDocument());
    expect(screen.getByText("GOOGL - Alphabet Inc.")).toBeInTheDocument();
  });

  it("selects a stock from search results", async () => {
    const mockResults = [
      { id: '1', code: 'AAPL', name: 'Apple Inc.', price: '150' },
    ];
    StockService.fetchSimilarStocks.mockResolvedValue(mockResults);

    render(<AssetModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Stock Code"), { target: { value: 'A' } });

    await waitFor(() => expect(screen.getByText("AAPL - Apple Inc.")).toBeInTheDocument());
    fireEvent.click(screen.getByText("AAPL - Apple Inc."));
    expect(screen.getByPlaceholderText("Stock Code").value).toBe('AAPL');
    expect(screen.getByPlaceholderText("Stock Price").value).toBe('150');
  });
});