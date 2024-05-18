
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
        className="line-clamp-1 hover:text-primary"
      >
        {title || href}
      </a>
    </Button>
    <ErrorBoundary errorComponent={FallbackEmpty}>
      <div className="mb-4 flex h-24 overflow-hidden rounded-md border bg-muted transition-colors mobile:h-32">
        <React.Suspense
          fallback={
            <div
              className="flex w-full animate-pulse"
              role="status"
            >
              <div className="flex w-24 items-center justify-center rounded-l-md bg-muted-foreground/50 mobile:w-32">
                <ImageIcon />
              </div>
              <div className="flx-1 flex flex-1 flex-col p-2 mobile:p-4">
                <div className="h-4 w-3/4 rounded bg-muted-foreground/50" />
                <div className="mt-2 h-4 w-full rounded bg-muted-foreground/50" />
                <div className="mt-auto h-4 w-3/4 rounded bg-muted-foreground/50" />
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
    className="w-full hover:bg-muted active:opacity-50"
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
      <div className="flex flex-1 flex-col overflow-hidden p-2 mobile:p-4">
        <p className="line-clamp-1 text-lg font-medium">
          {openGraph?.ogTitle}
        </p>
        <p className="line-clamp-1 text-sm text-muted-foreground mobile:line-clamp-2">
          {openGraph?.ogDescription}
        </p>
        <p className="mt-auto line-clamp-1 text-sm font-medium text-primary underline underline-offset-4">
          {href}
        </p>
      </div>
    </div>
  </a>;
}