import { allPosts } from "contentlayer/generated";
import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  siteConfig.url,
  ...allPosts.map((post) => `${siteConfig.url}/${post.slugAsParams}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({url: route}));
}