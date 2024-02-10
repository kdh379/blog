
import PostPage from "@/components/pages/PostPage";
import { getAllPosts } from "@/lib/posts";

interface PostPageProps {
  params: {
    slug: string[]
  }
}

function getPostFromParams({ params }: PostPageProps) {
  const slug = typeof params.slug === "string" ? params.slug : params.slug.join("/");
  
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}

export function generateStaticParams() {

  return getAllPosts().map((post) => ({
    slug: post.slug.split("/"),
  }));
}

const Post = ({ params }: PostPageProps) => {
  const post = getPostFromParams({ params });

  if (!post) {
    return null;
  }
  
  return <PostPage {...post} />;
};

export default Post;
