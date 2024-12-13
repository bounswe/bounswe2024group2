import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CommunityPage from "../components/CommunityPage";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("CommunityPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders main elements", () => {
    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Explore Community/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Find out ideas, analysis on the finance world/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Create A Post/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search posts.../i)).toBeInTheDocument();
  });

  test("fetches and displays posts from the API", async () => {
    const mockApiResponse = {
      data: [
        {
          id: 1,
          title: "Test Post 1",
          content: "This is the content of post 1",
          author: { username: "Author1" },
          liked_by: [1, 2],
          tags: ["Tag1", "Tag2"],
          created_at: "2024-11-24T12:00:00Z",
        },
      ],
    };

    axios.get.mockResolvedValueOnce(mockApiResponse);

    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Author1/i)).toBeInTheDocument();
      expect(screen.getByText(/Tag1/i)).toBeInTheDocument();
      expect(screen.getByText(/Tag2/i)).toBeInTheDocument();
    });
  });

  test("renders fallback mock posts if API call fails", async () => {
    const mockPosts = [
      { title: "Mock Post 1", "post-id": 1, likes: 5 },
      { title: "Mock Post 2", "post-id": 2, likes: 10 },
    ];

    axios.get.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });

  test("toggles the search bar active state", () => {
    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Search posts.../i);

    fireEvent.focus(searchInput);
    expect(searchInput.closest(".search-container")).toHaveClass("active");

    fireEvent.blur(searchInput);
    expect(searchInput.closest(".search-container")).not.toHaveClass("active");
  });

  test("navigates to Create Post page when button clicked", () => {
    const mockedNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockedNavigate,
    }));

    render(
      <MemoryRouter>
        <CommunityPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Create A Post/i));
    expect(mockedNavigate).toHaveBeenCalledWith("/community/create-post");
  });
});
