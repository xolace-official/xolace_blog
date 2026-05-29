# AGENTS.md — Xolace Blog (`xolace-blog`)

> Read this entire file before writing any code, creating any file, or making any decision. This file is the source of truth for everything about this project. If an instruction here conflicts with what you would normally do, follow this file. If something is not covered here, default to restraint — do less, not more.

---

## What Xolace is — read this first

**Company:** Xolace Inc., built in Accra, Ghana.

**Tagline:** *Emotional Infrastructure*

**One-line description:** A quiet place to be human. Not a feed. Not a clinic. The space before, between, and outside therapy.

**The problem Xolace solves:** There is a moment most people know but never talk about. You're lying in bed. Something is sitting on your chest — not a crisis, just a weight. You don't know what to call it. You don't have anyone to call about it. You don't think it's bad enough for therapy. So you scroll. Or you push it down. Or you tell yourself you'll deal with it tomorrow. Xolace is built for that moment — the moment before you know what you need.

**What Xolace is not:** Not therapy. Not a chatbot. Not a journaling app. Not a social platform. Not a feed. The space before, between, and outside all of those.

**The mascot:** Flux — a small flame-shaped character. Referenced on the marketing site. Not used as a decorative element inside the blog.

**The three core features of the app:**

- **Mirror** — You arrive with a feeling that has no shape. Tap a word, type a fragment, or just speak. Mirror gives it back to you, named. Words for what you couldn't say.
- **Echo** — After your session, an anonymous moment surfaces — shared by someone who felt the same shape. Not advice. Just: you're not alone in it tonight.
- **Safety** — If what you write suggests real danger, Mirror responds differently — gently, with real help nearby. A safe place doesn't leave you alone.

**Privacy promises Xolace makes to users:**
- Encrypted in transit and at rest
- No human at Xolace reviews what you write
- Your name is never attached to anything — you are not a profile
- No followers, no feed, nothing to perform
- No ads, no data sold. Ever. The trust is the product.

**The founding team:**
- Nathaniel Edem Adama — CEO & Co-founder
- Andrew Nana Beniako — CMO & Co-founder
- Emmanuel Acquah — COO & Co-founder
- Emmanuel Somuah — CTO & Co-founder

**Contact emails:**
- General: hello@xolaceinc.com
- Press: press@xolaceinc.com
- Support: support@xolace.com

**App Store links:**
- iOS: https://apps.apple.com/gh/app/xolace/id6761601429
- Android: https://play.google.com/store/apps/details?id=com.xolaceincorg.xolace

**Social presence:** LinkedIn, Instagram (@xolaceinc), TikTok (@talk.with.xolace), YouTube (@xolace), WhatsApp Channel, Snapchat (@xolace)

---

## What this repo is

`xolace-blog` is the reading layer for Xolace — the long-form editorial extension of the brand. It lives at `read.xolace.com` and publishes essays about emotional experience, the articulation of feeling, and the territory Xolace operates in.

This is not a standard product blog. It is a literary, editorial space. Every design and engineering decision must serve the reading experience. Nothing else.

The blog is one repo inside the Xolace GitHub organization. Other repos include `xolace-mobile`, `xolace-official-website`, `xolace-ambassadors`, and others. This repo is standalone — it does not import from or depend on any other Xolace repo.

---

## The brand voice, precisely

Xolace is quiet, literary, warm, and restrained. The voice is precise and honest — never falsely deep, never motivational, never clinical. It names feelings other brands don't have the courage to name, and it does so without overpromising.

Reference brands for tone and aesthetic: the Paris Review, Aesop, Mubi, Penguin Books. Warm and considered without being loud.

The blog extends this voice into long-form writing. Every line of code and copy must feel like it belongs in this space.

**The brand in the founder's own words:** *"We built the room we couldn't find."* — Nathaniel, CEO.

---

## Hard rules — never violate these

