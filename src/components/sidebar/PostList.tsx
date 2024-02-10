export default function PostList({posts}) {
  return (
    <div className="flex-1">
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}