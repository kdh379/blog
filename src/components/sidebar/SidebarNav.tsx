"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";



interface NavItemProps {
  href: string;
  pathname: string;
  children: React.ReactNode;
}

interface GroupedPost {
  [key: string]: PostMatter | GroupedPost;
}

const NavItem = ({ href, pathname, children }: NavItemProps) => (
  <Link
    href={href}
    className={cn(
      "text-muted-foreground text-sm hover:underline",
      pathname === href && "text-primary font-bold"
    )}
  >
    {children}
  </Link>
);

function groupBySlug(postList: PostMatter[]) {
  return postList.reduce((acc, post) => {
    const slugParts = post.slug.split("/");

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

function isPostMatter(post: PostMatter | GroupedPost): post is PostMatter {
  return (post as PostMatter).title !== undefined;
}

interface SidebarNavProps {
  postList: PostMatter[];
}

interface PostNavProps {
  groupedPost: PostMatter | GroupedPost;
  pathname: string;
  category: string;

}

function PostNav( {groupedPost, pathname, category}: PostNavProps) {
  if( isPostMatter(groupedPost) ) {
    return (
      <li>
        <NavItem href={`/posts/${groupedPost.slug}`} pathname={pathname}>
          {groupedPost.title}
        </NavItem>
      </li>
    );
  }
  
  return <Accordion type="multiple">
    <AccordionItem value={category}>
      <AccordionTrigger className="mb-2 py-0 text-sm">
        {category}
      </AccordionTrigger>
      {Object.entries(groupedPost).map(([key, post]) => (
        <AccordionContent key={key} className="py-1 pl-3">
          <PostNav groupedPost={post} pathname={pathname} category={key} />
        </AccordionContent>
      ))}
    </AccordionItem>
  </Accordion>;
}

export default function SidebarNav( {postList}: SidebarNavProps ) {
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
          Object.entries(groupBySlug(postList)).map(([category, post]) => (
            <PostNav key={category} groupedPost={post} pathname={pathname} category={category} />
          ))
        }
      </ul>
    </nav>
  );
}