1. **No generic wellness content.** No listicles. No "5 signs of anxiety." No motivational quotes. No copy that reads like a wellness Instagram account.
2. **Responsive grid layouts are allowed on listing pages.** Post listings use a 3-column grid on desktop, 2 on tablet, 1 on mobile. Individual post reading pages remain single-column.
3. **No hardcoded color values anywhere in component files.** Every color must come from the design tokens defined in `globals.css`. See the color section below.
4. **Body text must be at least 18px on desktop.** Literary reading experience requires generous type.
5. **No animations beyond gentle opacity fade-in on scroll.** No bounces, slides, parallax, or transforms.
6. **No third-party chat widgets, cookie banners that take over the screen, exit-intent modals, or email popups.** None of these. Ever.
7. **No `any` in TypeScript.** Every type must be explicitly defined. No exceptions.
8. **No inline styles.** Use Tailwind semantic utility classes or `styles/prose.css`. Never `style={{}}`.
9. **No content that has not been explicitly approved in the `content/posts/` directory.** Do not generate or invent blog post content.
10. **No changes to `components/ui/`** unless the task is explicitly about shadcn component updates. These are auto-generated by shadcn and should not be hand-edited.
11. **Copy must match the brand voice.** Button labels, empty states, error messages, subscribe prompts — all must sound like Xolace. See the voice section below.
12. **Line length for body text must not exceed 680px.** Content columns are narrow by design. Do not widen them.
13. **Any value used more than once — spacing, font size, border radius, transition duration — must be defined as a CSS custom property in `globals.css` and referenced from there.** No repeated magic numbers across component files.
14. **Write code for humans.** Avoid unnecessary vertical boilerplate comments (e.g., `{/* Desktop nav */}`, `{/* Logo */}`). The codebase should not look machine-generated. When comments are needed to explain complex logic, use standard `//` or `/* */` styles. Do not write generic comments that explain the obvious.
15. **Use standard hyphens.** Avoid using em-dashes (`—`) or double hyphens (`--`) in text and titles. Use a single standard hyphen (`-`).

---

## Colors and design tokens — read this carefully

### The single source of truth is `globals.css`

**Before using any color, spacing, or visual token in any component, look it up in `globals.css` first.**

All design tokens are defined there as CSS custom properties using the OKLCH color format and mapped to Tailwind v4 via the `@theme inline` block. Do not define colors anywhere else. Do not use hardcoded hex, RGB, or OKLCH values in component files. Always reference the token.

The project uses a **semantic token system**. You never reference a raw value like `oklch(0.6726 0.2904 341.4084)` in a component. You reference what it *means*: `text-primary`, `bg-background`, `text-muted-foreground`, and so on.

### How the token system works

**Level one — raw values in `:root` and `.dark`:**
Actual color values in OKLCH. Change between light and dark mode. Never use these directly in components.

**Level two — semantic CSS variables in `@theme inline`:**
Maps raw values to semantic names Tailwind understands. These are what you use in class names.

**Level three — Tailwind utility classes:**
`--color-background` becomes `bg-background`. `--color-foreground` becomes `text-foreground`. `--color-primary` becomes `bg-primary`, `text-primary`, `border-primary`.

### Semantic tokens — use these in every component

Read `globals.css` to get the exact current values. The semantic names and intended use:

| Token | Tailwind class | Use for |
|---|---|---|
| `--color-background` | `bg-background` | Page and section backgrounds |
| `--color-foreground` | `text-foreground` | Primary body and heading text |
| `--color-primary` | `bg-primary`, `text-primary`, `border-primary` | Brand accent — links, buttons, key emphasis |
| `--color-primary-foreground` | `text-primary-foreground` | Text on primary-colored backgrounds |
| `--color-secondary` | `bg-secondary` | Subtle secondary surfaces |
| `--color-secondary-foreground` | `text-secondary-foreground` | Text on secondary backgrounds |
| `--color-muted` | `bg-muted` | Muted background surfaces |
| `--color-muted-foreground` | `text-muted-foreground` | Captions, metadata, timestamps, footer text |
| `--color-accent` | `bg-accent`, `text-accent` | Highlight color for interactive elements |
| `--color-accent-foreground` | `text-accent-foreground` | Text on accent backgrounds |
| `--color-border` | `border-border` | All borders and dividers |
| `--color-input` | `border-input` | Form input borders |
| `--color-ring` | `ring-ring` | Focus rings on interactive elements |
| `--color-destructive` | `bg-destructive`, `text-destructive` | Error states only |
| `--color-card` | `bg-card` | Card backgrounds if used |
| `--color-card-foreground` | `text-card-foreground` | Text inside cards |

