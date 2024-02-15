import { allPosts } from "contentlayer/generated";

import ResumePage from "@/components/pages/ResumePage";

const Resume = () => {
  const resume = allPosts.find((post) => post.slug === "/resume");

  if( !resume ) return null;

  return <ResumePage {...resume} />;
};

export default Resume;