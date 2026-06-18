# CLAUDE.md
# joshmadakor.tech Astro プロジェクト

このファイルは Claude（および各種コーディングエージェント）がこのリポジトリで作業する際の挙動設定・規約をまとめたものです。設計上の最終的な真実の源は `SolutionDesign.md` です。本ファイルと矛盾する場合は `SolutionDesign.md` を優先してください。

---

## プロジェクト概要

joshmadakor.tech を WordPress/Elementor（HostGator）から Astro 静的サイト（SSG）へ移行するプロジェクト。先行する lognpacific.com の Astro 移行（`lognpacific-astro`）と**同一の技術スタック・規約**を踏襲します。

- **プロジェクト名:** joshmadakor.tech Migration to Astro
- **サイトオーナー:** Josh Madakor (CEO)
- **開発:** Yu (Front-end Developer, LogN Pacific)
- **URL:** https://joshmadakor.tech
- **ホスティング:** Cloudflare Pages（無料プラン）
- **フレームワーク:** Astro（SSG mode）
- **目標:** 高速・低コスト・保守容易な静的サイト。Lighthouse 全項目 90+（lognpacific.com 同等）

---

## アーキテクチャ要約

| 領域 | 採用技術 | 備考 |
|------|---------|------|
| フレームワーク | Astro 6（SSG） | `package.json`: `astro@^6.2.2` |
| スタイリング | Tailwind CSS 4 | `@tailwindcss/vite` プラグイン経由（`astro.config.mjs`） |
| インタラクティブ | React 19（Islands） | `@astrojs/react`。メニュー・フォームのみ |
| サイトマップ | `@astrojs/sitemap` | ビルド時に自動生成 |
| 言語 | TypeScript（strict） | `tsconfig.json` で `astro/tsconfigs/strict` を継承 |
| デプロイ | Cloudflare Pages（無料） | Git連携で自動ビルド・デプロイ |
| フォーム | Web3Forms | `ContactForm.tsx`（React island） |
| 画像最適化 | Astro Image | `src/assets/images/`（ブログ画像は `blog/`） |
| アナリティクス | GA4 `G-FYR95RLQXY` | `BaseLayout.astro` にインライン直書き |

**Islands Architecture の方針:** Astro をメインフレームワークとし、ページは原則ゼロ JS の `.astro` で作る。React はインタラクティブ部分（現状 `MobileMenu` / `ContactForm`）に限定する。

---

## ディレクトリ構成

```
joshmadakor-astro/
├── public/                       # 静的ファイル（そのままコピー）
├── src/
│   ├── components/               # 再利用コンポーネント
│   │   ├── Header.astro          # ヘッダー・ナビゲーション
│   │   ├── Footer.astro          # フッター
│   │   ├── MobileMenu.tsx        # React island（モバイルメニュー）
│   │   └── ContactForm.tsx       # React island（Web3Forms フォーム）
│   ├── layouts/
│   │   └── BaseLayout.astro      # 共通レイアウト（meta / OGP / GA4 直書き）
│   ├── pages/                    # ファイルベースルーティング
│   │   ├── index.astro           # / （ホーム）
│   │   ├── cyber.astro           # /cyber （長尺LP）
│   │   └── blog/
│   │       ├── index.astro       # /blog/ （一覧）
│   │       └── [id].astro        # /blog/{id}/ （個別記事・ID形式URL）
│   ├── content/
│   │   └── blog/                 # ブログ記事 Markdown（*.md）
│   ├── content.config.ts         # Content Collections 定義（blog）
│   ├── assets/
│   │   └── images/blog/          # Astro Image で最適化される画像
│   └── styles/
│       └── global.css            # `@import "tailwindcss";` のみ
├── astro.config.mjs              # Astro 設定（Tailwind / React / Sitemap）
├── tsconfig.json                 # TypeScript（strict）
├── package.json                  # vite を overrides で ^7 に固定
├── .env.example                  # 環境変数の雛形
├── SolutionDesign.md             # 設計の真実の源
└── CLAUDE.md                     # このファイル
```

> 補足: `src/content/blog/` には現在サンプル記事（`sample-*.md`）が入っている。本番の 61 記事は WordPress からの変換後に配置する（`SolutionDesign.md` §6）。

