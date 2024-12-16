import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import '@testing-library/jest-dom'

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

describe("Dashboard Component", () => {
  test("renders Sign In and Register buttons when not logged in", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test("renders user information and Sign Out button when logged in", () => {
    localStorage.setItem("accessToken", "mockToken");
    localStorage.setItem("userName", "TestUser");

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test("renders dark mode toggle button", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /sun|moon/i })).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Community/i)).toBeInTheDocument();
    expect(screen.getByText(/Markets/i)).toBeInTheDocument();
    expect(screen.getByText(/News/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });
});
