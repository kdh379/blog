/** @type {import("eslint").Linter.Config} */
module.exports = {
  // 플러그인 문서
  // https://www.npmjs.com/package/eslint-plugin-import
  // https://typescript-eslint.io/
  plugins: [
    "import",
    "@typescript-eslint",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json"
      },
      node: {
        extensions: [".ts", ".tsx"]
      }
    }
  },
  rules: {
    // 코드 스타일
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "no-trailing-spaces": "error",
    "comma-spacing": ["error", { "before": false, "after": true }],
    "block-spacing": ["error", "always"],
    "semi-spacing": "error",
    "key-spacing": ["error", {
      afterColon: true,
      beforeColon: false
    }],
    "arrow-parens": ["warn", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],

    // import 순서 정렬
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]], // 그룹핑 순서
        "newlines-between": "always" // 그룹 사이에 빈 줄 추가 여부
      }
    ],
    
    // 사용하지 않는 변수 체크
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "_.*",
        "argsIgnorePattern": "_.*",
        "args": "none"
      }
    ],

    // console.warn, console.error만 허용
    "no-console": ["error", {
      "allow": ["warn", "error"]
    }],

    // Typescript에서는 no-undef 해제를 권장함
    "no-undef": "off", //@see https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors

    // @ts- 주석 사용 허용
    "@typescript-eslint/ban-ts-comment": "off",
  }
}