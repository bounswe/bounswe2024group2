import React from 'react';
import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Post from '../src/pages/Post'; // Adjust the import as necessary

jest.mock('node-fetch', () => require('jest-fetch-mock'));

describe('Post Component', () => {
  it('should match snapshot', () => {
    const postData = {
      postId: '1',
      author: 'John Doe',
      userMap: {},
      post: {
        title: 'Test Post Title',
        created_at: '2024-12-16T00:00:00Z',
        tags: [{ id: 1, name: 'Test Tag' }],
        content: 'This is a test post content.',
        stocks: [1],
        liked_by: [],
      },
    };

    const tree = renderer.create(<Post route={{ params: postData }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should fetch post data and update state', async () => {
    const mockPost = {
      title: 'Test Post Title',
      created_at: '2024-12-16T00:00:00Z',
      tags: [{ id: 1, name: 'Test Tag' }],
      content: 'This is a test post content.',
      stocks: [1],
      liked_by: [],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    });

    const { getByText } = render(<Post postId="1" baseURL="http://example.com" />);

    await waitFor(() => getByText('Test Post Title'));

    expect(getByText('Test Post Title')).toBeTruthy();
  });

  it('should handle fetch error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { queryByText } = render(<Post postId="1" baseURL="http://example.com" />);

    await waitFor(() => queryByText('Loading...'));

    expect(queryByText('Test Post Title')).toBeNull();
  });

  it('should fetch comments and update state', async () => {
    const mockComments = [
      { id: 1, user_id: '2', content: 'Test comment 1' },
      { id: 2, user_id: '3', content: 'Test comment 2' },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
    });

    const { getByText } = render(<Post postId="1" baseURL="http://example.com" />);

    await waitFor(() => getByText('Test comment 1'));

    expect(getByText('Test comment 1')).toBeTruthy();
    expect(getByText('Test comment 2')).toBeTruthy();
  });

  it('should handle fetch comments error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { queryByText } = render(<Post postId="1" baseURL="http://example.com" />);

    await waitFor(() => queryByText('Loading...'));

    expect(queryByText('Test comment 1')).toBeNull();
  });

  it('should post a comment and update the state', async () => {
    const newComment = { post_id: '1', content: 'New comment' };
    const mockResponse = { id: 3, user_id: '4', content: 'New comment' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Post postId="1" baseURL="http://example.com" accessToken="mock-token" />
    );

    fireEvent.changeText(getByPlaceholderText('Write a comment...'), 'New comment');
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => getByText('New comment'));

    expect(getByText('New comment')).toBeTruthy();
  });

  it('should handle post comment error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { getByPlaceholderText } = render(
      <Post postId="1" baseURL="http://example.com" accessToken="mock-token" />
    );

    fireEvent.changeText(getByPlaceholderText('Write a comment...'), 'New comment');
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error liking the post: 400'));

    expect(Alert.alert).toHaveBeenCalled();
  });

  it('should post a like and update the state', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    const { getByText } = render(<Post postId="1" baseURL="http://example.com" accessToken="mock-token" />);

    fireEvent.press(getByText('👍 Like'));

    await waitFor(() => getByText('👍 Liked'));

    expect(getByText('👍 Liked')).toBeTruthy();
  });

  it('should handle post like error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const { getByText } = render(<Post postId="1" baseURL="http://example.com" accessToken="mock-token" />);

    fireEvent.press(getByText('👍 Like'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error liking the post: 400'));

    expect(Alert.alert).toHaveBeenCalled();
  });

  it('should open and close the comment input modal', () => {
    const { getByText, queryByText } = render(<Post postId="1" baseURL="http://example.com" accessToken="mock-token" />);

    fireEvent.press(getByText('💬 Add Comment'));
    
    expect(queryByText('Write a comment...')).toBeTruthy();

    fireEvent.press(getByText('Cancel'));

    expect(queryByText('Write a comment...')).toBeNull();
  });
});
