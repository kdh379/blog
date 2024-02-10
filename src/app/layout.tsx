import "./globals.css";

import type { Metadata } from "next";

import Providers from "@/components/Provider";

const description = "프론트엔드 개발자 김도현의 블로그입니다.";

export const metadata: Metadata = {
  title: {
    template: "$s | GomBandalBlog",
    default: "GomBandal Blog",
  },
  description,
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
      <meta name="description" content={description} />
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
