import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import Link from "next/link";
 
export default function NotFound() {
  return (
    <div className="inset-0 m-auto">
      <div className="flex">
        <h1>404</h1>
        <Separator orientation="vertical" className="mx-4 h-6 w-1" />
        <h2>에러라는 뜻이죠.</h2>
      </div>
      <p>이런 URL은 제가 구현한 기억이 없습니다.</p>
      <Button
        variant="link"
      >
        <Link href="/">집으로 돌아가기</Link>
      </Button>
    </div>
  );
}