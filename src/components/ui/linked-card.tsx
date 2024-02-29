
import api from "@/lib/api";

import { Button } from "./button";

interface LinkCardProps {
  href: string;
  title?: string;
}

export default async function LinkedCard({ href, title }: LinkCardProps) {

  const openGraph = await api({
    key: "getOpenGraph",
    params: { url: href },
    next: {
      revalidate: 1000 * 60 * 60 * 24,
    },
  });

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
    <a
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
            className="mobile:w-32 left-0 top-0 w-24 rounded-l-md bg-cover bg-center" />
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
    </a>
  </>;
}