---

## コーディング規約

### ファイル命名規則
- **ページ（`src/pages/`）:** kebab-case + `.astro`（例：`cyber.astro`）。動的ルートは `[param].astro`（例：`blog/[id].astro`）
- **コンポーネント（`src/components/`）:** PascalCase
  - Astro コンポーネント：`Header.astro`, `Footer.astro`
  - React コンポーネント：`MobileMenu.tsx`, `ContactForm.tsx`
- **ブログ記事（`src/content/blog/`）:** `.md`

### コンポーネントの選び方
- **既定は `.astro`（ゼロ JS）。** 新規 UI は原則 Astro コンポーネントで作る
- **インタラクティブな部分のみ `.tsx`（React）。** 状態・イベント・クライアント処理が必要なときだけ

### React（Islands）の使い方
React コンポーネントを `.astro` から使う際は **hydration directive 必須**（`client:load` / `client:visible` / `client:idle` など）。指定しないと静的 HTML として描画され、インタラクティブにならない。

```astro
---
import MobileMenu from '../components/MobileMenu.tsx';
---
<header>
  <MobileMenu client:load />
</header>
```

### Astro ファイルの構造
```astro
---
// フロントマター（TypeScript）
interface Props { title: string }
const { title } = Astro.props;
---
<div class="container">
  <h1>{title}</h1>
</div>
```

### スタイリング（Tailwind CSS 4）
- **Tailwind ユーティリティクラスを優先。** 新規 CSS ファイル・CSS-in-JS は原則作らない
- `src/styles/global.css` は **`@import "tailwindcss";` の1行のみ**に保つ。ここに独自 CSS を足さない
- レスポンシブは `sm:` / `md:` / `lg:` プレフィックスを活用

---

## ブログ（Content Collections）の規約 ★重要

ブログは Astro Content Collections へ完全移行する（`SolutionDesign.md` §6）。**旧 WordPress の投稿ID形式URL `/blog/{id}/` を維持**するのが最重要ポイント。

### 定義（`src/content.config.ts`）
- `blog` コレクションを `glob` ローダーで `src/content/blog/**/*.md` から読み込む
- **`z`（zod）は `astro:schema` から import する**（`import { z } from 'astro:schema';`）。`zod` を直接 import しない
- schema フィールド:

| フィールド | 型 | 必須/既定 | 用途 |
|-----------|----|---------|------|
| `id` | `z.number()` | **必須** | 旧URL `/blog/{id}/` を維持するキー（一意） |
| `title` | `z.string()` | 必須 | 記事タイトル |
| `description` | `z.string().optional()` | 任意 | meta description 等 |
| `pubDate` | `z.coerce.date()` | 必須 | 公開日 |
| `updatedDate` | `z.coerce.date().optional()` | 任意 | 更新日 |
| `heroImage` | `image().optional()` | 任意 | `src/assets/images/blog/` の画像（Astro Image 最適化） |
| `tags` | `z.array(z.string()).default([])` | 既定 `[]` | タグ |
| `draft` | `z.boolean().default(false)` | 既定 `false` | `true` はビルド除外 |

### URL生成（`src/pages/blog/[id].astro`）
- `getStaticPaths` が `getCollection('blog', ({ data }) => !data.draft)` でドラフトを除外し、`params: { id: String(post.data.id) }` で `/blog/{id}/` を生成する
- **`draft: true` の記事はビルド対象外**になり、sitemap にも含まれない
- 記事を追加するときは frontmatter に必ず数値 `id` を持たせること。`id` が抜けるとビルドが型エラーになる

> 注: ブログ本文の `.prose` 整形は未対応。`@tailwindcss/typography` はフェーズ4で導入予定（`[id].astro` に TODO コメントあり）。

---

## GA4（アナリティクス）

- 測定ID **`G-FYR95RLQXY`** を `src/layouts/BaseLayout.astro` に **`<script is:inline>` でインライン直書き**している
- これは joshmadakor.tech 専用プロパティ。lognpacific.com の `G-1QFCKBJ47H` とは**別プロパティ**なので混同しない
- 測定IDは公開値のため**環境変数化しない**（差し替えるときは `BaseLayout.astro` を直接編集）

