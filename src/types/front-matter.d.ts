type PostMatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  content: string;
  image: string;
  readingTime: number;
  draft?: boolean;
}