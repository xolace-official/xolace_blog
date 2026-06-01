export type PostCategory =
  | 'vocabulary'
  | 'founders'
  | 'mirror-voice'
  | 'territory'
  | 'people';

export type PostMetadata = {
  slug: string;
  title: string;
  subtitle?: string;
  publishedAt: string;
  category: PostCategory;
  isPublished: boolean;
  readTimeMinutes: number;

  imageUrl?: string;
  content?: string;
};
