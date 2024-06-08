const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");
const twConfig = resolve(process.cwd(), "packages/ui/tailwind.config.ts");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  // 플러그인 문서
  // https://github.com/jsx-eslint/eslint-plugin-react
  // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
  // https://www.npmjs.com/package/eslint-plugin-tailwindcss
  plugins: [
    "react",
    "jsx-a11y",
    "tailwindcss"
  ],
  extends: [
    "./.eslintrc.base.js",
    "eslint-config-turbo",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended"
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {
      version: "18.3.1",
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
    tailwindcss: {
      callees: ["cn"],
      config: twConfig
    },
    "import/resolver": {
      typescript: {
        project,
      },
    },
    ignorePatterns: [
      // Ignore dotfiles
      ".*.js",
      "node_modules/",
      "dist/",
    ],
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    // <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크
    "jsx-a11y/alt-text": [
      "warn",
      {
        "elements": ["img"]
      }
    ],
    // 유효한 aria-* 속성만 사용
    "jsx-a11y/aria-props": "warn",
    // 유효한 aria-* 상태/값만 사용
    "jsx-a11y/aria-proptypes": "warn",
    // DOM에서 지원되는 role, ARIA만 사용
    "jsx-a11y/aria-unsupported-elements": "warn",
    // 필수 ARIA 속성이 빠져있는지 체크
    "jsx-a11y/role-has-required-aria-props": "warn",
    // ARIA 속성은 지원되는 role에서만 사용
    "jsx-a11y/role-supports-aria-props": "warn",

    // import React from 'react'; 를 사용하지 않아도 되도록 설정
    "react/react-in-jsx-scope": 0,
    // JSX에서 prop의 첫 번째 줄에 새 줄을 요구
    "react/jsx-first-prop-new-line": "error",
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
      }],
    // DOM에 정의되지 않은 속성 사용 체크
    "react/no-unknown-property": ["error", {
      "ignore": ["cmdk-input-wrapper"]
    }],
    // JSX가 여러줄로 이루어진 경우, 괄호로 감싸도록 설정
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line"
      }
    ],
    // 정의되지 않은 prop 사용 체크 ( 기본적으로 typescript에서 체크하므로 off )
    "react/prop-types": "off", // https://github.com/shadcn-ui/ui/issues/120

    // Tailwind 사용시 커스텀 클래스명 사용 체크
    "tailwindcss/no-custom-classname": "off",
  }
};