import type { PostMetadata } from '@/types/post';
import { PostCard } from './post-card';

type PostListProps = {
  posts: PostMetadata[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="content-grid w-full">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
