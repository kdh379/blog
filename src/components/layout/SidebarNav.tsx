"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { getPostTree, PostTree } from "@/lib/post";
import { cn } from "@/lib/utils";
import { sidebarVisibleAtom } from "@/store/atom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface PostNavProps {
  postTree: PostTree;
}

function PostNav({postTree}: PostNavProps) {
  const pathname = usePathname();
  const setOpen = useSetRecoilState(sidebarVisibleAtom);

  return postTree.length && (
    <ul className="flex flex-col gap-y-2">
      {postTree.map((post, index) => (
        <li key={index}>
          { post.slug &&(
            <Link
              href={post.slug}
              onClick={() => setOpen(false)}
              className={cn(
                "text-muted-foreground flex w-full text-sm hover:underline",
                decodeURIComponent(pathname) === post.slug && "text-primary font-bold"
              )}
            >
              {post.title}
            </Link>
          )}
          { post.category && post.children?.length && (
            <Accordion type="multiple">
              <AccordionItem value={post.category}>
                <AccordionTrigger className="mb-2 py-0 text-sm">{post.category}</AccordionTrigger>
                <AccordionContent className="py-1 pl-3">
                  <PostNav postTree={post.children} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) }
        </li>
      ))}
    </ul>
  );
}

export default function SidebarNav() {
  const postTree = getPostTree();

  return (
    <nav className="flex-1">
      <PostNav postTree={postTree} />
    </nav>
  );
}