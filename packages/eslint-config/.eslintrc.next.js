const { resolve } = require("node:path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "./.eslintrc.react.js",
    "next/core-web-vitals",
    require.resolve("@vercel/style-guide/eslint/next"),
  ],
  settings: {
    "next": {
      "rootDir": "./src"
    }
  },
};