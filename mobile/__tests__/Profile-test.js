import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../src/pages/ProfilePage';

// Mock the useAuth hook
jest.mock('../src/pages/context/AuthContext', () => ({
    useAuth: () => ({
        username: 'testuser',
        userId: '12345',
        logout: jest.fn(),
    }),
}));

test('renders correctly', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
});
