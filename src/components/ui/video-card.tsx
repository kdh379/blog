
import { VideoIcon } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import * as React from "react";

import api from "@/lib/api";
import { cn } from "@/lib/utils";

import FallbackEmpty from "../template/fallback-empty";

interface VideoCardProps {
  href: string;
}

export default async function VideoCard({ href }: VideoCardProps) {

  return <div className="mt-4 flex flex-col gap-y-2">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className={cn(
        "hover:text-primary font-medium underline underline-offset-4 transition-colors"
      )}
      >
        {href}
      </p>
    </a>
    <ErrorBoundary errorComponent={FallbackEmpty}>
      <div className="aspect-video">
        <React.Suspense 
          fallback={
            <div className="bg-muted flex animate-pulse items-center justify-center rounded-md">
              <VideoIcon className="text-muted-foreground size-1/2" />
            </div>
          }
        >
          <Component href={href} />
        </React.Suspense>
      </div>
    </ErrorBoundary>
  </div>;
}

async function Component({ href }: VideoCardProps) {
  const openGraph = await api({
    key: "getOpenGraph",
    params: { url: href },
  });

  return (
    openGraph?.ogVideo?.length && 
    <iframe
      title={openGraph?.ogTitle || "Video"}
      src={openGraph?.ogVideo?.[0]?.url}
      className="size-full rounded-md"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};
