import { allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: dayjs().tz().format(),
    },
    ...allPosts.map((post) => ({
      url: `${siteConfig.url}/${post.slugAsParams}`,
      lastModified: dayjs(post.date).tz("Asia/Seoul").format(),
    })),
  ];
}