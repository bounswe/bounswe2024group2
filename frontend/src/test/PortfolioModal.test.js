import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioModal from '../components/portfolio/PortfolioModal';

describe("PortfolioModal", () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
    onSubmit.mockClear();
  });

  it("renders without crashing", () => {
    render(<PortfolioModal onClose={onClose} onSubmit={onSubmit} />);
    expect(screen.getByText("Create Portfolio")).toBeTruthy();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<PortfolioModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit with portfolio name when submit button is clicked", () => {
    render(<PortfolioModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Portfolio Name"), { target: { value: 'My Portfolio' } });
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledWith('My Portfolio');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onSubmit if portfolio name is empty", () => {
    render(<PortfolioModal onClose={onClose} onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});