### Font tokens — also from `globals.css`

The `@theme inline` block defines:
- `--font-sans` → `font-sans` in Tailwind — body text
- `--font-serif` → `font-serif` in Tailwind — headings
- `--font-mono` → `font-mono` in Tailwind — code if needed

Always use `font-serif` for headings and `font-sans` for body text. Never hardcode a font family in a component. Font changes happen in `globals.css` only.

### Adding new tokens

If a new reusable value is needed — spacing, shadow, transition duration, z-index — add it as a CSS custom property in `globals.css` inside `@theme inline`, then reference it everywhere. Never define it locally in a component.

### Never do these things with color

- Never write `text-[#somecolor]` or any hardcoded color as a Tailwind arbitrary value
- Never write `color: oklch(...)` directly in a component
- Never write `backgroundColor: '...'` as an inline style
- Never define a new color in a component's own CSS that is not in `globals.css`

---

## Tech stack

| Layer | Technology                                                    |
|---|---------------------------------------------------------------|
| Framework | Next.js 16 (App Router, Turbopack)                            |
| Language | TypeScript — strict mode, no `any`                            |
| Styling | Tailwind CSS v4                                               |
| Components | shadcn/ui + Radix UI                                          |
| Animation | Motion (`motion/react`)                                       |
| Smooth scroll | Lenis (`lenis/react`)                                         |
| Content | MDX files in `content/posts/`                                 |
| Database | Convex (posts metadata, subscribers)                          |
| Email | Resend                                                        |
| Fonts | Defined in `globals.css` via `--font-serif` and `--font-sans` |
| Deployment | Vercel                                                        |

Do not introduce new dependencies without a clear reason.

---

## File and folder structure

