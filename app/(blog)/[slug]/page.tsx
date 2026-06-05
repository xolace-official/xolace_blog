
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/posts";
import { getRelatedPosts } from "@/lib/posts";
import { PostPage } from "@/components/pages/post/post-page";
import { ReadingProgress } from "@/features/post/reading-progress";

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const post = await getPostBySlug(slug);

    if (!post) {
        return {};
    }

    return {
        title: post.title,
        description: post.subtitle,
        openGraph: {
            title: post.title,
            description: post.subtitle,
            type: "article",
            publishedTime: post.publishedAt,
            images: [
                {
                    url: post.imageUrl ?? `/images/og/${slug}.png`,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.subtitle,
            images: [post.imageUrl ?? `/images/og/${slug}.png`],
        },
    };
}

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, post.category);

    return (
        <>
            <ReadingProgress />
            <PostPage post={post} relatedPosts={relatedPosts} />
        </>
    );
}