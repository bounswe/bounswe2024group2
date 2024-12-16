import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortfolioDetailsCard from '../components/portfolio/PortfolioDetailsCard';
import CircleAnimation from '../components/CircleAnimation';

jest.mock('../components/CircleAnimation', () => () => <div data-testid="circle-animation" />);

describe("PortfolioDetailsCard", () => {

    it("renders loading state correctly", () => {
        render(<PortfolioDetailsCard loading={true} />);
        expect(screen.getByTestId("circle-animation")).toBeTruthy();
    });

    it("renders portfolio details correctly", () => {
        const numAssets = 5;
        const totalValue = 12345.67;
        const totalProfit = 678.90;

        render(<PortfolioDetailsCard loading={false} numAssets={numAssets} totalValue={totalValue} totalProfit={totalProfit} />);

        expect(screen.getByText("Portfolio Details")).toBeTruthy();
        expect(screen.getByText("Number of Assets:")).toBeTruthy();
        expect(screen.getByText(numAssets.toString())).toBeTruthy();
        expect(screen.getByText("Total Value:")).toBeTruthy();
        expect(screen.getByText(`$${totalValue.toFixed(2)}`)).toBeTruthy();
        expect(screen.getByText("Total Profit:")).toBeTruthy();
        expect(screen.getByText(`$${totalProfit.toFixed(2)}`)).toBeTruthy();
    });

    it("renders loss correctly", () => {
        const numAssets = 5;
        const totalValue = 12345.67;
        const totalProfit = -678.90;

        render(<PortfolioDetailsCard loading={false} numAssets={numAssets} totalValue={totalValue} totalProfit={totalProfit} />);

        expect(screen.getByText("Portfolio Details")).toBeTruthy();
        expect(screen.getByText("Number of Assets:")).toBeTruthy();
        expect(screen.getByText(numAssets.toString())).toBeTruthy();
        expect(screen.getByText("Total Value:")).toBeTruthy();
        expect(screen.getByText(`$${totalValue.toFixed(2)}`)).toBeTruthy();
        expect(screen.getByText("Total Profit:")).toBeTruthy();
        expect(screen.getByText(`$${totalProfit.toFixed(2)}`)).toBeTruthy();
    });

});