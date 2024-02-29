
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  href: string;
}

export default async function VideoCard({ href }: VideoCardProps) {

  const openGraph = await api({
    key: "getOpenGraph",
    params: { url: href },
  });

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
        {openGraph?.ogTitle}
      </p>
    </a>
    <div className="bg-muted/50 relative aspect-video rounded-md pb-[56.25%]">
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