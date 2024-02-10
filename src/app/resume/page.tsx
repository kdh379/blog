import ResumePage from "@/components/pages/ResumePage";
import { parsePost } from "@/lib/posts";

const Resume = () => {
  const resume = parsePost("src/content/(resume)/resume.mdx");

  if( !resume ) return null;

  return <ResumePage {...resume} />;
};

export default Resume;