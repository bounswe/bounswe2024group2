import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButtons from '../components/news/FilterButtons';

describe("FilterButtons", () => {

    const categories = ["Category1", "Category2", "Category3"];
    const setSelectedCategory = jest.fn();
    const selectedCategory = "Category1";

    it("renders without crashing", () => {
        render(<FilterButtons categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />);
        expect(screen.getByText("Category1")).toBeTruthy();
    });

    it("renders all categories", () => {
        render(<FilterButtons categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />);
        categories.forEach(category => {
            expect(screen.getByText(category)).toBeTruthy();
        });
    });

    it("calls setSelectedCategory when a button is clicked", () => {
        render(<FilterButtons categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />);
        fireEvent.click(screen.getByText("Category2"));
        expect(setSelectedCategory).toHaveBeenCalledWith("Category2");
    });

    it("applies selected class to the selected category", () => {
        render(<FilterButtons categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />);
        const selectedButton = screen.getByText("Category1");
        expect(selectedButton).toHaveClass("selected");
    });

    it("does not apply selected class to non-selected categories", () => {
        render(<FilterButtons categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />);
        const nonSelectedButton = screen.getByText("Category2");
        expect(nonSelectedButton).not.toHaveClass("selected");
    });

});