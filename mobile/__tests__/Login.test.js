import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/pages/Login';
import { Alert } from 'react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // Mock Animated for RN

describe('Login Component', () => {
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch globally
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert'); // Mock Alert.alert
  });

  it('handles login failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ message: 'Invalid credentials' }),
    });

    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'wrongUser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongPass');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://159.223.28.163:30002/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': expect.any(String),
        },
        body: JSON.stringify({ username: 'wrongUser', password: 'wrongPass' }),
      });
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Login Failed',
      'Invalid credentials'
    );
  });
});
