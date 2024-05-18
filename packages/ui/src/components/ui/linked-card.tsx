
import ImageWithFallback from "@ui/components/ui/image-with-fallback";
import api from "@ui/lib/api";
import { ImageIcon } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";

import FallbackEmpty from "../template/fallback-empty";
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
    <ErrorBoundary errorComponent={FallbackEmpty}>
      <div className="bg-muted mobile:h-32 mb-4 flex h-24 overflow-hidden rounded-md border transition-colors">
        <React.Suspense
          fallback={
            <div
              className="flex w-full animate-pulse"
              role="status"
            >
              <div className="mobile:w-32 bg-muted-foreground/50 flex w-24 items-center justify-center rounded-l-md">
                <ImageIcon />
              </div>
              <div className="mobile:p-4 flx-1 flex flex-1 flex-col p-2">
                <div className="bg-muted-foreground/50 h-4 w-3/4 rounded" />
                <div className="bg-muted-foreground/50 mt-2 h-4 w-full rounded" />
                <div className="bg-muted-foreground/50 mt-auto h-4 w-3/4 rounded" />
              </div>
            </div>
          }
        >
          <Component href={href} />
        </React.Suspense>
      </div>
    </ErrorBoundary>
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
    className="hover:bg-muted w-full active:opacity-50"
  >
    <div className="flex h-full">
      <ImageWithFallback
        src={openGraph?.ogImage || "/images/placeholder.png"}
        alt={openGraph?.ogTitle || href}
        fallbackSrc="/images/placeholder.png"
        width={300}
        height={300}
        quality={100}
        className="h-full w-32 rounded-l-md object-cover object-center transition-[width] hover:w-64"
      />
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