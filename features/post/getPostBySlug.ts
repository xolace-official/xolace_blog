import { getPostBySlug as readPost } from "@/lib/posts";

export async function getPostBySlug(slug: string) {
    return readPost(slug);
}