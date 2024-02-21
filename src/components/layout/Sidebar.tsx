"use client";

import Image from "next/image";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { sidebarVisibleAtom } from "@/store/atom";

import { ScrollArea } from "../ui/scroll-area";
import PostsSearch from "./PostsSearch";
import SidebarNav from "./SidebarNav";
import ToggleTheme from "./ToggleTheme";

interface SidebarProps {
  className?: string;
}

export default function Sidebar( {className}: SidebarProps ) {

  const setClose = useSetRecoilState(sidebarVisibleAtom);

  return <>
    <header className={cn(
      "tablet:flex tablet:flex-col tablet:sticky fixed top-8 hidden h-[calc(100vh-3.5rem)] shrink-0",
      className
    )}>
      <Link href="/" onClick={() => setClose(false)}>
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
    </header>
  </>;
}