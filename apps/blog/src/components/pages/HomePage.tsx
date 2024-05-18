

import { Icons } from "@repo/ui/components/ui/icons";
import TypeWriter from "@repo/ui/components/ui/type-writer";
import { siteConfig } from "@repo/ui/site.config";
import Link from "next/link";

const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Zustand",
  "React-Query",
  "HTML",
  "CSS",
];

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="hover:text-primary hover:border-primary flex items-center gap-x-2 border-b-2 border-dotted transition-colors"
    >
      {children}
    </a>
  );
}

export default async function HomePage() {

  return <div className="m-auto">
    <section className="slide-enter-content my-8">
      <h1 className="mb-4">프론트엔드 개발자 <b>김도현</b>입니다.</h1>

      <p>웹 개발과 저에 대해 작성하고 있습니다.</p>
      <p>보고 배운걸 까먹지 않기 위해 기록해둔 곳입니다.</p>
      <p>동료에게 좋은 평가를 받는 것을 좋아합니다. 그래서 더 노력합니다.</p>
      <p>프론트엔드 개발 시 주로 <TypeWriter strings={skills} />를 사용합니다.</p>

      <div className="mt-12">
        <p className="mb-2">Connect me on</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/resume">
            <div className="text-primary hover:text-primary-foreground after:bg-primary relative flex items-center gap-x-2 border-b-2 border-dotted transition-colors after:absolute after:-left-1 after:bottom-0 after:-z-10 after:h-0 after:w-[calc(100%+8px)] after:rounded-md after:transition-[height] after:hover:h-full">
              <Icons.docs className="size-5" />
              Resume
            </div>
          </Link>
          <Anchor href="mailto:ehgus37625@naver.com">
            <Icons.email className="size-5" />
            ehgus37625@naver.com
          </Anchor>
          <Anchor href={siteConfig.github}>
            <Icons.github className="size-5" />
            GitHub
          </Anchor>
          <Anchor href="https://gomban.tistory.com/">
            <Icons.backup className="size-5" />
            이전 블로그
          </Anchor>
        </div>
      </div>
    </section>
  </div>;
}