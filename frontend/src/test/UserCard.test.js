import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/profile/UserCard';
import ProfileService from '../service/profileService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../service/profileService');

describe("UserCard", () => {
  const mockNavigate = jest.fn();
  const mockUser = {
    id: '1',
    username: 'testuser',
    image: 'https://example.com/avatar.jpg',
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    ProfileService.fetchUserById.mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<UserCard userId="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders user data after fetching", async () => {
    render(<UserCard userId="1" />);
    await waitFor(() => expect(screen.getByText(mockUser.username)).toBeInTheDocument());
    expect(screen.getByAltText(`${mockUser.username}'s avatar`)).toBeInTheDocument();
  });

  it("renders error message if user data fails to load", async () => {
    ProfileService.fetchUserById.mockRejectedValue(new Error('Error fetching user'));
    render(<UserCard userId="1" />);
    await waitFor(() => expect(screen.getByText("Error loading user data.")).toBeInTheDocument());
  });

  it("navigates to user profile on click", async () => {
    render(<UserCard userId="1" />);
    await waitFor(() => expect(screen.getByText(mockUser.username)).toBeInTheDocument());
    fireEvent.click(screen.getByText(mockUser.username));
    expect(mockNavigate).toHaveBeenCalledWith(`/profile/${mockUser.id}`);
  });

  it("renders avatar placeholder if no image is provided", async () => {
    const mockUserWithoutImage = { ...mockUser, image: null };
    ProfileService.fetchUserById.mockResolvedValue(mockUserWithoutImage);
    render(<UserCard userId="1" />);
    await waitFor(() => expect(screen.getByText(mockUserWithoutImage.username)).toBeInTheDocument());
    expect(screen.getByText(mockUserWithoutImage.username.charAt(0).toUpperCase())).toBeInTheDocument();
  });
});