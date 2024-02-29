import { Meta, StoryObj } from "@storybook/react";

import Layout from "@/components/Layout";

import Home from "../../app/page";

const meta = {
  title: "page/Home",
  component: Home,
  decorators: [
    (Story) => (
      <Layout>
        <Story />
      </Layout>
    ),
  ],
} satisfies Meta<typeof Home>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};