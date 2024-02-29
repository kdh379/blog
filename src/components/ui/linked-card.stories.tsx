import { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import LinkedCard from "./linked-card";

const meta = {
  title: "ui/LinkedCard",
  component: LinkedCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LinkedCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    href: "https://blog.bandal.dev",
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};