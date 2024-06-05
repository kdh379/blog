import MobileSheet from "@blog/components/layout/mobile-sheet";
import PostsSearch from "@blog/components/layout/posts-search";
import Sidebar from "@blog/components/layout/sidebar";
import { Link } from "@repo/ui/components/link";
import ToggleTheme from "@repo/ui/components/toggle-theme";
import { siteConfig } from "@repo/ui/site.config";
import React from "react";

export default function AppHeader( ) {

  return <header className="container fixed top-0 z-30 flex h-mobileHeader items-center border-b bg-background/95 py-2 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60 tablet:hidden">
    <MobileSheet>
      <Sidebar className="static flex flex-col pr-8" />
    </MobileSheet>
    <Link href="/">
      <span className="ml-4 text-xl font-bold">{siteConfig.name}</span>
    </Link>
    <div className="flex items-center ml-auto gap-x-2">
      <PostsSearch />
      <ToggleTheme />
    </div>
  </header>;
}