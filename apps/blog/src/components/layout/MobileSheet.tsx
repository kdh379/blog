"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/ui/sheet";
import { useSidebarStore } from "@repo/ui/store/index";
import { Menu } from "lucide-react";
import React, { PropsWithChildren } from "react";

export default function MobileSheet( props: PropsWithChildren ) {
  const {visible, toggle} = useSidebarStore();
    
  return (
    <>
      <Sheet open={visible} onOpenChange={toggle}>
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