```
xolace-blog/
├── app/
│   ├── (blog)/
│   │   ├── layout.tsx                  # Blog layout — header, footer, reading container
│   │   ├── page.tsx                    # Post listing — read.xolace.com (imports from components/pages/)
│   │   └── [slug]/
│   │       └── page.tsx                # Single post — read.xolace.com/[slug]
│   ├── (admin)/
│   │   ├── layout.tsx                  # Admin layout — protected, separate from blog
│   │   └── dashboard/
│   │       └── page.tsx                # Future editor dashboard
│   ├── api/
│   │   ├── subscribe/
│   │   │   └── route.ts                # POST — email subscription
│   │   └── posts/
│   │       └── route.ts                # GET — posts metadata if needed externally
│   ├── layout.tsx                      # Root layout — fonts, themes, Lenis provider
│   ├── not-found.tsx                   # 404 page — in brand voice
│   └── globals.css                     # ALL design tokens live here — source of truth
│
├── components/
│   ├── ui/                             # shadcn auto-generated — do not hand-edit
│   ├── layout/
│   │   ├── site-header.tsx             # Wordmark + minimal navigation
│   │   ├── site-footer.tsx             # Tagline, links, "Made in Accra"
│   │   └── reading-progress.tsx        # Subtle scroll progress indicator
│   ├── pages/                          # Assembled page components (imported by app/ routes)
│   │   └── home/
│   │       └── home-page.tsx           # Landing page assembly
│   ├── mdx/
│   │   ├── mdx-components.tsx          # Custom MDX component mappings
│   │   ├── mirror-reflection.tsx       # Mirror-style blockquote
│   │   ├── pull-quote.tsx              # Large pull quote
│   │   └── callout.tsx                 # Subtle callout block
│   └── subscribe/
│       ├── subscribe-form.tsx          # Email input + submit
│       └── subscribe-banner.tsx        # Inline subscribe prompt inside posts
│
├── features/                           # Feature-specific components grouped by domain
│   └── home/
│       ├── hero-section.tsx            # Hero with title + subscribe
│       ├── post-card.tsx               # Post card with thumbnail, meta, tags
│       ├── post-list.tsx               # Responsive 3-column post grid
│       └── pagination.tsx              # Page navigation controls
│
├── content/
│   └── posts/
│       └── [slug].mdx                  # All essays as MDX files
│
├── lib/
│   ├── posts.ts                        # MDX reading, parsing, sorting, filtering
│   ├── dummy.ts                        # Dummy post data for development
│   ├── validations/
│   │   └── subscribe.ts                # Zod schema for email subscription
│   └── utils.ts                        # cn() helper and shared utilities
│
├── hooks/
│   ├── use-reading-time.ts
│   └── use-scroll-progress.ts
│
├── types/
│   ├── post.ts
│   └── subscriber.ts
│
├── styles/
│   └── prose.css                       # MDX reading typography — references globals.css tokens only
│
├── public/
│   └── images/
│       └── og/                         # Open Graph images per post — 1200x630px
│
├── .env.local                          # Never commit
├── .env.example                        # Always commit — empty values only
├── AGENTS.md                           # This file
├── components.json                     # shadcn config
├── middleware.ts                       # Auth protection for (admin) route group
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Folder conventions

| Folder | Purpose |
|---|---|
| `components/layout/` | Shared layout components — header, footer, progress bar |
| `components/pages/` | Assembled page components. Each page gets a subfolder (e.g., `home/home-page.tsx`). Imported by `app/` route files. |
| `components/ui/` | shadcn auto-generated — do not hand-edit |
| `features/<domain>/` | Feature-specific components grouped by domain (e.g., `features/home/`, `features/post/`). Contains the building blocks that page assemblies compose. |
| `lib/` | Utility functions, data, and validation schemas |
| `types/` | TypeScript type definitions |

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Files and folders | `kebab-case` | `post-card.tsx`, `use-reading-time.ts` |
| Exported components | `PascalCase` | `PostCard`, `MirrorReflection` |
| Types and interfaces | `PascalCase` | `PostMetadata`, `Post`, `Subscriber` |
| Functions in `lib/` | `camelCase` | `getAllPosts`, `getPostBySlug` |
| Hooks | `camelCase` with `use` prefix | `useReadingTime`, `useScrollProgress` |
| Database tables | `snake_case` | `blog_posts`, `blog_subscribers` |
| MDX filenames | `kebab-case` matching slug | `on-carrying-something.mdx` |
| Environment variables | `SCREAMING_SNAKE_CASE` | `RESEND_API_KEY` |
| Browser-exposed env vars | `NEXT_PUBLIC_` prefix | `NEXT_PUBLIC_SUPABASE_URL` |
| CSS custom properties | `--semantic-name` | `--color-primary`, `--font-serif` |

---

## MDX frontmatter schema

Every `.mdx` file in `content/posts/` must have this frontmatter:

```mdx
---
title: "On carrying something you cannot explain"
subtitle: "A feeling that has no shape yet"
publishedAt: "2026-06-01"
category: "vocabulary"
isPublished: true
readTimeMinutes: 6
---
```

**Field rules:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Sentence case, no trailing period |
| `subtitle` | string | No | One line, optional but recommended |
| `publishedAt` | string | Yes | ISO format: `YYYY-MM-DD` |
| `category` | string | Yes | One of the five categories below |
| `isPublished` | boolean | Yes | `false` for drafts — never renders publicly |
| `readTimeMinutes` | number | Yes | Estimated reading time in minutes |

**Post categories:**

| Value | Purpose |
|---|---|
| `vocabulary` | Essays that name emotional experiences without common words — the blog's most ownable territory |
| `founders` | Honest founder writing about building Xolace. Decisions made, things learned, questions still open |
| `mirror-voice` | Deeper explorations of the emotional territory a Mirror reflection maps |
| `territory` | Cultural and social pieces about the space Xolace operates in — stigma, silence, emotional culture in West Africa and beyond |
| `people` | First-person user stories with full consent. Published rarely, with editorial care |

---

All functions filter by `isPublished: true`. Draft posts never appear publicly.

---

## Types

### `types/post.ts`

```ts
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
```

### `types/subscriber.ts`

```ts
export type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
};
```

---



---

## Environment variables

### `.env.example` — commit this, no secrets

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://read.xolace.com
NEXT_PUBLIC_SITE_NAME=Xolace
```

