const base = require("@repo/ui/tailwind.config");
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    ...base.content,
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
};