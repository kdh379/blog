import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import SidebarNav from "../sidebar/SidebarNav";
import ToggleTheme from "../sidebar/ToggleTheme";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  postList: PostMatter[];
  className?: string;
}

export default function Sidebar( {postList, className}: SidebarProps ) {
  return <>
    {/* <SidebarBackDrop /> */}
    <header className={cn(
      "desktop:flex desktop:sticky fixed top-0 z-30 -ml-2 hidden h-screen shrink-0 flex-col",
      className
    )}>
      <Link href="/">
        <h1 className="py-6 text-2xl font-bold">Bandal Blog</h1>
      </Link>
      <div className="relative w-32 after:block after:pb-[100%]">
        <Image
          src="/images/profile.jpg"
          alt="Profile Picture"
          className="absolute size-full rounded-full object-cover shadow-xl"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="bg-background/95 my-4 flex gap-x-2 backdrop-blur">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2 top-3 size-4" />
          <Input
            type="search"
            placeholder="Search"
            className="py-1 pl-8"
            aria-label="Search"
          />
        </div>
        <ToggleTheme />
      </div>
      <ScrollArea className="size-full">
        <SidebarNav postList={postList} />
      </ScrollArea>
    </header>
  </>;
}