import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AssetModal from "./AssetModal";
import { StockService } from "../../service/stockService";

// Mocking the StockService to avoid real API calls during the test
jest.mock("../../service/stockService", () => ({
  fetchSimilarStocks: jest.fn(),
}));

describe("AssetModal", () => {
  test("renders input fields and buttons", () => {
    render(<AssetModal onClose={jest.fn()} onSubmit={jest.fn()} />);

    // Check if the input fields and buttons are rendered
    expect(screen.getByPlaceholderText("Stock Code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Stock Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("handles stock code input and selects a stock", async () => {
    const mockStockResults = [
      { id: 1, code: "AAPL", name: "Apple", price: 150 },
      { id: 2, code: "GOOGL", name: "Google", price: 2800 },
    ];

    StockService.fetchSimilarStocks.mockResolvedValue(mockStockResults);

    render(<AssetModal onClose={jest.fn()} onSubmit={jest.fn()} />);

    const stockCodeInput = screen.getByPlaceholderText("Stock Code");

    // Simulate entering a stock code and the search function being triggered
    fireEvent.change(stockCodeInput, { target: { value: "AAPL" } });

    await waitFor(() => {
      expect(StockService.fetchSimilarStocks).toHaveBeenCalledWith("AAPL", 5);
    });

    // Check that the search results are rendered
    expect(screen.getByText("AAPL - Apple")).toBeInTheDocument();

    // Simulate selecting a stock
    fireEvent.click(screen.getByText("AAPL - Apple"));

    // Check if stock information is updated in the input fields
    expect(screen.getByPlaceholderText("Stock Code").value).toBe("AAPL");
    expect(screen.getByPlaceholderText("Stock Price").value).toBe("150");
  });

  test("calls onSubmit with correct values when submit button is clicked", async () => {
    const mockOnSubmit = jest.fn();
    const mockStockResults = [
      { id: 1, code: "AAPL", name: "Apple", price: 150 },
    ];

    StockService.fetchSimilarStocks.mockResolvedValue(mockStockResults);

    render(<AssetModal onClose={jest.fn()} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Stock Code"), {
      target: { value: "AAPL" },
    });
    await waitFor(() => {
      expect(screen.getByText("AAPL - Apple")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("AAPL - Apple"));
    fireEvent.change(screen.getByPlaceholderText("Stock Price"), {
      target: { value: "150" },
    });
    fireEvent.change(screen.getByPlaceholderText("Quantity"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        stockId: 1,
        stockCode: "AAPL",
        stockPrice: 150,
        quantity: 10,
      });
    });
  });
});
