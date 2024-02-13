
import PostPage from "@/components/pages/PostPage";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/posts";

interface PostPageProps {
  params: {
    slug: string[]
  }
}

function getPostFromParams({ params }: PostPageProps) {
  const slug = typeof params.slug === "string" ? params.slug : decodeURIComponent(params.slug.join("/"));
  
  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}

export function generateMetadata({ params }: PostPageProps) {
  const post = getPostFromParams({ params });

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/posts/${post.slug}`,
      article: {
        publishedTime: post.date,
        modifiedTime: post.date,
        authors: [siteConfig.name],
        tags: post.tags,
      },
    },
  };
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
