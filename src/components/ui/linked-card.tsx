"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { Button } from "./button";


interface LinkCardProps {
  href: string;
  title?: string;
}

export default function LinkedCard({ href, title }: LinkCardProps) {

  const {
    data:openGraph,
    isLoading,
  } = useQuery({
    queryKey: ["getOpenGraph", { href }],
    queryFn: () => api({
      key: "getOpenGraph",
      params: { url: href },
    }),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return <>
    <Button
      variant="link"
      className="hover:text-primary pl-0"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title || href}
      </a>
    </Button>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-muted/50 hover:bg-muted/100 mobile:h-32 mb-4 flex h-24 rounded-md border transition-colors active:opacity-50"
    >
      {isLoading && <div className="bg-accent h-full animate-pulse" />}
      {openGraph?.ogImage?.length && (
        <div
          style={{
            backgroundImage: `url(${openGraph?.ogImage[0].url})`,
            aspectRatio: "1 / 1",
          }} 
          className="mobile:w-32 left-0 top-0 w-24 rounded-l-md bg-cover bg-center" />
      )}
      <div className="mobile:p-4 flex flex-col overflow-hidden p-2">
        <p className="w-full overflow-hidden text-ellipsis text-nowrap text-lg font-medium">
          {openGraph?.ogTitle}
        </p>
        <p className="text-muted-foreground mobile:line-clamp-2 line-clamp-1 overflow-hidden text-ellipsis text-sm">
          {openGraph?.ogDescription}
        </p>
        <p className="text-primary mt-auto text-sm font-medium underline underline-offset-4">
          {href}
        </p>
      </div>
    </a>
  </>;
}