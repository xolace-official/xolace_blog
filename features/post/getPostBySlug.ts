import {dummyPosts} from "@/features/post/dummy";

export async function getPostBySlug(slug: string) {
    return dummyPosts.find(
        (post) => post.slug === slug && post.isPublished
    );
}