import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import CopyButton from "./copy-button";

const meta = {
  title: "ui/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CopyButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Copy String",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Event
    const button = canvas.getByRole("button");
    userEvent.click(button);
    await canvas.findByText("복사되었습니다.");

    // Clipboard
    expect(await navigator.clipboard.readText()).toBe("Copy String");
  },
};