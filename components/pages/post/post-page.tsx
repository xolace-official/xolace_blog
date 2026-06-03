'use client';
import Image from 'next/image';
import { Link2, Clock3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PostMetadata, PostCategory } from '@/types/post';
import { RelatedCard } from '@/features/post/related-card';
import { BackButton } from '@/components/shared/back-button';
import { toast } from 'sonner';

const categoryLabels: Record<PostCategory, string> = {
    vocabulary: 'Vocabulary',
    founders: 'Founders',
    'mirror-voice': 'Mirror Voice',
    territory: 'Territory',
    people: 'People',
};

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

type PostPageProps = {
    post: PostMetadata;
    relatedPosts?: PostMetadata[];
};

export function PostPage({ post, relatedPosts = [] }: PostPageProps) {

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success('Link copied!', {
                    description: 'The post link has been copied to your clipboard.',
                });
            })
            .catch(() => {
                toast.error('Failed to copy', {
                    description: 'Could not copy the link. Please try manually.',
                });
            });
    };

    return (
        <div>
            <main>
                {/* Reading progress bar */}
                <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-border/30">
                    <div
                        id="reading-progress"
                        className="h-full bg-primary transition-[width] duration-100"
                        style={{ width: '0%' }}
                    />
                </div>

                {/* Back button */}
                <div className="pt-8 pb-0">
                    <BackButton href="/" label="All Posts" />
                </div>

                <article className="mx-auto max-w-3xl">
                    <header className="pt-8 pb-0">
                        <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight">
                            {post.title}
                        </h1>

                        {post.subtitle && (
                            <p className="mt-5 text-xl italic leading-relaxed text-muted-foreground max-w-2xl">
                                {post.subtitle}
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-5 pb-8 border-b border-border/50 text-sm text-muted-foreground">

                            {/* Authors */}
                            <div className="flex items-center gap-2">
                                {/* Stacked avatars */}
                                <div className="flex -space-x-2">
                                    {post.authors.map((author) =>
                                        author.imageUrl ? (
                                            <Image
                                                key={author.name}
                                                src={author.imageUrl}
                                                alt={author.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full border-2 border-background object-cover w-8 h-8"
                                            />
                                        ) : (
                                            <div
                                                key={author.name}
                                                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-accent text-xs font-semibold text-accent-foreground"
                                            >
                                                {author.name.charAt(0)}
                                            </div>
                                        )
                                    )}
                                </div>
                                {/* Author name(s) */}
                                <span className="font-medium text-foreground">
                                    {post.authors.length === 1
                                        ? post.authors[0].name
                                        : post.authors.length === 2
                                            ? `${post.authors[0].name} & ${post.authors[1].name}`
                                            : 'Multiple authors'
                                    }
                                </span>
                            </div>

                            <span className="text-border">·</span>

                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                            </div>

                            <span className="text-border">·</span>

                            <div className="flex items-center gap-1.5">
                                <Clock3 size={14} />
                                {post.readTimeMinutes} min read
                            </div>
                        </div>
                    </header>

                    {/* Hero image */}
                    <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                        {post.imageUrl ? (
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                                <span className="text-7xl text-muted-foreground/20">✦</span>
                            </div>
                        )}
                    </div>

                    {/* Body */}
                    <div
                        id="post-body"
                        className="mt-2"
                        dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
                    />

                    {/* Footer */}
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Published in{' '}
                            <span className="font-medium text-foreground">
                                {categoryLabels[post.category]}
                            </span>
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-1.5 text-xs cursor-pointer"
                                onClick={handleCopyToClipboard}
                            >
                                <Link2 size={13} /> Copy link
                            </Button>
                        </div>
                    </div>
                </article>
            </main>

            {relatedPosts.length > 0 && (
                <section className="bg-accent px-4 md:px-24 py-8">
                    <div className="border-t border-border/50 py-4">
                        <p className="font-medium uppercase tracking-widest text-muted-foreground mb-6">
                            Related stories
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {relatedPosts.slice(0, 3).map((related, index) => (
                                <div
                                    key={related.slug}
                                    className={index === 2 ? 'hidden lg:block' : ''}
                                >
                                    <RelatedCard post={related} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}