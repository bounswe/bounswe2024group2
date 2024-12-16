import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from '../components/notfound/NotFound';

describe("NotFound", () => {

    it("renders without crashing", () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <NotFound />
            </MemoryRouter>
        );
        expect(screen.getByText("404")).toBeTruthy();
    });

    it("displays the correct error message", () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <NotFound />
            </MemoryRouter>
        );
        expect(screen.getByText("Oops! It looks like you are lost. Let the bear help you find your way.")).toBeTruthy();
    });

    it("renders the not found bear image", () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <NotFound />
            </MemoryRouter>
        );
        const image = screen.getByAltText("Not Found Bear");
        expect(image).toBeTruthy();
    });

    it("renders the back home link", () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <NotFound />
            </MemoryRouter>
        );
        const link = screen.getByText("Take me home");
        expect(link).toBeTruthy();
        expect(link).toHaveAttribute('href', '/');
    });

    it("renders NotFound component for non-existent routes", () => {
        render(
            <MemoryRouter initialEntries={['/random-page']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("404")).toBeTruthy();
    });

});