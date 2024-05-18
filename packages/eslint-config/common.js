const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended"
  ],
  plugins: [
    "simple-import-sort",
    "unused-imports",
    "tailwindcss"
  ],
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.js"
    },
    next: {
      rootDir: ["./src/"]
    }
  },
  rules: {
    // Code style
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "never",
      exports: "never",
      functions: "never"
    }],
    "comma-spacing": ["error", { before: false, after: true }],
    "no-console": "warn",
    "tailwindcss/no-custom-classname": "off",

    // import / export
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports-ts": ["error"],

    // React
    "react/react-in-jsx-scope": 0,
    "react/jsx-first-prop-new-line": "error",
    "react/self-closing-comp": ["error", {
      component: true,
      html: true
    }],
    "react/no-unknown-property": ["error", { ignore: ["cmdk-input-wrapper"] }],
    "react/prop-types": [2, { ignore: ["className", "align", "sideOffset", "orientation", "decorative"] }] // https://github.com/shadcn-ui/ui/issues/120
  }
}

