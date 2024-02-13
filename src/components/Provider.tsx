import { PropsWithChildren } from "react";

import { getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

import { ClientSideProvider } from "./ClientSideProvider";
import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";
import { Toaster } from "./ui/toaster";


export default function Providers(props: PropsWithChildren) {
  const postList = getAllPosts();

  return (
    <ClientSideProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className="bg-background relative min-h-screen antialiased transition ease-in-out">
        <AppHeader postList={postList} />
        <div className={cn(
          "tablet:grid tablet:grid-cols-[240px_minmax(0,1fr)] tablet:gap-10 container min-h-screen flex-1 antialiased"
        )}>
          <Sidebar postList={postList} />
          {props.children}
        </div>
        <Toaster />
      </div>
    </ClientSideProvider>
  );
}