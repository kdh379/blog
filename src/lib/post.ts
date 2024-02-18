import { allPosts, type Post } from "contentlayer/generated";

interface Item {
  category?: string;
  title?: string;
  slug?: string;
  children?: Item[];
}

export type PostTree = Item[];

function createTree(posts: Post[]) {
  const root: Item = {};

  posts.forEach((post) => {
    const slugs = post.slug.split("/").slice(1);

    let currentNode = root;

    for( const slug of slugs ) {
      if( slug === "posts" ) continue;
      currentNode.children = currentNode.children || [];
      let foundNode = currentNode.children.find((node) => node.category === slug);

      if( !foundNode ) {
        foundNode = {
          category: slug,
        };
        
        currentNode.children.push(foundNode);
      }

      currentNode = foundNode;
    }

    currentNode.title = post.title;
    currentNode.category = undefined;
    currentNode.slug = post.slug;
  });

  return root.children || [];
}

export function getPostTree(): PostTree {
  const tree = createTree(allPosts);
  
  return tree;
}