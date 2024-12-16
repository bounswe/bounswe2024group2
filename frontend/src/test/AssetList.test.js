import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssetList from '../components/portfolio/AssetList';
import { useAlertModal } from '../components/alert/AlertModalContext';

jest.mock('../components/alert/AlertModalContext');

describe("AssetList", () => {
  const assets = [
    { code: 'AAPL', boughtPrice: 150, currentPrice: 200, quantity: 10 },
    { code: 'GOOGL', boughtPrice: 1000, currentPrice: 1200, quantity: 5 },
  ];
  const setAssets = jest.fn();
  const showModal = jest.fn();

  beforeEach(() => {
    useAlertModal.mockReturnValue({ showModal });
  });

  it("renders without crashing", () => {
    render(<AssetList assets={assets} setAssets={setAssets} />);
    expect(screen.getByText("Stock Code")).toBeTruthy();
  });

  it("renders all assets", () => {
    render(<AssetList assets={assets} setAssets={setAssets} />);
    assets.forEach(asset => {
      expect(screen.getByText(asset.code)).toBeTruthy();
      expect(screen.getByText(asset.quantity.toString())).toBeTruthy();
      expect(screen.getAllByText(asset.boughtPrice.toFixed(2)).length).toBeGreaterThan(0);
    });
  });

  it("calculates and displays profit/loss correctly", () => {
    render(<AssetList assets={assets} setAssets={setAssets} />);
    const profitLoss1 = ((200 - 150) * 10).toFixed(2);
    const profitLoss2 = ((1200 - 1000) * 5).toFixed(2);
    expect(screen.getByText(profitLoss1)).toBeTruthy();
    expect(screen.getAllByText(profitLoss2).length).toBeGreaterThan(0);
  });

  it("allows editing an asset", () => {
    render(<AssetList assets={assets} setAssets={setAssets} />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    fireEvent.change(screen.getByDisplayValue(150), { target: { value: '160' } });
    fireEvent.click(screen.getByText("Save"));
    expect(setAssets).toHaveBeenCalled();
  });
});