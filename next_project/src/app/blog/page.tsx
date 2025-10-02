// app/blog/page.tsx
export default async function BlogPage() {
  const res = await fetch("https://dummyjson.com/posts?limit=10", {
    next: { revalidate: false }, // fully static, built once
  });

  const { posts } = await res.json();

  return (
    <div>
      <h1>Blog Posts (SSG)</h1>
      {posts.map((p: any) => (
        <p key={p.id}>{p.title}</p>
      ))}

      {new Date().getTime()}
    </div>
  );
}
