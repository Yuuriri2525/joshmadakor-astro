import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

// ブログコレクション（SolutionDesign §6）
// WordPress から変換した Markdown を src/content/blog/ に配置する。
// URL は投稿ID形式 /blog/{id}/ を維持するため、frontmatter に数値 `id` を必須で持たせ、
// blog/[id].astro の getStaticPaths がこの id からパスを生成する。
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      // WordPress 投稿ID。旧URL /blog/{id}/ を維持するためのキー（一意・必須）
      id: z.number(),
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // 画像は src/assets/images/blog/ に取り込み、Astro Image で最適化（任意）
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
