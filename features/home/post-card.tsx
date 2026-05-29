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
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

type PostCardProps = {
  post: PostMetadata;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`} className="group block h-full w-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/50 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
        
        <div className="aspect-4/3 w-full overflow-hidden bg-muted transition-colors duration-300 group-hover:bg-muted/80">
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-primary/5 to-accent/5 transition-transform duration-500 group-hover:scale-105">
            <span className="text-3xl text-muted-foreground/20">✦</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-2">
          <div className="flex items-center justify-between text-[13px] text-muted-foreground">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="font-medium text-foreground">Xolace</span>
              <span>-</span>
              <time dateTime={post.publishedAt} className="whitespace-nowrap">
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <span className="ml-4 shrink-0 whitespace-nowrap font-medium text-muted-foreground">
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h3 className="mt-4 line-clamp-2 font-serif text-[22px] font-semibold leading-snug text-foreground">
            {post.title}
          </h3>

          {post.subtitle && (
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
              {post.subtitle}
            </p>
          )}

          <div className="mt-auto flex w-full pt-4">
            <span className="inline-flex max-w-full items-center truncate whitespace-nowrap rounded-full border border-foreground/40 px-3 py-1 text-[13px] font-medium text-foreground/80">
              {categoryLabels[post.category]}
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}
