
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";

import { getTableOfContents } from "@/lib/toc";

import { TableOfContents } from "../post/toc";
import { Badge } from "../ui/badge";
import Mdx from "../ui/mdx-components";
import { ScrollArea } from "../ui/scroll-area";

interface PostPageProps extends PostMatter {

}

export default async function PostPage(props: PostPageProps) {

  const toc = await getTableOfContents(props.content);

  return <main className="tablet:grid tablet:grid-cols-[1fr_300px] tablet:gap-10 relative py-6">
    <div>
      <h1 className="mb-4 scroll-m-20 text-4xl font-bold tracking-tight">
        {props.title}
      </h1>
      <div className="text-muted-foreground space-y-2">
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
          <Clock className="ml-auto mr-2 size-4" />
          <span>
            {props.readingTime}분
          </span>
        </div>
      </div>
      <div className="pb-12 pt-8">
        <Mdx
          source={props.content}
        />
      </div>
      {props.tags && props.tags.map(tag => (
        <Badge key={tag} variant="outline" className="mb-2 mr-2 text-sm">
          {tag}
        </Badge>
      ))}
    </div>
    <div className="tablet:block hidden text-sm">
      <div className="sticky top-16">
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <TableOfContents toc={toc} />
        </ScrollArea>
      </div>
    </div>
  </main>;
}