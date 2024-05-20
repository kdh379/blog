import "@repo/ui/globals.css";

import AppHeader from "@blog/components/layout/AppHeader";
import Sidebar from "@blog/components/layout/Sidebar";
import Spotlights from "@blog/components/layout/Spotlights";
import Providers from "@repo/ui/components/Provider";
import { cn } from "@repo/ui/lib/utils";
import { siteConfig } from "@repo/ui/site.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: "kdh379",
  openGraph: {
    title: {
      template: `%s | ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.image,
        width: 500,
        height: 500,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="description" content={siteConfig.description} />
      <body className={cn(pretendard.className, "relative antialiased transition ease-in-out overflow-x-clip")}>
        <Providers>
          <AppHeader />
          <Spotlights />
          <div className={cn(
            "container min-h-screen flex-1 px-8 antialiased tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 desktop:pl-[calc(100vw-100.55%)] desktop:pr-0"
          )}>
            <Sidebar />
            <main className="flex flex-col pt-mobileHeader mobile:pt-0">{children}</main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
