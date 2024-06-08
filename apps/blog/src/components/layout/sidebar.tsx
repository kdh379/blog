"use client";

import Footer from "@blog/components/layout/footer";
import PostsSearch from "@blog/components/layout/posts-search";
import SidebarNav from "@blog/components/layout/sidebar-nav";
import { Link } from "@repo/ui/components/link";
import ToggleTheme from "@repo/ui/components/toggle-theme";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { siteConfig } from "@repo/ui/site.config";
import { useSidebarStore } from "@repo/ui/store/index";
import Image from "next/image";

interface SidebarProps {
  className?: string;
}

export default function Sidebar( {className}: SidebarProps ) {

  const setClose = useSidebarStore((state) => state.close);

  return (
    <>
      <aside className={cn(
        "fixed top-8 hidden h-[calc(100vh-3.5rem)] shrink-0 tablet:sticky tablet:flex tablet:flex-col",
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
        <div className="hidden gap-x-2 mobile:flex">
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
    </>
  );
}