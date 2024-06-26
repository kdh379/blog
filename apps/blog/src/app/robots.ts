import { siteConfig } from "@repo/ui/site.config";
import { MetadataRoute } from "next";



export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}