"use client";

import Footer from "@blog/components/layout/Footer";
import PostsSearch from "@blog/components/layout/PostsSearch";
import SidebarNav from "@blog/components/layout/SidebarNav";
import { Link } from "@repo/ui/components/Link";
import ToggleTheme from "@repo/ui/components/ToggleTheme";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { siteConfig } from "@repo/ui/site.config";
import { useSidebarStore } from "@repo/ui/store/index";
import Image from "next/image";

interface SidebarProps {
  className?: string;
}

export default function Sidebar( {className}: SidebarProps ) {

  const setClose = useSidebarStore(state => state.close);

  return <>
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
          className="absolute object-cover rounded-full size-full"
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
      <ScrollArea className="py-4 pr-4 size-full">
        <SidebarNav />
      </ScrollArea>
      <Footer />  
    </aside>
  </>;
}