import { SerializeOptions } from "next-mdx-remote/dist/types";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "@/types/unist";

export const mdxOptions: SerializeOptions = {
  mdxOptions: {
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
              if(codeEl.tagName !== "code" ) return;
          
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
    ]},
};
