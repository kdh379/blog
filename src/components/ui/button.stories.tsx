import { Meta, StoryObj } from "@storybook/react";
import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "./button";

const variants: VariantProps<typeof buttonVariants>["variant"][] = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
];

const sizes: VariantProps<typeof buttonVariants>["size"][] = [
  "default",
  "sm",
  "lg",
  "icon",
];

const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: variants,
      control: {
        type: "radio",
      },
    },
    size: {
      options: sizes,
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Example Button",
  },
};