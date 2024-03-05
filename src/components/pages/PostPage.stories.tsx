import { Meta, StoryObj } from "@storybook/react";
import { allPosts } from "contentlayer/generated";

import Layout from "../Layout";
import PostPage from "./PostPage";

const meta = {
  title: "pages/PostPage",
  component: PostPage,
  decorators: [
    (Story) => <Layout><Story /></Layout>,
  ],
} satisfies Meta<typeof PostPage>;
export default meta;

type Story = StoryObj<typeof meta>;

const post = allPosts.find((post) => post.slug === "/__test/mdx-example");

if(!post) {
  throw new Error("No post found");
}

export const Default: Story = {
  args: post,
};