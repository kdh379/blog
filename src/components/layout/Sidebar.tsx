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
      "tablet:flex tablet:flex-col tablet:sticky fixed top-8 hidden h-[calc(100vh-3.5rem)] shrink-0",
      className
    )}>
      <Link href="/">
        <p className="text-2xl font-bold">Bandal Blog</p>
      </Link>
      <div className="relative my-4 w-32 after:block after:pb-[100%]">
        <Image
          src="/images/profile.jpg"
          alt="Profile Picture"
          className="absolute size-full rounded-full object-cover shadow-xl"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="bg-background/95 mobile:flex hidden gap-x-2">
        <div className="relative">
          <Search className="text-muted-foreground absolute left-2 top-3 size-4" />
          <Input
            type="text"
            placeholder="Search"
            className="py-1 pl-8"
            aria-label="Search"
          />
        </div>
        <ToggleTheme />
      </div>
      <ScrollArea className="size-full py-4 pr-4">
        <SidebarNav postList={postList} />
      </ScrollArea>
    </header>
  </>;
}