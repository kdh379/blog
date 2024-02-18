"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { getPostTree, PostTree } from "@/lib/post";
import { cn } from "@/lib/utils";
import { sidebarVisibleAtom } from "@/store/atom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem ({ href, children }: NavItemProps) {

  const pathname = usePathname();
  const setOpen = useSetRecoilState(sidebarVisibleAtom);

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={cn(
        "text-muted-foreground flex w-full text-sm hover:underline",
        decodeURIComponent(pathname) === href && "text-primary font-bold"
      )}
    >
      {children}
    </Link>
  );
};

interface TreeProps {
  postTree: PostTree;
}

function Tree({postTree}: TreeProps) {
  return postTree.length && (
    <ul className="flex flex-col gap-y-2">
      {postTree.map((post, index) => (
        <li key={index}>
          { post.slug &&(
            <NavItem
              href={post.slug}
            >
              {post.title}
            </NavItem>
          )}
          { post.category && post.children?.length && (
            <Accordion type="multiple">
              <AccordionItem value={post.category}>
                <AccordionTrigger className="mb-2 py-0 text-sm">{post.category}</AccordionTrigger>
                <AccordionContent className="py-1 pl-3">
                  <Tree postTree={post.children} />
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
      <Tree postTree={postTree} />
    </nav>
  );
}