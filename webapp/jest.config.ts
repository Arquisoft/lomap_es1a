module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/"
  ],  
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  testMatch: [
    "<rootDir>/src/**/*.test.{ts,tsx}"
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleDirectories: ["node_modules", "src"]
};

