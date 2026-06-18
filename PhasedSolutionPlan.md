# PhasedSolutionPlan.md
# WordPress → Astro 移行プロジェクト：joshmadakor.tech

> **役割 / Role:** `SolutionDesign.md`（確定設計＝真実の源）を実装フェーズに分解した進捗管理ドキュメント。
> **対象サイト:** joshmadakor.tech（WordPress + Elementor + HostGator → Astro 静的サイト）
> **更新日:** 2026/6/18
> 設計の根拠は常に `SolutionDesign.md`（§4 ページマッピング・§5 Exams・§6 ブログ移行・§9 決定ログ）を参照すること。

---

## 現在の進捗サマリー

- [x] フェーズ1：設計（lognpacific.com の Astro 移行で技術スタック・規約を実証）
- [x] フェーズ2：`SolutionDesign.md` 確定（全決定 Q1〜Q6 を解決）
- [x] フェーズ3：プロジェクトスキャフォールディング **✅ 完了（2026/6/18）**
- [ ] フェーズ4：ページ単位の本実装＋ブログ61件移行
- [ ] フェーズ5：SEO・パフォーマンス・フォーム動作確認
- [ ] フェーズ6：Cloudflare Pages 本番デプロイ・DNS切替

---

## フェーズ3：プロジェクトスキャフォールディング
**目標：** lognpacific-astro の構成・規約を踏襲し、ページ実装に着手できる足場を組む。
**状態：** ✅ 完了（2026/6/18）。`npm run build` で6ページ生成、`npm run check` 0 errors を確認済み。

### Group A：基盤・設定ファイル
- [x] `package.json`（name: `joshmadakor-astro`、`check` スクリプト追加、`overrides: { vite: ^7.3.5 }`、engines node >=22.12.0）
- [x] `astro.config.mjs`（`site: 'https://joshmadakor.tech'`、`react()` + `sitemap()` integration、`@tailwindcss/vite` plugin）
- [x] `tsconfig.json`（Astro strict 継承）
- [x] `.gitignore` / `.vscode/`（extensions.json・launch.json）
- [x] `src/styles/global.css`（Tailwind エントリ）
- [x] `public/robots.txt` / `public/favicon`
- [x] `.env.example`（Web3Forms アクセスキー等のプレースホルダー）
**メモ:** GA4 ID（`G-FYR95RLQXY`）は公開値（クライアントに露出する）であり秘密ではないため、`SolutionDesign.md` §8 の環境変数管理対象とはせず、lognpacific-astro と同様に BaseLayout へインライン直書きする（確定方針）。§8 の「リポジトリに直書きしない」対象は **Web3Forms アクセスキー（`PUBLIC_WEB3FORMS_KEY`）のみ**で、これは `.env.local`（git 管理外）で管理する。

### Group B：共通レイアウト・コンポーネント（lognpacific-astro から流用）
- [x] `src/layouts/BaseLayout.astro`（head・meta・OGP、GA4 `G-FYR95RLQXY` を直書き：joshmadakor.tech 専用プロパティ）
- [x] `src/components/Header.astro`（ナビ：Home / Cyber / Blog / Exams（外部リンク））
- [x] `src/components/Footer.astro`（リンク集・SNS・コピーライト）
- [x] `src/components/MobileMenu.tsx`（React island：ハンバーガーメニュー）
- [x] `src/components/ContactForm.tsx`（React island：Web3Forms 送信フォーム）

### Group C：ブログ基盤（Content Collections・SolutionDesign §6）
- [x] `src/content.config.ts`（blog コレクション定義。schema に **`id`（数値・必須）**・title・pubDate・description・heroImage・tags・draft）
- [x] `src/pages/blog/[id].astro`（`getStaticPaths` で **`/blog/{id}/` を維持**・`draft: true` を除外）
- [x] `src/pages/blog/index.astro`（一覧・新着順・draft 除外）
- [x] サンプル記事4件：`id:101`・`id:2265`・`id:88`（公開）＋ `id:999`（`draft: true`）
**メモ:** サンプル4件は足場検証専用。**フェーズ4のブログ本移行時に全削除**する。

