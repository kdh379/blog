import { Mail } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="container mt-auto">
      <nav className="mb-2 flex gap-x-2">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: "icon",
            variant: "outline",
          })}
        >
          <Icons.github className="size-4" />
          <span className="sr-only">Github</span>
        </Link>
        <Link
          href={siteConfig.links.mailTo}
          className={buttonVariants({
            size: "icon",
            variant: "outline",
          })}
        >
          <Mail className="size-4" />
          <span className="sr-only">Mail</span>
        </Link>
      </nav>
      <p>© 2024 {siteConfig.name}</p>
    </footer>
  );
}