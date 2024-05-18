"use client";

import { getPostTree, PostTree } from "@blog/lib/post";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/ui/accordion";
import { cn } from "@repo/ui/lib/utils";
import { useSidebarStore } from "@repo/ui/store/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

interface PostNavProps {
  postTree: PostTree;
}

interface NavLinkProps {
  href: string;
}

function NavLink({ href, children }: PropsWithChildren<NavLinkProps>) {

  const pathname = usePathname();
  const setClose = useSidebarStore((state) => state.close);

  return <>
    <Link
      href={href}
      onClick={setClose}
      className={cn(
        "mb-2 flex w-full text-sm text-muted-foreground hover:underline",
        decodeURIComponent(pathname) === href && "font-bold text-primary"
      )}
    >
      {children}
    </Link>
  </>;
}

function PostNav({postTree}: PostNavProps) {
  return postTree.length && postTree.map((post, index) => (
    <React.Fragment key={index}>
      { post.slugAsParams &&(
        <NavLink href={post.slugAsParams}>
          {post.title}
        </NavLink>
      )}
      { post.category && post.children?.length && (
        <AccordionItem value={post.category}>
          <AccordionTrigger className="mb-2 py-0 text-sm">{post.category}</AccordionTrigger>
          <AccordionContent className="py-1 pl-2">
            <PostNav postTree={post.children} />
          </AccordionContent>
        </AccordionItem>
      ) }
    </React.Fragment>
  )
  );
}

export default function SidebarNav() {
  const postTree = getPostTree();

  return (
    <nav className="flex-1">
      <NavLink href="/resume">Resume</NavLink>
      <Accordion 
        type="multiple"
        defaultValue={postTree.map((post) => post.category || "")}
        className="flex flex-col gap-y-2"
      >
        <PostNav postTree={postTree} />
      </Accordion>
    </nav>
  );
}