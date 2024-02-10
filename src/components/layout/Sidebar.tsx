"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ToggleTheme from "./ToggleTheme";

export default function Sidebar() {

  const {  } = useRouter();

  return <header className="sticky w-[200px] overflow-y-auto">
    <Link href="/">
      <h1 className="py-6 text-2xl font-bold">bandal Blog</h1>
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
    <ToggleTheme />
  </header>;
}