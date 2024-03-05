import { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import LinkedCard from "./linked-card";

const meta = {
  title: "ui/LinkedCard",
  component: LinkedCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkedCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title Example",
    href: "https://www.example.com",
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};

export const Loading: Story = {
  args: {
    title: "Title Example",
    href: "pending",
  },
  parameters: {
    msw: {
      handlers,
    },
  },
};