Never commit `.env.local`. If you see it in staged changes, stop and remove it.

---

## Layout rules

- **Content max-width: 680px** for all reading content. Never wider.
- **Page container max-width: 1200px** for outer wrapper.
- **Section spacing: 120–160px between sections on desktop, 80–100px on mobile.**
- **Paragraph spacing: 24–32px between paragraphs inside a post.**
- **Mobile side margins: minimum 24px.**
- **Post listing pages use a responsive grid:** 3 columns on desktop, 2 on tablet, 1 on mobile. Individual post reading pages remain single-column at max 680px.
- **Reusable layouts:** Structure page section grids using standard generic CSS classes defined in `globals.css` (e.g. `.layout-container`, `.content-grid`) instead of composing hardcoded spacing tailwind strings repeatedly, ensuring structural layout changes affect the whole app uniformly.

---

## Component rules

### `site-header.tsx`
- Wordmark on the left, maximum two nav links on the right.
- Nav links: `Manifesto` and `For Institutions` only. No About, FAQ, or Ambassadors in the top bar.
- No CTA button in the header.
- Wordmark links to `https://xolaceinc.com`.

### `site-footer.tsx`
- The entire footer including the standalone CTA prompt area is wrapped in a full-width `bg-primary` block.
- Text uses `text-primary-foreground` variations.
- Contact email in footer if needed: hello@xolaceinc.com

### `post-card.tsx`
- Shows: thumbnail image (placeholder gradient when no image), author/source label, date, title, subtitle/excerpt, category badge, read time.
- On hover: title shifts toward `text-primary`, 150ms ease. Nothing else moves.
- Displayed in the responsive grid defined by `post-list.tsx`.

### `mirror-reflection.tsx`
The most important custom MDX component. This is what makes the blog feel like Xolace.

Named after the Mirror feature inside the app. Renders a blockquote that looks and feels like a Mirror reflection from the product.

- 2px left border using `border-primary`
- 24px left padding from the border
- Text in `font-sans` at 21–22px desktop, `text-foreground`
- No CSS-added quotation marks
- Optional attribution in `text-muted-foreground`, italic

Usage in MDX:
```mdx
<MirrorReflection>
  Something's activated but there's nothing to show for it, just this restless
  static and underneath it an openness that feels more like exposure than relief.
</MirrorReflection>
```

### `subscribe-form.tsx`
- One email input, one submit button, nothing else.
- Input placeholder: *"your@email.com"*
- Button label: *"Keep me here"*
- Below button in `text-muted-foreground` 14px: *"A few essays a year, when we have something worth saying. No newsletters. No marketing."*
- Success: *"You're in. We'll write when we have something worth saying."*
- Error: *"Something went wrong. Try again or email us at hello@xolaceinc.com"*
- Validate with Zod schema in `lib/validations/subscribe.ts` before submitting.

---

## `styles/prose.css` — MDX reading typography

Scoped to `.prose` class inside `post-body.tsx`. Every color references a token from `globals.css`. No hardcoded values.

```css
.prose {
  font-family: var(--font-sans);
  font-size: 19px;
  line-height: 1.65;
  color: var(--color-foreground);
  max-width: 680px;
}

.prose p { margin-bottom: 28px; }

.prose h2 {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 400;
  margin-top: 56px;
  margin-bottom: 20px;
  color: var(--color-foreground);
}

.prose h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  margin-top: 40px;
  margin-bottom: 16px;
  color: var(--color-foreground);
}

.prose a {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--color-primary);
  transition: opacity 150ms ease;
}

.prose a:hover { opacity: 0.7; }

.prose blockquote {
  border-left: 2px solid var(--color-primary);
  padding-left: 24px;
  margin-left: 0;
  font-size: 21px;
  color: var(--color-foreground);
}

.prose hr {
  border: none;
  border-top: 1px solid var(--color-border);
  opacity: 0.3;
  margin: 56px 0;
}
```

