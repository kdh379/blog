import { Post } from "contentlayer/generated";

import Mdx from "../ui/mdx-components";

interface ResumePageProps extends Post {
}

export default function ResumePage({body}: ResumePageProps) {
  return <div>
    <Mdx
      code={body.code}
    />
  </div>;
}