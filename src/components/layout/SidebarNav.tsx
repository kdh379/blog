"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { getPostTree, PostTree } from "@/lib/post";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

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
        "text-muted-foreground mb-2 flex w-full text-sm hover:underline",
        decodeURIComponent(pathname) === href && "text-primary font-bold"
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