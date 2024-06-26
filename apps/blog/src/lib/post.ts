import { allPosts, type Post } from "contentlayer/generated";

interface Item {
  category?: string;
  title?: string;
  date?: string;
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
    currentNode.date = post.date;
    currentNode.slugAsParams = `/${post.slugAsParams}`;
  });

  return root.children || [];
}

const SORT_CATEGORY = ["회고", "React", "javascript", "web"];

function sortTree(tree: Item[]) {
  tree.sort((a, b) => {
    // SORT_CATEGORY 순서대로 카테고리 정렬
    if( !a.category || !b.category ) return 0;

    const aIndex = SORT_CATEGORY.indexOf(a.category);
    const bIndex = SORT_CATEGORY.indexOf(b.category);

    if( aIndex !== -1 && bIndex !== -1 ) {
      return aIndex - bIndex;
    }

    if( aIndex !== -1 ) {
      return -1;
    }

    if( bIndex !== -1 ) {
      return 1;
    }

    if( !a.date || !b.date) return 0;

    // category가 같으면 날짜순으로 정렬
    return (b.date || "").localeCompare(a.date || "");
  });

  tree.forEach((node) => {
    if( node.children ) {
      sortTree(node.children);
    }
  });

  return tree;
}

export function getPostTree(): PostTree {
  const tree = createTree(allPosts);

  return sortTree(tree);
}