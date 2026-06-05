import { getAllPosts } from '@/lib/posts';
import { HomePageClient } from './home-page-client';

export async function HomePage() {
    const posts = await getAllPosts();
    return <HomePageClient posts={posts} />;
}