
import { ImageIcon } from "lucide-react";
import React from "react";

import api from "@/lib/api";

import { Button } from "./button";

interface LinkCardProps {
  href: string;
  title?: string;
}

export default function LinkedCard({href, title}: LinkCardProps) {

  return <>
    <Button
      variant="link"
      className="w-full justify-start p-0"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary line-clamp-1"
      >
        {title || href}
      </a>
    </Button>
    <React.Suspense
      fallback={
        <div className="bg-muted/50 mobile:h-32 mb-4 flex animate-pulse rounded-md border">
          <div className="mobile:w-32 bg-muted flex w-24 items-center justify-center rounded-l-md">
            <ImageIcon />
          </div>
          <div className="mobile:p-4 flex flex-1 flex-col p-2">
            <div className="bg-muted/100 h-4 w-3/4 rounded" />
            <div className="bg-muted/100 mt-2 h-4 w-full rounded" />
            <div className="bg-muted/100 mt-auto h-4 w-3/4 rounded" />
          </div>
        </div>
      }
    >
      <Component href={href} />
    </React.Suspense>
  </>;
}

async function Component({ href }: LinkCardProps) {
  const openGraph = await api({
    key: "getOpenGraph",
    params: { url: href },
    next: {
      revalidate: 1000 * 60 * 60 * 24,
    },
  });

  return <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-muted/50 hover:bg-muted/100 mobile:h-32 mb-4 flex h-24 rounded-md border transition-colors active:opacity-50"
  >
    <div className="flex overflow-hidden">
      {openGraph?.ogImage?.length && (
        <div
          style={{
            backgroundImage: `url(${openGraph?.ogImage[0].url})`,
            aspectRatio: "1/1",
          }} 
          className="mobile:w-32 left-0 top-0 w-24 rounded-l-md bg-[length:8rem_100%] bg-no-repeat"/>
      )}
      <div className="mobile:p-4 flex flex-1 flex-col overflow-hidden p-2">
        <p className="line-clamp-1 text-lg font-medium">
          {openGraph?.ogTitle}
        </p>
        <p className="text-muted-foreground mobile:line-clamp-2 line-clamp-1 text-sm">
          {openGraph?.ogDescription}
        </p>
        <p className="text-primary mt-auto line-clamp-1 text-sm font-medium underline underline-offset-4">
          {href}
        </p>
      </div>
    </div>
  </a>;
}