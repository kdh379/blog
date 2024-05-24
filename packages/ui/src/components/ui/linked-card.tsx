
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
      className="justify-start w-full p-0"
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
      <div className="flex h-24 mb-4 overflow-hidden transition-colors border rounded-md bg-muted mobile:h-32">
        <React.Suspense
          fallback={
            <div
              className="flex w-full animate-pulse"
              role="status"
            >
              <div className="flex items-center justify-center w-24 rounded-l-md bg-muted-foreground/50 mobile:w-32">
                <ImageIcon />
              </div>
              <div className="flex flex-col flex-1 p-2 flx-1 mobile:p-4">
                <div className="w-3/4 h-4 rounded bg-muted-foreground/50" />
                <div className="w-full h-4 mt-2 rounded bg-muted-foreground/50" />
                <div className="w-3/4 h-4 mt-auto rounded bg-muted-foreground/50" />
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
  });

  console.log(openGraph?.data);

  return <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full hover:bg-muted active:opacity-50"
  >
    <textarea>
      {openGraph?.data}
    </textarea>
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
      <div className="flex flex-col flex-1 p-2 overflow-hidden mobile:p-4">
        <p className="text-lg font-medium line-clamp-1">
          {openGraph?.ogTitle}
        </p>
        <p className="text-sm line-clamp-1 text-muted-foreground mobile:line-clamp-2">
          {openGraph?.ogDescription}
        </p>
        <p className="mt-auto text-sm font-medium underline line-clamp-1 text-primary underline-offset-4">
          {href}
        </p>
      </div>
    </div>
  </a>;
}