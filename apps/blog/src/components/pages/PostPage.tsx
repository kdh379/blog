import { TableOfContents } from "@blog/components/post/toc";
import { getTableOfContents } from "@blog/lib/toc";
import { Badge } from "@repo/ui/components/ui/badge";
import Mdx from "@repo/ui/components/ui/mdx-components";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Post } from "contentlayer/generated";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import readingTime from "reading-time";

interface PostPageProps extends Post {}

export default async function PostPage(props: PostPageProps) {

  const toc = await getTableOfContents(props.body.raw);

  return <main className="relative mt-mobileHeader mobile:mt-0 py-6 desktop:grid desktop:grid-cols-[1fr_300px] desktop:gap-10">
    <div className="w-full min-w-0 mx-auto space-y-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {props.title}
        </h1>
        <div className="space-y-2 text-muted-foreground">
          {props.description && (
            <p className="text-lg">
              {props.description}
            </p>
          )}
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 size-4" />
            <time dateTime={props.date}>
              {dayjs(props.date).locale("ko").format("YYYY년 M월 D일")}
            </time>
            <Clock className="ml-4 mr-2 size-4" />
            <span>
              {Math.ceil(readingTime(props.body.raw).minutes)}분
            </span>
          </div>
        </div>
      </div>
      <section>
        {props.tags && props.tags.map(tag => (
          <Badge key={tag} variant="outline" className="mb-2 mr-2 text-sm">
            {tag}
          </Badge>
        ))}
      </section>
      <article className="slide-enter-content">
        <Mdx
          code={props.body.code}
        />
      </article>
    </div>
    <aside className="hidden text-sm desktop:block">
      <div className="sticky top-16">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <TableOfContents toc={toc} />
        </ScrollArea>
      </div>
    </aside>
  </main>;
}

export function PageSkeleton() {
  return (
    <div className="py-6 desktop:gap-10 desktop:grid desktop:grid-cols-[1fr_300px]">
      <article>
        <h1 className="space-y-4">
          <Skeleton className="w-3/4 h-10" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/3 h-4" />
        </h1>
        <section className="mt-6 space-y-2">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </section>
      </article>
      <aside className="space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </aside>
    </div>
  );
}