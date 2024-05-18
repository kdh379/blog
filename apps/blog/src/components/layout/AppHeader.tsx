import MobileSheet from "@blog/components/layout/MobileSheet";
import PostsSearch from "@blog/components/layout/PostsSearch";
import Sidebar from "@blog/components/layout/Sidebar";
import ToggleTheme from "@blog/components/layout/ToggleTheme";
import { siteConfig } from "@repo/ui/site.config";
import Link from "next/link";
import React from "react";

export default function AppHeader( ) {

  return <header className="tablet:hidden bg-background/95 supports-[backdrop-filter]:bg-background/60 h-mobileHeader container fixed top-0 z-30 flex items-center border-b py-2 shadow-md backdrop-blur">
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
  </header>;
}