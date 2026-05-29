export type PostCategory =
  | 'vocabulary'
  | 'founders'
  | 'mirror-voice'
  | 'territory'
  | 'people';

export type PostFrontmatter = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  category: PostCategory;
  isPublished: boolean;
  readTimeMinutes: number;
};

export type PostMetadata = PostFrontmatter & {
  slug: string;
};

export type Post = PostMetadata & {
  content: React.ReactElement;
};
