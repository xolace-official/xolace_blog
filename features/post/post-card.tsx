'use client';

import Image from 'next/image';
import Link from 'next/link';
import type {PostMetadata} from '@/types/post';

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).toUpperCase();
}

type PostCardProps = {
    post: PostMetadata;
};

function isValidUrl(url: string): boolean {
    return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');
}

export function PostCard({post}: PostCardProps) {
    return (
        <Link href={`/${post.slug}`} className="group block">
            <article className="flex flex-col">

                <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl bg-muted">
                    {post.imageUrl && isValidUrl(post.imageUrl) ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={false}
                        />
                    ) : (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                            <span className="text-4xl text-muted-foreground/20">✦</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col pt-4 px-1">

                    <time
                        dateTime={post.publishedAt}
                        className="text-[11px] font-medium tracking-widest text-muted-foreground/70"
                    >
                        {formatDate(post.publishedAt)}
                    </time>

                    <h3 className="mt-2 font-serif text-[20px] md:text-[22px] font-semibold leading-snug text-foreground line-clamp-2">
                        {post.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {post.authors.map((author) =>
                                author.imageUrl && isValidUrl(author.imageUrl) ? (
                                    <Image
                                        key={author.name}
                                        src={author.imageUrl}
                                        alt={author.name}
                                        width={28}
                                        height={28}
                                        className="rounded-full border-2 border-background object-cover w-7 h-7"
                                    />
                                ) : (
                                    <div
                                        key={author.name}
                                        className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-accent text-[10px] font-bold text-accent-foreground"
                                    >
                                        {author.name.charAt(0)}
                                    </div>
                                )
                            )}
                        </div>
                        <span className="text-[13px] font-medium text-foreground/80">
                            {post.authors.length === 1
                                ? post.authors[0].name
                                : post.authors.length === 2
                                    ? `${post.authors[0].name} & ${post.authors[1].name}`
                                    : 'Multiple authors'
                            }
                        </span>
                        {post.isGuest && (
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Guest
                            </span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}