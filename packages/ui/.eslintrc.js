/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/common.js",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    "node_modules/",
  ],
};
