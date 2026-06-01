'use client';

import Image from 'next/image';
import type { PostMetadata } from '@/types/post';
import { Calendar, Clock3 } from 'lucide-react';
import {ReadMoreButton} from "@/features/post/read-more-button";

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
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
        <>
            <article className="group flex md:hidden gap-3 overflow-hidden rounded-2xl border border-secondary/50 bg-card p-3 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
                {/* Thumbnail */}
                <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            sizes="96px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                            <span className="text-2xl text-muted-foreground/20">✦</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                        <span className="font-medium">Xolace</span>
                        <span>·</span>
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        <span>·</span>
                        <span className="whitespace-nowrap">{post.readTimeMinutes} min</span>
                    </div>

                    <h3 className="mt-1 line-clamp-2 font-serif text-[15px] font-semibold leading-snug text-foreground">
                        {post.title}
                    </h3>

                    {post.subtitle && (
                        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="mt-auto flex justify-end pt-2">
                        <ReadMoreButton href={`/${post.slug}`} label="READ MORE" />
                    </div>
                </div>
            </article>

            {/* ── DESKTOP: vertical card ── */}
            <article className="group hidden md:flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
                {/* Thumbnail */}
                <div className="aspect-4/3 w-full overflow-hidden bg-muted">
                    <div className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5">
                        {post.imageUrl ? (
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={600}
                                height={450}
                                sizes="33vw"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                priority={false}
                            />
                        ) : (
                            <span className="flex items-center justify-center h-full w-full text-3xl text-muted-foreground/20">✦</span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-3">
                    <div className="flex items-center justify-between text-[12px] text-foreground/50">
                        <div className="flex items-center gap-1.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                                X
                            </div>
                            <span className="font-medium">Xolace</span>
                            <span>·</span>
                            <div className="flex items-center gap-1">
                                <Calendar size={11} />
                                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <Clock3 size={11} />
                            <span>{post.readTimeMinutes} min read</span>
                        </div>
                    </div>

                    <h3 className="mt-2 line-clamp-2 font-serif text-[22px] font-semibold leading-snug text-foreground">
                        {post.title}
                    </h3>

                    {post.subtitle && (
                        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="mt-auto flex justify-end pt-4">
                        <ReadMoreButton href={`/${post.slug}`} label="FULL STORY" />
                    </div>
                </div>
            </article>
        </>
    );
}