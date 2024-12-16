import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../components/news/NewsCard';

describe("NewsCard", () => {

    const news = {
        source: "News Source",
        publishedAt: "2023-10-01",
        title: "News Title",
        description: "News Description",
        rssUrl: "https://example.com/news",
        coverImageUrl: "https://example.com/image.jpg"
    };

    it("renders without crashing", () => {
        render(<NewsCard news={news} />);
        expect(screen.getByText("News Source")).toBeTruthy();
    });

    it("renders news source", () => {
        render(<NewsCard news={news} />);
        expect(screen.getByText(news.source)).toBeTruthy();
    });

    it("renders news published date", () => {
        render(<NewsCard news={news} />);
        expect(screen.getByText(news.publishedAt)).toBeTruthy();
    });

    it("renders news title", () => {
        render(<NewsCard news={news} />);
        expect(screen.getByText(news.title)).toBeTruthy();
    });

    it("renders news description", () => {
        render(<NewsCard news={news} />);
        expect(screen.getByText(news.description)).toBeTruthy();
    });

    it("renders cover image if provided", () => {
        render(<NewsCard news={news} />);
        const image = screen.getByAltText(news.source);
        expect(image).toBeTruthy();
        expect(image).toHaveAttribute('src', news.coverImageUrl);
    });

    it("does not render cover image if not provided", () => {
        const newsWithoutImage = { ...news, coverImageUrl: null };
        render(<NewsCard news={newsWithoutImage} />);
        expect(screen.queryByAltText(news.source)).toBeNull();
    });

    it("opens news link in a new tab when clicked", () => {
        window.open = jest.fn();
        render(<NewsCard news={news} />);
        fireEvent.click(screen.getByText(news.title));
        expect(window.open).toHaveBeenCalledWith(news.rssUrl, '_blank');
    });

});