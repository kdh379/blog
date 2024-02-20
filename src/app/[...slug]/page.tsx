
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import PostPage from "@/components/pages/PostPage";
import { siteConfig } from "@/config/site";

interface PostPageProps {
  params: {
    slug: string[]
  }
}

function getPostFromParams({ params }: PostPageProps) {
  const slug = decodeURIComponent(params.slug?.join("/") || "");

  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export function generateMetadata({ params }: PostPageProps): Metadata {
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
      url: `${siteConfig.url}/${post.slug}`,
      images: [
        {
          url: siteConfig.image,
          width: 500,
          height: 500,
          alt: siteConfig.name,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return allPosts.map((post) => ({
    params: {
      slug: post.slugAsParams.split("/"),
    },
  }));
}

const Post = ({ params }: PostPageProps) => {
  const post = getPostFromParams({ params });

  if (!post) {
    notFound();
  }
  
  return <PostPage {...post} />;
};

export default Post;
