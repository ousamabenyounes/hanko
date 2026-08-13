/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.sass$": "<rootDir>/tests/styleMock.cjs",
    "^preact$": "<rootDir>/../node_modules/preact/dist/preact.js",
    "^preact/compat$": "<rootDir>/../node_modules/preact/compat/dist/compat.js",
    "^preact/hooks$": "<rootDir>/../node_modules/preact/hooks/dist/hooks.js",
    "^preact/test-utils$":
      "<rootDir>/../node_modules/preact/test-utils/dist/testUtils.js",
    "^preact/jsx-runtime$":
      "<rootDir>/../node_modules/preact/jsx-runtime/dist/jsxRuntime.js",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { module: "commonjs" } }],
  },
};
