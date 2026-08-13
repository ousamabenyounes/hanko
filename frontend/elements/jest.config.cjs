/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment:
    "<rootDir>/../frontend-sdk/node_modules/jest-environment-jsdom/build/index.js",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^preact$": "<rootDir>/../node_modules/preact/dist/preact.js",
    "^preact/compat$":
      "<rootDir>/../node_modules/preact/compat/dist/compat.js",
    "^preact/hooks$":
      "<rootDir>/../node_modules/preact/hooks/dist/hooks.js",
    "^preact/jsx-runtime$":
      "<rootDir>/../node_modules/preact/jsx-runtime/dist/jsxRuntime.js",
    "\\.sass$": "<rootDir>/tests/styleMock.cjs",
  },
};
