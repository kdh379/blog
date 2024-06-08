/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/.eslintrc.next.js",
  ],
  parser: "@typescript-eslint/parser",
};
