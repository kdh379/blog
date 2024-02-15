import Link from "next/link";
import React from "react";

import { siteConfig } from "@/config/site";

import MobileSheet from "./MobileSheet";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ToggleTheme";

export default function AppHeader( ) {

  return <header className="tablet:hidden bg-background/95 supports-[backdrop-filter]:bg-background/60 container sticky top-0 z-30 flex h-14 items-center gap-x-4 border-b py-2 shadow-md backdrop-blur">
    <MobileSheet>
      <Sidebar className="static flex flex-col pr-8" />
    </MobileSheet>
    <Link href="/">
      <span className="text-xl font-bold">{siteConfig.name}</span>
    </Link>
    <ThemeToggle />
  </header>;
}