import type { StorybookConfig } from "@storybook/nextjs";

const path = require("path");

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "msw-storybook-addon"
  ],
  features: { experimentalRSC: true },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    "../public",
    {
      from: "../public/fonts",
      to: "/public/fonts",
    }
  ],
  webpackFinal: async (config) => {
    if(!config.resolve) return config;

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      "contentlayer/generated": path.resolve(__dirname, "../.contentlayer/generated"),
    }
    
    return config;
  },
};
export default config;
