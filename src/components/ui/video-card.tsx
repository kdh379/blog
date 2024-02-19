"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  href: string;
}

export default function VideoCard({ href }: VideoCardProps) {

  const {
    data: openGraph,
    isLoading,
  } = useQuery({
    queryKey: ["getOpenGraph", { href }],
    queryFn: () => api({
      key: "getOpenGraph",
      params: { url: href },
    }),
  });

  return <div className="mt-4 flex flex-col gap-y-2">
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {isLoading && <div className="bg-accent h-6 w-1/2 animate-pulse rounded-md" />}
      <p className={cn(
        "hover:text-primary font-medium underline underline-offset-4 transition-colors",
        isLoading && "bg-accent animate-pulse rounded-md"
      )}
      >
        {openGraph?.ogTitle}
      </p>
    </a>
    <div className="bg-muted/50 relative aspect-video rounded-md pb-[56.25%]">
      {isLoading && <div className="bg-accent absolute inset-0 animate-pulse rounded-md" /> }
      {openGraph?.ogVideo.length &&
        <iframe
          title={openGraph?.ogTitle || "Video"}
          src={openGraph?.ogVideo?.[0]?.url}
          className="absolute inset-0 size-full rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      }
    </div>
  </div>;
}