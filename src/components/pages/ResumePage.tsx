import Mdx from "../ui/mdx-components";

interface ResumePageProps extends PostMatter {

}

export default function ResumePage(props: ResumePageProps) {
  return <Mdx
    source={props.content}
  />;
}