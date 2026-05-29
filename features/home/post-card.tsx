import Link from 'next/link';
import type { PostMetadata, PostCategory } from '@/types/post';

const categoryLabels: Record<PostCategory, string> = {
  vocabulary: 'Vocabulary',
  founders: 'Founders',
  'mirror-voice': 'Mirror Voice',
  territory: 'Territory',
  people: 'People',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

type PostCardProps = {
  post: PostMetadata;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
          <span className="text-3xl text-muted-foreground/30">✦</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-[13px] text-muted-foreground">
        <span>Xolace</span>
        <span>·</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </div>

      <Link href={`/${post.slug}`} className="mt-2 block">
        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground transition-colors duration-150 group-hover:text-primary md:text-[22px]">
          {post.title}
        </h3>
      </Link>

      {post.subtitle && (
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
          {post.subtitle}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border px-3 py-1 text-[13px] text-foreground">
          {categoryLabels[post.category]}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {post.readTimeMinutes} min read
        </span>
      </div>
    </article>
  );
}
