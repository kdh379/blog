import { UnistNode, UnistTree } from "@blog/types/unist";
import { ComputedFields, defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (post) => `/${post._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (post) => post._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
    draft: {
      type: "boolean",
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkBreaks,
      remarkToc,
    ],
    rehypePlugins: [
      rehypeSlug,
      () => (tree: UnistTree) => {
        visit(tree, (node: UnistNode) => {
          if( node?.type === "element" && node?.tagName === "pre") {
            if(node.children) {
              const [codeEl] = node.children;
              if(codeEl?.tagName !== "code" || !codeEl.children?.[0] ) return;
          
              node.__rawString__ = codeEl.children?.[0].value;
            }
          }
        });
      },
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          defaultLang: {
            block: "plaintext",
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "figure") {
            if (!("data-rehype-pretty-code-figure" in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== "pre") {
              return;
            }

            preElement.properties.__rawString__ = node.__rawString__;

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__;
            }

            if (node.__event__) {
              preElement.properties["__event__"] = node.__event__;
            }

            if (node.__style__) {
              preElement.properties["__style__"] = node.__style__;
            }
          }
        });
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});