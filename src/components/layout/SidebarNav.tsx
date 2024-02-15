"use client";

import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { cn } from "@/lib/utils";
import { sidebarVisibleAtom } from "@/store/atom";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface NavItemProps {
  href: string;
  pathname: string;
  children: React.ReactNode;
}

interface GroupedPost {
  [key: string]: Post | GroupedPost;
}

function NavItem ({ href, pathname, children }: NavItemProps) {

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

function groupBySlug(posts: Post[]) {
  return posts.filter((post) => post.slug.startsWith("/posts")).reduce((acc, post) => {
    const slugParts = post.slug.split("/").slice(2);

    if( slugParts.length === 0 ) 
      return acc;

    const groupByLevel = (group: GroupedPost, level: number) => {
      if( !group[slugParts[level]] ) {
        group[slugParts[level]] = level === slugParts.length - 1 ? post : {};
      }

      if( level < slugParts.length - 1 )
        groupByLevel(group[slugParts[level]] as GroupedPost, level + 1);
    };

    groupByLevel(acc, 0);

    return acc;
  }, {} as GroupedPost);
}

function isPost(post: Post | GroupedPost): post is Post {
  return (post as Post).title !== undefined;
}

interface PostNavProps {
  groupedPost: Post | GroupedPost;
  pathname: string;
  category: string;

}

function PostNav( {groupedPost, pathname, category}: PostNavProps) {
  if( isPost(groupedPost) ) {
    return (
      <NavItem href={groupedPost.slug} pathname={pathname}>
        {groupedPost.title}
      </NavItem>
    );
  }
  
  return <Accordion type="multiple">
    <AccordionItem value={category}>
      <AccordionTrigger className="mb-2 py-0 text-sm">
        {category}
      </AccordionTrigger>
      <ul>
        {Object.entries(groupedPost).map(([key, post]) => (
          <li key={key}>
            <AccordionContent  className="py-1 pl-3">
              <PostNav groupedPost={post} pathname={pathname} category={key} />
            </AccordionContent>
          </li>
        ))}
      </ul>
    </AccordionItem>
  </Accordion>;
}

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1">
      <ul className="flex flex-col gap-y-2">
        <li>
          <NavItem href="/resume" pathname={pathname}>
            Resume
          </NavItem>
        </li>
        {
          Object.entries(groupBySlug(allPosts)).map(([category, post]) => (
            <li key={category}>
              <PostNav groupedPost={post} pathname={pathname} category={category} />
            </li>
          ))
        }
      </ul>
    </nav>
  );
}