### Group D：主要ページの足場
- [x] `src/pages/index.astro`（Home：hero + 4カードナビ + CONTACT セクションの骨子）
- [x] `src/pages/cyber.astro`（hero + 固定統計 **200+ / 3,500+ / 8,800+**）

### フェーズ3 検証実績
- [x] `npm run build` → **6ページ生成**（`/`、`/cyber/`、`/blog/`、`/blog/101/`、`/blog/2265/`、`/blog/88/`）
- [x] `draft: true`（`id:999`）がビルド・出力から除外されることを確認
- [x] `sitemap-index.xml` が公開記事のみ含むことを確認
- [x] `npm run check` → **0 errors**

---

## フェーズ4：ページ単位の本実装＋ブログ61件移行
**目標：** `SolutionDesign.md` §4 のページ優先度に沿って本実装する。各タスクは build 通過＋目視確認を完了条件とする。
**状態：** ⏭ 未着手

### タスク4-1：ホームページ（index.astro）本実装 — 優先度：高（F1）
- [ ] Elementor 版を忠実に再現（hero・キャッチコピー・CTA）
- [ ] 4カードナビ（Cyber / Blog / IT Exams / IT Training）を実装
- [ ] CONTACT セクション（ContactForm 配置）
- [ ] レスポンシブ・モバイルメニュー動作確認
**完了条件:** `npm run build` 通過・Yu による目視確認

### タスク4-2：/cyber 長尺LP 本実装 — 優先度：高（F2）
- [ ] hero・コース説明セクション
- [ ] 固定統計（**200+** Real Testimonials / **3,500+** Total Paid Students / **8,800+** Community Members、§9 Q6）
- [ ] テスティモニアル（手動コピー・固定値）
- [ ] FAQ セクション
**完了条件:** `npm run build` 通過・Yu による目視確認

### タスク4-3：ブログ61件 Content Collections 移行 — **独立タスク・最重要**（F3・§6）
- [ ] WordPress から WXR（エクスポートXML）を出力
- [ ] `wordpress-export-to-markdown` 等で61件を Markdown 変換し `src/content/blog/` へ配置
- [ ] 各記事の frontmatter に **`id`（投稿ID）**・title・pubDate・description・heroImage 等を付与
- [ ] 画像を `wp-content/uploads` から `src/assets/images/blog/` へ取り込み、Astro Image で最適化
- [ ] カテゴリ／タグの有無を確認し、必要なら一覧フィルタを検討
- [ ] **ID形式URL `/blog/{id}/` 維持**を確認（旧URL不変・リダイレクト不要）
- [ ] 61件を目視で検品（フォーマット崩れ・画像リンク）
- [ ] 内部／相互リンク（lognpacific.com ⇔ joshmadakor.tech）の総点検（§7）
- [ ] **サンプル4件（101/2265/88/999）を削除**
**完了条件:** 61件すべてが `/blog/{id}/` で生成・`npm run build` 通過・61件目視検品完了

### タスク4-4：ブログ一覧のページネーション＋本文整形
- [ ] `paginate()` を用いた `src/pages/blog/[page].astro` でページネーション実装
- [ ] `@tailwindcss/typography` を導入し記事本文（prose）を整形
**完了条件:** 各ページが正しく生成・`npm run build` 通過・目視確認

### タスク4-5：Exams は当面外部リンクのまま（§5・F4）
- [ ] ナビ「Exams」・ホーム「IT EXAMS」カードを `https://lognpacific.com/free-certification-practice-tests/` への外部リンクに維持
- [ ] （将来）joshmadakor.tech の新IT Examsページ完成時に、リンク先を内部URLへ差替（1〜2箇所）
**完了条件:** 外部リンクが正しく機能・目視確認

