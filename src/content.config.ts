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

      // --- フェーズ4-4（ブログテンプレート）で追加 ---
      // カードのカテゴリバッジ用の単一カテゴリ（例: Cybersecurity / Career）。tags は併存。
      category: z.string().default('Uncategorized'),
      // 記事冒頭の埋め込み動画（YouTube URL）。無ければ heroImage を使用。
      youtube: z.string().url().optional(),
      // 任意のカード抜粋。未指定なら description を使う。
      excerpt: z.string().optional(),
      // 「Top 5 Reads」のおすすめ記事ID（最大5件・手動指定）。未指定なら新着5件にフォールバック。
      topReads: z.array(z.number()).max(5).default([]),
    }),
});

export const collections = { blog };
