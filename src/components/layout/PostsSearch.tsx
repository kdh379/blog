"use client";

import { Search } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "../ui/command";

export default function PostsSearch() {

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground w-full justify-start gap-x-1"
      >
        <Search className="size-4" />
        <span className="mobile:block hidden">Search posts...</span>
        <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search posts..." />
        <CommandList>
          <CommandEmpty>No posts found</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </>
  );
};