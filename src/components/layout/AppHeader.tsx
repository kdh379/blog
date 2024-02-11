"use client";

import { Menu } from "lucide-react";
import React from "react";
import { useRecoilState } from "recoil";

import { sidebarVisibleAtom } from "@/store/atom";

import ThemeToggle from "../sidebar/ToggleTheme";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./Sidebar";

interface AppHeaderProps {
  postList: PostMatter[];
}

export default function AppHeader( props: AppHeaderProps ) {
  const [open, setOpen] = useRecoilState(sidebarVisibleAtom);

  return <header className="tablet:hidden bg-background/95 supports-[backdrop-filter]:bg-background/60 container sticky top-0 z-30 flex h-14 items-center gap-x-4 border-b py-2 shadow-md backdrop-blur">
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base"
        >
          <Menu className="size-6" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[calc(100vw-3.5rem)] pr-0">
        <Sidebar className="ml-0 block px-2" postList={props.postList} />
      </SheetContent>
    </Sheet>
    <span className="text-xl font-bold">Bandal Blog</span>
    <ThemeToggle className="size-4" />
  </header>;
}