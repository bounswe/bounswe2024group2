module.exports = {
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest', // Transform JS, JSX, TS, and TSX files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    testEnvironment: 'jest-environment-jsdom', // Simulates a browser-like environment
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}", // Adjust the pattern to match your project structure
      "!src/**/*.test.{js,jsx,ts,tsx}", // Exclude test files
      "!src/serviceWorker.js", // Exclude specific files if needed
      "!src/index.js" // Exclude specific files if needed
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov"],
  };
