// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/db';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#191919] flex items-center justify-center p-10">
      <article className="max-w-2xl w-full bg-[#202020] border border-[#333] rounded-lg shadow-lg p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          <p className="text-sm text-gray-400 mt-2">Published by {post.author.name}</p>
        </header>
        <section className="text-lg text-gray-200 leading-relaxed">
          <p>{post.content}</p>
        </section>
      </article>
    </main>
  );
}