---

## Motion and animation

- Sections fade in on scroll via `motion/react` `whileInView`. Opacity `0` to `1` only. Duration 600ms, ease-out. `viewport={{ once: true, margin: "-10%" }}`.
- First visible element on any page renders immediately — no fade in.
- No transform animations. Never use `y`, `x`, `scale`, `rotate` in `whileInView`.
- Hover transitions: 150–200ms ease, color shifts only.
- Lenis: `"use client"` provider at root layout. Duration 1.2, smoothWheel true. Touch disabled by default.
- No page transitions. Native browser navigation only.

---

## Server vs client components

- Default to Server Components.
- Mark `"use client"` only for: Motion wrappers, Lenis provider, subscribe form, reading progress indicator.
- Never `"use client"` on layouts or pages unless unavoidable.
- Data fetching in Server Components only. No `useEffect` data fetching.
- `generateStaticParams` on `app/(blog)/[slug]/page.tsx`.
- `generateMetadata` on both listing and single post pages.

---

## SEO and metadata

### Root layout

```ts
export const metadata: Metadata = {
  title: {
    default: 'Xolace — Read',
    template: '%s — Xolace',
  },
  description: "Essays and words for what's hard to carry.",
  openGraph: {
    siteName: 'Xolace',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};
```

### Post page

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [`/images/og/${params.slug}.png`],
    },
  };
}
```

---

## `not-found.tsx`

In brand voice. Not generic.

```tsx
export default function NotFound() {
  return (
    <main>
      <h1>This page doesn't exist.</h1>
      <p>But if you're looking for words, we have some.</p>
      <Link href="/">Back to reading →</Link>
    </main>
  );
}
```

---

## Voice — all UI copy must match this

**Rules:**
- Short sentences. Most under 15 words.
- Plain language. Never marketing-speak.
- No "amazing", "powerful", "innovative", "cutting-edge", "seamless".
- CTAs are invitations, not commands.
- Error messages are honest and human, not apologetic corporate language.

**Correct:**

| Context | Copy |
|---|---|
| Subscribe button | *Keep me here* |
| Subscribe success | *You're in. We'll write when we have something worth saying.* |
| Subscribe error | *Something went wrong. Try again or email us at hello@xolaceinc.com* |
| Empty state | *Nothing here yet. We write slowly, on purpose.* |
| Loading | *Reading...* |
| 404 | *This page doesn't exist. But if you're looking for words, we have some.* |
| Back to listing | *All essays →* |

**Wrong — never use:**

| Wrong | Why |
|---|---|
| *Subscribe to our newsletter!* | Exclamation mark, newsletter framing |
| *Stay up to date with the latest from Xolace* | Corporate, generic |
| *Oops! Something went wrong 😅* | Emoji, false cheerfulness |
| *Discover more articles* | SaaS-y |
| *Your wellness journey starts here* | Violates every principle above |

---

## What the admin route is for

`app/(admin)/` is protected by middleware and reserved for a future non-technical editor dashboard. At this stage build only the route protection — redirect unauthenticated users away from `/dashboard`. The dashboard page is a placeholder. Do not build the full editor interface until explicitly requested.

---

## What not to build unless explicitly asked

- Dark mode toggle or visible theme switcher
- Search functionality
- Comment system of any kind
- Social sharing buttons with platform logos
- Gamification — reading streaks, badges, public read counts
- Push notifications
- Cookie consent banner unless legally required and explicitly requested
- Any third-party analytics script beyond what is already in the project
- Loud reading progress bar
- Related posts grid with thumbnails — text only if added at all

---

## Before writing any code — three questions

1. **Does this serve the reading experience?** If not clearly yes, do not build it.
2. **Does this use tokens from `globals.css`?** If you are reaching for a hardcoded value, stop.
3. **Is this the simplest version that works?** If a simpler path exists, take it.

If you are unsure about anything not covered here, default to restraint. Do less. Leave room for a human decision.

---

*End of AGENTS.md*