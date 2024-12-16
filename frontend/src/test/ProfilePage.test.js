import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from '../components/profile/ProfilePage';
import UserService from '../service/userService';
import ProfileService from '../service/profileService';
import { toast } from 'react-toastify';

jest.mock('../service/userService');
jest.mock('../service/profileService');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ProfilePage", () => {
  const mockUserProfile = {
    id: '1',
    username: 'testuser',
    image: 'https://example.com/avatar.jpg',
    followers: [],
    following: [],
    posts: [],
    comments: [],
    badges: [],
    followersCnt: 10,
    followingCnt: 5,
    postsCnt: 3,
    commentsCnt: 2,
  };

  beforeEach(() => {
    UserService.getUserId.mockReturnValue('5');
    UserService.getUsername.mockReturnValue('testuserfollower');
    UserService.isLoggedIn.mockReturnValue(true);
    ProfileService.fetchProfileById.mockResolvedValue(mockUserProfile);
    ProfileService.isFollowing.mockResolvedValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to login if user is not logged in", () => {
    UserService.isLoggedIn.mockReturnValue(false);
    const { container } = render(
      <MemoryRouter initialEntries={['/profile/1']} future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.innerHTML).toMatch('Login Page');
  });

  it("renders loading state initially", () => {
    render(
      <MemoryRouter initialEntries={['/profile/1']} future={{ v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();
  });

  it("renders user profile after fetching", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/profile/1']} future={{ v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await waitFor(() => expect(screen.getByText(mockUserProfile.username)).toBeInTheDocument());
    expect(screen.getByText(`${mockUserProfile.followersCnt} Followers`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUserProfile.followingCnt} Following`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUserProfile.postsCnt} Posts`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUserProfile.commentsCnt} Comments`)).toBeInTheDocument();
  });

  it("renders list content based on selected tab", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/profile/1']} future={{ v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    await waitFor(() => expect(screen.getByText(mockUserProfile.username)).toBeInTheDocument());
    fireEvent.click(screen.getByText("Comments"));
    expect(screen.getByText("No comments available.")).toBeInTheDocument();
  });
});