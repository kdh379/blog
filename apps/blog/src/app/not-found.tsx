"use client";

import { Link } from "@repo/ui/components/link";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {

  const router = useRouter();

  return (
    <div className="mx-auto mt-10">
      <h1 className="py-20 text-center text-3xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <Image
        src="/images/404.gif"
        width={600}
        height={300}
        alt="404 Not Found"
        className="aspect-[40:17] rounded-md"
      />
      <div className="mt-10 flex items-center justify-center gap-4">
        <Button
          variant="secondary"
          onClick={() => router.back()}
        >
          이전 페이지로
        </Button>
        <Link
          href="/"
          className={buttonVariants()}
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}