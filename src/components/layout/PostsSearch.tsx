"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { getPostTree, type PostTree } from "@/lib/post";

import { Button } from "../ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

interface PostTreeProps {
  postTree: PostTree;
  onSelect: (slug?: string) => void;
}

function PostTreeProps({ postTree, onSelect }: PostTreeProps) {
  return postTree.length && postTree.map((post, index) => (
    <React.Fragment key={index}>
      {post.slug && (
        <CommandItem
          className="cursor-pointer"
          onSelect={() => onSelect(post.slug)}
        >
          {post.title}
        </CommandItem>
      )}
      {post.category && post.children?.length && (
        <CommandGroup heading={post.category}>
          {post.children?.length && (
            <PostTreeProps postTree={post.children} onSelect={onSelect} />
          )}
        </CommandGroup>
      )}
    </React.Fragment>
  )
  );
}

export default function PostsSearch() {

  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="text-muted-foreground mobile:w-full mobile:justify-start mobile:px-2 ml-auto justify-center gap-x-1"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="mobile:block hidden">Search posts...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search posts..." />
        <CommandList>
          <CommandEmpty>No posts found</CommandEmpty>
          <PostTreeProps
            postTree={getPostTree()}
            onSelect={(slug) => {
              setOpen(false);
              router.push(slug ?? "/");
            }}
          />
        </CommandList>
      </CommandDialog>
    </>
  );
};