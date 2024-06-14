import { Link } from "@repo/ui/components/link";
import ToggleTheme from "@repo/ui/components/toggle-theme";
import { siteConfig } from "@repo/ui/site.config";
import React from "react";

import Sidebar from "@blog/components/layout/sidebar";
import PostsSearch from "@blog/components/layout/posts-search";
import MobileSheet from "@blog/components/layout/mobile-sheet";

export default function AppHeader( ) {

  return (
    <header className="h-mobileHeader bg-background/95 supports-[backdrop-filter]:bg-background/60 tablet:hidden container fixed top-0 z-30 flex items-center border-b py-2 shadow-md backdrop-blur">
      <MobileSheet>
        <Sidebar className="static flex flex-col pr-8" />
      </MobileSheet>
      <Link href="/">
        <span className="ml-4 text-xl font-bold">{siteConfig.name}</span>
      </Link>
      <div className="ml-auto flex items-center gap-x-2">
        <PostsSearch />
        <ToggleTheme />
      </div>
    </header>
  );
}