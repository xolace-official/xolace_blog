import Image from 'next/image';
import type { PostMetadata, PostCategory } from '@/types/post';
import { Clock3, Calendar } from 'lucide-react';
import {ReadMoreButton} from "@/features/post/read-more-button";

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

export function RelatedCard({ post }: { post: PostMetadata }) {
    return (
        <>
            {/* ── DESKTOP: horizontal compact ── */}
            <article className="group hidden md:flex gap-3 overflow-hidden rounded-2xl border border-border/50 bg-card p-3 transition-all duration-300 hover:shadow-lg hover:shadow-foreground/5">
                <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-muted">
                    {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill sizes="96px"
                               className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                            <span className="text-xl text-muted-foreground/20">✦</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                        <span className="font-medium uppercase tracking-widest">
                            {categoryLabels[post.category]}
                        </span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={10} />
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1 shrink-0">
                            <Clock3 size={10} />
                            <span>{post.readTimeMinutes} min</span>
                        </div>
                    </div>

                    <h4 className="mt-1 line-clamp-1 font-serif text-[15px] font-semibold leading-snug text-foreground">
                        {post.title}
                    </h4>

                    {post.subtitle && (
                        <p className="mt-1 line-clamp-1 text-[12px] leading-relaxed text-muted-foreground">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="mt-auto flex justify-end pt-2">
                        <ReadMoreButton href={`/${post.slug}`} label="READ MORE" />
                    </div>
                </div>
            </article>

            {/* ── MOBILE: vertical card for 2-col grid ── */}
            <article className="group flex md:hidden flex-col overflow-hidden rounded-xl border border-border/50 bg-card h-full transition-all duration-300 hover:shadow-md hover:shadow-foreground/5">
                {/* Shorter thumbnail */}
                <div className="relative w-full aspect-[16/9] shrink-0 bg-muted">
                    {post.imageUrl ? (
                        <Image src={post.imageUrl} alt={post.title} fill sizes="50vw"
                               className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                            <span className="text-xl text-muted-foreground/20">✦</span>
                        </div>
                    )}
                </div>

                {/* Same content structure as desktop */}
                <div className="flex flex-col flex-1 p-2.5">
                    <div className="flex items-center gap-1 text-[10px] text-foreground/50 flex-wrap">
                        <span className="font-medium uppercase tracking-widest">
                            {categoryLabels[post.category]}
                        </span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={9} />
                            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        </div>
                        <span>·</span>
                        <div className="flex items-center gap-1 shrink-0">
                            <Clock3 size={9} />
                            <span>{post.readTimeMinutes} min</span>
                        </div>
                    </div>

                    <h4 className="mt-1 line-clamp-1 font-serif text-[13px] font-semibold leading-snug text-foreground">
                        {post.title}
                    </h4>

                    {post.subtitle && (
                        <p className="mt-1 line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">
                            {post.subtitle}
                        </p>
                    )}

                    <div className="mt-auto flex justify-end pt-2">
                        <ReadMoreButton
                            href={`/${post.slug}`}
                            label="READ MORE"
                            className="text-[10px] h-6 px-2"
                        />
                    </div>
                </div>
            </article>
        </>
    );
}