---

## フェーズ5：SEO・パフォーマンス・フォーム動作確認
**目標：** 本番運用に向けた品質確保。
**状態：** ⏭ 未着手

- [ ] `robots.txt` / `sitemap.xml`（公開記事のみ含むこと）の最終確認
- [ ] 各ページの meta description・OGP タグ設定
- [ ] `og-image.png`（共通OGP画像）を用意
- [ ] Lighthouse 全項目 **90+** を計測（Performance / Accessibility / Best Practices / SEO）
- [ ] Web3Forms 実送信テスト（メール到達確認）
- [ ] 内部・外部リンクの 404 検査（リンク切れ）
- [ ] レスポンシブ確認（モバイル / タブレット / デスクトップ）
- [ ] GA4 計測がブラウザで正しく発火するか確認（測定ID `G-FYR95RLQXY`・直書きで確定）

---

## フェーズ6：Cloudflare Pages 本番デプロイ・DNS切替
**目標：** 本番公開と HostGator からの切替。
**状態：** ⏭ 未着手

### タスク6-1：Cloudflare Pages セットアップ
- [ ] GitHub リポジトリへ push
- [ ] Cloudflare Pages に GitHub リポジトリを **Git連携**（build command: `npm run build`／output: `dist`）
- [ ] **GitHub Actions の workflow ファイルは作らない**（Cloudflare Pages の自動ビルドに任せる・§11）
- [ ] プレビューURL（`joshmadakor-astro.pages.dev` 仮）で動作確認

### タスク6-2：カスタムドメイン・DNS切替
- [ ] joshmadakor.tech の DNS を Cloudflare Pages へ向ける
- [ ] SSL証明書の自動発行確認

### タスク6-3：本番確認・解約
- [ ] 全ページ表示・フォーム動作の本番確認
- [ ] Google Search Console へサイトマップ送信
- [ ] WordPress / HostGator 解約（全移行・本番安定後）

---

## 決定済み事項（SolutionDesign §9 Q1〜Q6 要約）

| # | 項目 | 決定 | 備考 |
|---|---|---|---|
| Q1 | ブログ件数 | 61件・全件移行（案A：完全移行） | §6。Headless案は WP解約と矛盾のため不採用 |
| Q2 | ブログURL | 投稿ID形式 `/blog/{id}/` を維持 | リダイレクト原則不要・SEOリスク最小 |
| Q3 | Exams | 当面は外部リンク（lognpacific.com practice tests） | 新ページ完成後に内部URLへ差替（§5） |
| Q4 | 検索機能 | ❌ 省略（実装しない） | サイトをさらに軽量化 |
| Q5 | GA4 | 別プロパティ `G-FYR95RLQXY` | lognpacific.com の `G-1QFCKBJ47H` とは別 |
| Q6 | /cyber 統計値 | 固定値 200+ / 3,500+ / 8,800+ | 手動コピー（Real Testimonials / Total Paid Students / Community Members） |

---

## 備考・技術スタック（SolutionDesign §3 より）

- **フレームワーク:** Astro（SSG mode）
- **スタイリング:** Tailwind CSS（v4・`@tailwindcss/vite`）
- **インタラクティブ:** React（Islands：MobileMenu・ContactForm のみ）
- **デプロイ:** Cloudflare Pages（無料プラン）・Git連携で自動ビルド
- **フォーム:** Web3Forms
- **画像最適化:** Astro Image（`src/assets/images/`）
- **アナリティクス:** GA4（`G-FYR95RLQXY`）
- **IT Training:** coursecareers.com/joshmadakor への外部リンクのまま（移行不要・F5）

---

*移行ロードマップ全体:*
*フェーズ1: lognpacific.com 本番公開 → フェーズ2: joshmadakor.tech 設計確定 → フェーズ3: スキャフォールディング（完了）→ フェーズ4以降: 本実装・ブログ移行・デプロイ → 最終: WordPress/HostGator 解約*