---

## シークレット管理

- 環境変数で管理が必要な秘密は **Web3Forms アクセスキー（`PUBLIC_WEB3FORMS_KEY`）のみ**
- `ContactForm.tsx` が `import.meta.env.PUBLIC_WEB3FORMS_KEY` で参照する
- 実際の値は **`.env.local`（git 管理外）** に置く。`.env.example` が雛形
- `.env.local` や鍵をコミットしないこと。GA4 IDは公開値なので秘密扱いしない（上記参照）

---

## 開発／ビルドコマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルプレビュー |
| `npm run check` | `astro check`（型チェック） |

### 品質ゲート（自動テストは無し）
このプロジェクトに自動テストはありません。コミット／デプロイ前の品質ゲートは次の3点:

1. **`npm run build` がエラーなく通る**
2. **`npm run check` が 0 errors**（zod v4 / React 19 由来の非推奨 hint は許容）
3. **Yu の目視確認**（見た目・レスポンシブ・リンク切れ）

Lighthouse は全ページ 90+ を目標（`SolutionDesign.md` §10）。

---

## CI/CD・デプロイ

- **GitHub Actions の workflow ファイルは作らない**
- **Cloudflare Pages の Git連携**で `main` への push を検知し、自動ビルド・デプロイ
  - build command: `npm run build`
  - output directory: `dist`
- プレビューは `joshmadakor-astro.pages.dev`（仮）。本番確認後に joshmadakor.tech の DNS を Cloudflare Pages へ向ける
- 旧URLが変わる箇所のみ Cloudflare Pages の `_redirects` で対応（ブログはID形式URL維持のため原則不要）

---

## プロジェクト固有の制約・注意点

- **vite のメジャー固定:** `package.json` の `overrides` で `vite: ^7` に固定している。`@tailwindcss/vite` と `@astrojs/react` が vite 8 / rolldown を引き込むとビルドが壊れるため。**むやみに外さない・上げない**
  - 関連して `astro.config.mjs` の `plugins: [tailwindcss()]` には `@ts-ignore` が付いている（別メジャーの vite 解決による Plugin 型の食い違いを抑制。ランタイムには影響しない）
- **Exams 入口:** 当面は lognpacific.com の practice tests への**外部リンク**（`SolutionDesign.md` §5）。joshmadakor.tech の新ページ完成後に内部URLへ差し替える
- **検索機能は実装しない**（`SolutionDesign.md` §9 Q4）
- **ロゴ:** 現状はテキストワードマーク。実ロゴ資産は後続フェーズで差し替え予定
- **`@tailwindcss/typography` は未導入。** ブログ本文の `.prose` 整形はフェーズ4で導入予定
- IT Training は coursecareers.com への外部リンク（移行対象外）

---

## 参考リンク

- [Astro Documentation](https://docs.astro.build/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Web3Forms Documentation](https://web3forms.com/documentation)
- 既存サイト: https://joshmadakor.tech / 兄弟プロジェクト: https://lognpacific.com

---

## トラブルシューティング

### ビルドが壊れる / vite 関連の型・依存エラー
`package.json` の `overrides.vite` が `^7` のままか確認。誤って外した・上げた場合は戻す。それでも直らなければ依存を入れ直す:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### `npm run check` でエラーが出る
- ブログ記事の frontmatter に数値 `id` があるか、`pubDate` が日付として解釈できるか確認
- zod v4 / React 19 由来の**非推奨 hint（warning）は許容**。0 errors であれば合格

### Tailwind が効かない
- `src/styles/global.css` が `BaseLayout.astro` から import されているか確認
- `global.css` は `@import "tailwindcss";` の1行のみであることを確認

### お問い合わせフォームが送信できない
- `.env.local` に `PUBLIC_WEB3FORMS_KEY` を設定したか確認（`.env.example` 参照）
- 環境変数を変えたら dev サーバーを再起動

### ブログ記事が表示されない
- `draft: true` になっていないか確認（ドラフトはビルド除外）
- ファイルが `src/content/blog/` 配下の `.md` か確認
