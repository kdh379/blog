import { siteConfig } from "@repo/ui/site.config";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { MetadataRoute } from "next";

import { allPosts } from "contentlayer/generated";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: dayjs().tz("Asia/Seoul").format(),
    },
    ...allPosts.map((post) => ({
      url: `${siteConfig.url}/${post.slugAsParams}`,
      lastModified: dayjs(post.date).tz("Asia/Seoul").format(),
    })),
  ];
}