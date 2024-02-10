
import Mdx from "../ui/mdx-components";

interface PostPageProps extends PostMatter {

}

export default function PostPage(props: PostPageProps) {

  const { title, content } = props;

  return <Mdx
    source={content}
  />;
}