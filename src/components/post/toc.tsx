"use client";

import React from "react";

import type { TableOfContents } from "@/lib/toc";
import { cn } from "@/lib/utils";

const MAX_DEPTH = 3;

interface TocProps {
  toc: TableOfContents;
}

export function TableOfContents({ toc }: TocProps) {

  const itemIds = React.useMemo(() => {
    const findItems = (items: TableOfContents["items"], depth: number): string[] => {
      if( !items )
        return [];

      return items.flatMap((item) => {
        const urls = [item.url.split("#")[1]];
        if( depth < MAX_DEPTH )
          urls.push(...findItems(item.items, depth + 1));
        return urls;
      });
    };

    return findItems(toc.items, 1);
  }, [toc.items]);

  const activeItem = useActiveItem(itemIds);
  
  if( !toc.items )
    return null;
  

  return (
    <div>
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeItem}  />
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element)
        observer.observe(element);
    });

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);

        if (element)
          observer.unobserve(element);
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level <= MAX_DEPTH && (
    <ul className={cn(level !== 1 && "pl-4")}>
      {tree.items.map((item) => (
        <li key={item.url} className="pt-2">
          <a
            href={item.url}
            className={cn(
              "text-muted-foreground hover:text-foreground text-sm font-medium transition-colors",
              item.url === `#${activeItem}` && "text-primary font-medium"
            )}
          >
            {item.title}
          </a>
          {item.items?.length && (
            <Tree
              tree={item}
              level={level + 1}
              activeItem={activeItem}
            />
          )}
        </li>
      ))}
    </ul>
  );
}