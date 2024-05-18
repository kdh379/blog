import { allPosts, type Post } from "contentlayer/generated";

interface Item {
  category?: string;
  title?: string;
  slugAsParams?: string;
  children?: Item[];
}

export type PostTree = Item[];

function createTree(posts: Post[]) {
  const root: Item = {};

  posts.filter((post) => !post.slug.startsWith("/__")).forEach((post) => {    
    const slugs = post.slug.split("/").slice(2);

    let currentNode = root;

    for( const slug of slugs ) {
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
    currentNode.slugAsParams = `/${post.slugAsParams}`;
  });

  return root.children || [];
}

export function getPostTree(): PostTree {
  const tree = createTree(allPosts);
  
  return tree;
}