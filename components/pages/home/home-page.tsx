import { PostList } from '@/features/home/post-list';
import { Pagination } from '@/features/home/pagination';
import { dummyPosts } from '@/lib/dummy';

export function HomePage() {
  const publishedPosts = dummyPosts.filter((post) => post.isPublished);
  const totalPages = Math.ceil(publishedPosts.length / 9);

  return (
    <main>
      <PostList posts={publishedPosts} />
      <Pagination currentPage={1} totalPages={totalPages} />
    </main>
  );
}
