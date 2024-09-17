// app/page.tsx
import { unstable_cache } from 'next/cache';
import { getPublishedPosts } from '@/lib/db';

const getPosts = unstable_cache(
  async () => {
    const posts = await getPublishedPosts();
    return posts;
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] } // Cache for 1 hour
);

export default async function Page() {
  const posts = await getPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
