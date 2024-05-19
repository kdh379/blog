/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/next.js",
    "@repo/eslint-config/rules.js"
  ],
  parser: "@typescript-eslint/parser",
};
