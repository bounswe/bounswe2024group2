import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreatePost from '../src/pages/CreatePost'; 
import { useAuth } from '../src/hooks/useAuth'; 

jest.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    accessToken: 'mockAccessToken', 
    userId: 'mockUserId',
  }),
}));

jest.mock('node-fetch', () => require('jest-fetch-mock'));

describe('CreatePost Component', () => {

  it('toggles tag selection', () => {
    const { getByText, getByTestId } = render(<CreatePost />);

    const tagChip = getByText('Tech'); 
    fireEvent.press(tagChip);

    expect(getByText("Tech").props.style.backgroundColor).toBe("#007BFF");
  });

  it('creates a post successfully', async () => {
    const postData = {
      title: "Test Post Title",
      content: "This is the content of the post.",
      tags: ["Tech", "Science"]
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => postData,
    });

    const { getByPlaceholderText, getByText } = render(<CreatePost />);
    const titleInput = getByPlaceholderText("Title");
    const contentInput = getByPlaceholderText("Content...");

    fireEvent.changeText(titleInput, postData.title);
    fireEvent.changeText(contentInput, postData.content);

    fireEvent.press(getByText("Tech"));
    fireEvent.press(getByText("Science"));

    fireEvent.press(getByText("Create Post"));

    await waitFor(() => getByText("Post created successfully!"));

    expect(getByText("Post created successfully!")).toBeTruthy();
  });

  it('handles stock search correctly', async () => {
    const { getByPlaceholderText, findByText } = render(<CreatePost />);

    const searchInput = getByPlaceholderText("Search stocks...");
    fireEvent.changeText(searchInput, "Apple");

    const stockName = await findByText("Apple (AAPL)");

    expect(stockName).toBeTruthy();
  });

  it('displays an error when stock not found', async () => {
    const { getByPlaceholderText, queryByText } = render(<CreatePost />);

    const searchInput = getByPlaceholderText("Search stocks...");
    fireEvent.changeText(searchInput, "NonExistentStock");

    const errorMessage = await waitFor(() => queryByText("Stock not found"));

    expect(errorMessage).toBeTruthy();
  });

});
