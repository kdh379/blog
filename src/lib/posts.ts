import dayjs from "dayjs";
import * as fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BASE_PATH = "src/content";
const POST_PATH = path.join(process.cwd(), BASE_PATH);

export function parsePost(postPath: string): PostMatter | undefined{
  const file = fs.readFileSync(postPath, {encoding: "utf-8"});
  const { content, data } = matter(file);
  const grayMatter = data as PostMatter;

  if( grayMatter.draft ) return;

  const {minutes, ...rest} = readingTime(content);
  
  return {
    ...grayMatter,
    content,
    tags: grayMatter.tags?.filter(Boolean),
    date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
    slug: postPath.slice(postPath.indexOf(BASE_PATH) + BASE_PATH.length + 1).replace(".mdx", ""),
    readingTime: Math.ceil(readingTime(content).minutes),
  };
};

export function getAllPosts() {
  const postPaths = sync(`${POST_PATH}/**/*.mdx`, {
    posix: true,
    ignore: ["**/(**)/**"],
  });
  
  return postPaths.reduce<PostMatter[]>((acc, postPath) => {
    const post = parsePost(postPath);
    
    if( !post ) return acc;

    return [...acc, post];
  }, []);
};