import type { Preview } from "@storybook/react";
import "@repo/ui/globals.css";
import "./font-face.css";
import { initialize, mswLoader } from 'msw-storybook-addon'
import Providers from "@repo/ui/components/providers";



import React from "react";

initialize();

const preview: Preview = {
  parameters: {
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
    )
  ],
  loaders: [mswLoader],
};

export default preview;
