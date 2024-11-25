import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsPage from '../components/news/NewsPage';

describe('NewsPage Component', () => {
    beforeEach(() => {
        render(<NewsPage />);
    });

    test('renders page header', () => {
        expect(screen.getByText('Economic News')).toBeInTheDocument();
        expect(screen.getByText('Your daily updates on economic trends')).toBeInTheDocument();
    });

    test('renders mock news and RSS sections', () => {
        expect(screen.getByText('Mock Economic News Section')).toBeInTheDocument();
        expect(screen.getByText('Mock RSS Feed Economic News Section')).toBeInTheDocument();
    });

    test('renders news and RSS feed cards', () => {
        const newsCards = screen.getAllByRole('button', { name: /news-card/i });
        expect(newsCards.length).toBeGreaterThan(0);
    });

    test('shows all cards when "All" category is selected', () => {
        fireEvent.click(screen.getByText('Stock Market'));
        fireEvent.click(screen.getByText('All'));
        const visibleCards = screen.getAllByRole('button', { name: /news-card/i });
        expect(visibleCards.length).toBeGreaterThan(0);
    });
});
