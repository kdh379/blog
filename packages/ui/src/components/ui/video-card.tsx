

import { VideoIcon } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import * as React from "react";
import { cn } from "@ui/lib/utils";
import api from "@ui/lib/api";

import FallbackEmpty from "../template/fallback-empty";

interface VideoCardProps {
  href: string;
}

export default async function VideoCard({ href }: VideoCardProps) {

  return (
    <div className="mt-4 flex flex-col gap-y-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className={cn(
          "font-medium underline underline-offset-4 transition-colors hover:text-primary"
        )}
        >
          {href}
        </p>
      </a>
      <ErrorBoundary errorComponent={FallbackEmpty}>
        <div className="aspect-video">
          <React.Suspense
            fallback={(
              <div className="flex animate-pulse items-center justify-center rounded-md bg-muted">
                <VideoIcon className="size-1/2 text-muted-foreground" />
              </div>
            )}
          >
            <Component href={href} />
          </React.Suspense>
        </div>
      </ErrorBoundary>
    </div>
  );
}

async function Component({ href }: VideoCardProps) {
  const openGraph = await api({
    key: "getOpenGraph",
    params: { url: href },
  });

  return (
    openGraph?.ogVideo?.length && (
      <iframe
        title={openGraph?.ogTitle || "Video"}
        src={openGraph?.ogVideo}
        className="size-full rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  );
}
