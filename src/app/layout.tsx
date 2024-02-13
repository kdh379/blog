import "./globals.css";

import type { Metadata } from "next";

import Providers from "@/components/Provider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "Frontend",
    "블로그",
  ],
  creator: "kdh379",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
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
    icon: "/svg/favicon.svg",
    shortcut: "/svg/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link
        rel="shortcut icon"
        href="/svg/favicon.svg"
      />
      <link
        rel="stylesheet preload"
        as="style"
        crossOrigin="anonymous"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
      />
      <meta name="description" content={siteConfig.description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
