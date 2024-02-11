import { PropsWithChildren } from "react";

import { getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

import { ClientSideProvider } from "./ClientSideProvider";
import AppHeader from "./layout/AppHeader";
import Sidebar from "./layout/Sidebar";

export default function Providers(props: PropsWithChildren) {

  const postList = getAllPosts();

  return (
    <ClientSideProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <div className="bg-background relative flex min-h-screen flex-col transition ease-in-out">
        <AppHeader postList={postList} />
        <div className={cn(
          "desktop:grid desktop:grid-cols-[240px_minmax(0,1fr)] desktop:gap-10 container relative min-h-screen flex-1 antialiased"
        )}>
          <Sidebar postList={postList} />
          {props.children}
        </div>
      </div>
    </ClientSideProvider>
  );
}