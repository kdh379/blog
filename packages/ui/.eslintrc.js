/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/.eslintrc.react.js",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    "node_modules/",
  ],
};
