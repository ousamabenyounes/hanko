/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "CommonJS",
          jsx: "react-jsx",
        },
      },
    ],
  },
  moduleNameMapper: {
    "^preact/jsx-runtime$":
      "<rootDir>/../node_modules/preact/jsx-runtime/dist/jsxRuntime.umd.js",
    "^preact$": "<rootDir>/../node_modules/preact/dist/preact.js",
    "^preact/compat$":
      "<rootDir>/../node_modules/preact/compat/dist/compat.umd.js",
    "^preact/hooks$":
      "<rootDir>/../node_modules/preact/hooks/dist/hooks.umd.js",
    "\\.sass$": "<rootDir>/tests/styleMock.cjs",
  },
};
