import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Community from '../src/pages/Community';
import { useAuth } from '../src/pages/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

// Mock the useAuth hook
jest.mock('../src/pages/context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock('../src/pages/config/config', () => ({
    default: { baseURL: 'http://localhost:3000' },
}));

global.fetch = jest.fn();

const mockNavigation = {
    navigate: jest.fn(),
};

describe('Community Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAuth.mockReturnValue({
            userId: 1,
            accessToken: 'mock-access-token',
        });
    });

    test('renders correctly', () => {
        const { getByTestId, getByPlaceholderText, getByText }  = render(
            <NavigationContainer>
                <Community navigation={mockNavigation} />
            </NavigationContainer>
        );

        expect(getByText('Community')).toBeTruthy();
        expect(getByText('Create A Post')).toBeTruthy();
        expect(getByPlaceholderText('Search posts...')).toBeTruthy();
    });

    test('fetches posts and users on focus', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        { id: 1, title: 'Test Post', author: 1, content: 'Test Content', tags: [], liked_by: [], comments: 0 },
                    ]),
            })
        );

        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        { id: 1, username: 'TestUser' },
                    ]),
            })
        );

        const { getByText } = render(
            <NavigationContainer>
                <Community navigation={mockNavigation} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(getByText('Test Post')).toBeTruthy();
            expect(getByText('Test Content')).toBeTruthy();
        });
    });

    test('navigates to CreatePost screen when "Create A Post" is clicked', () => {
        const { getByText } = render(
            <NavigationContainer>
                <Community navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Create A Post'));

        expect(mockNavigation.navigate).toHaveBeenCalledWith('CreatePost');
    });

    test('alerts and navigates to Login when user is not logged in and tries to create a post', () => {
        useAuth.mockReturnValueOnce({
            userId: null,
            accessToken: null,
        });

        const { getByText } = render(
            <NavigationContainer>
                <Community navigation={mockNavigation} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Create A Post'));

        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login&Register');
    });

    test('handles adding a comment correctly', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        const { getByTestId, getByPlaceholderText, getByText } = render(
            <NavigationContainer>
                <Community navigation={mockNavigation} />
            </NavigationContainer>
        );

    
        fireEvent.press(getByTestId('add-comment-button'));
        fireEvent.changeText(getByPlaceholderText('Write a comment...'), 'This is a test comment');
        fireEvent.press(getByText('Submit'));
    
        

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3000/comments/',
                expect.objectContaining({
                    method: 'POST',
                })
            );
        });
    });
});
