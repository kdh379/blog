"use client";

import Footer from "@blog/components/layout/Footer";
import PostsSearch from "@blog/components/layout/PostsSearch";
import SidebarNav from "@blog/components/layout/SidebarNav";
import ToggleTheme from "@blog/components/layout/ToggleTheme";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { siteConfig } from "@repo/ui/site.config";
import { useSidebarStore } from "@repo/ui/store/index";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

export default function Sidebar( {className}: SidebarProps ) {

  const setClose = useSidebarStore(state => state.close);

  return <>
    <aside className={cn(
      "tablet:flex tablet:flex-col tablet:sticky fixed top-8 hidden h-[calc(100vh-3.5rem)] shrink-0",
      className
    )}>
      <Link href="/" onClick={setClose}>
        <p className="text-2xl font-bold">{siteConfig.name}</p>
      </Link>
      <div className="relative my-4 w-32 after:block after:pb-[100%]">
        <Image
          src={siteConfig.image}
          alt="Profile Picture"
          className="absolute size-full rounded-full object-cover"
          width={150}
          height={150}
          priority
        />
      </div>
      <div className="mobile:flex hidden gap-x-2">
        <div className="flex-1">
          <PostsSearch />
        </div>
        <ToggleTheme />
      </div>
      <ScrollArea className="size-full py-4 pr-4">
        <SidebarNav />
      </ScrollArea>
      <Footer />  
    </aside>
  </>;
}