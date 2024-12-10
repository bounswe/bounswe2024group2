module.exports = {
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest', // Transform JS, JSX, TS, and TSX files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    testEnvironment: 'jsdom', // Simulates a browser-like environment
  };
