"use client";

import { Menu } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { useRecoilState } from "recoil";

import { sidebarVisibleAtom } from "@/store/atom";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function MobileSheet( props: PropsWithChildren ) {
  const [open, setOpen] = useRecoilState(sidebarVisibleAtom);
    
  return (
    <>
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
        <SheetContent side="left" className="pr-0">
          {props.children}
        </SheetContent>
      </Sheet>
    </>
  );
}