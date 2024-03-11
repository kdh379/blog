import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { handlers } from "@/mocks/handlers";

import LinkedCard from "./linked-card";

const meta = {
  title: "ui/LinkedCard",
  component: LinkedCard,
  parameters: {
    layout: "centered",
    msw: {
      handlers,
    },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Link
    const link = canvas.getByRole("link");
    expect(link).toHaveAttribute("href", "https://www.example.com");

    // API Response Mocked
    await canvas.findByText("A title Mocked");
    await canvas.findByText("A description Mocked");

    // Image
    const image = canvas.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle({ backgroundImage: "url(/images/placeholder.png);" });
  },
};

export const Loading: Story = {
  args: {
    title: "Title Example",
    href: "pending",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeleton = canvas.getByRole("status");
    expect(skeleton).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    title: "Title Example",
    href: "https://example.com/error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/error");

    expect(canvas.queryByText("A title Mocked")).not.toBeInTheDocument();
    expect(canvas.queryByText("A description Mocked")).not.toBeInTheDocument();
    expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};