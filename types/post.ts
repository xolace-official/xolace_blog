export type PostCategory =
    | 'vocabulary'
    | 'founders'
    | 'mirror-voice'
    | 'territory'
    | 'people';

export type PostAuthor = {
  name: string;
  imageUrl?: string;
};

export type PostMetadata = {
  slug: string;
  title: string;
  subtitle?: string;
  publishedAt: string;
  category: PostCategory;
  isPublished: boolean;
  readTimeMinutes: number;
  authors: PostAuthor[];
  imageUrl?: string;
  isGuest: boolean;
  sourceName?: string;
  sourceUrl?: string;
};

export type Post = PostMetadata & {
  content: string;
};