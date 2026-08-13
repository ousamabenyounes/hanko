/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["require"],
  },
  moduleNameMapper: {
    "\\.sass$": "<rootDir>/tests/styleMock.cjs",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  coverageProvider: "v8",
};
