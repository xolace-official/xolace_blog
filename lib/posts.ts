import { createReader } from '@keystatic/core/reader';
import Markdoc from '@markdoc/markdoc';
import config from '../keystatic.config';
import type { PostMetadata, Post, PostCategory, PostAuthor } from '@/types/post';

const reader = createReader(process.cwd(), config);

function toPostMetadata(slug: string, entry: {
  title: string;
  subtitle: string;
  publishedAt: string | null;
  category: string;
  isPublished: boolean;
  readTimeMinutes: number | null;
  isGuest: boolean;
  sourceName: string | null;
  sourceUrl: string | null;
  authors: ReadonlyArray<{ name: string; imageUrl: string | null }>;
  imageUrl: string | null;
}): PostMetadata {
  return {
    slug,
    title: entry.title,
    subtitle: entry.subtitle || undefined,
    publishedAt: entry.publishedAt ?? '',
    category: entry.category as PostCategory,
    isPublished: entry.isPublished,
    readTimeMinutes: entry.readTimeMinutes ?? 5,
    isGuest: entry.isGuest,
    sourceName: entry.sourceName ?? undefined,
    sourceUrl: entry.sourceUrl ?? undefined,
    authors: entry.authors.map((a): PostAuthor => ({
      name: a.name,
      imageUrl: a.imageUrl ?? undefined,
    })),
    imageUrl: entry.imageUrl ?? undefined,
  };
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const slugs = await reader.collections.posts.list();
  const entries = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.posts.read(slug);
      if (!entry || !entry.isPublished) return null;
      return toPostMetadata(slug, entry);
    })
  );

  return entries
    .filter((entry): entry is PostMetadata => entry !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const entry = await reader.collections.posts.read(slug, { resolveLinkedFiles: true });
  if (!entry || !entry.isPublished) return null;

    const transformed = Markdoc.transform(entry.content.node);
    const html = Markdoc.renderers.html(transformed);

    return {
        ...toPostMetadata(slug, entry),
        content: html,
    };
}

export async function getRelatedPosts(
  currentSlug: string,
  category: PostCategory,
  limit = 3,
): Promise<PostMetadata[]> {
  const all = await getAllPosts();
  return all
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
}
