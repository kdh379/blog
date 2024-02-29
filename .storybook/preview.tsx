import type { Preview } from "@storybook/react";
import Providers from "../src/components/Provider";
import * as React from "react";

import { initialize, mswLoader } from "msw-storybook-addon";

import "@/app/globals.css";
import "./font-face.css";

initialize({onUnhandledRequest: "bypass"});

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ]
};

export default preview;
