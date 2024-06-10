// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config/.eslintrc.react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
