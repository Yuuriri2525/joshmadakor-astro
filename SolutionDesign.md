# SolutionDesign.md — joshmadakor.tech WordPress → Astro 移行

> **ステータス / Status:** 🟢 全決定確定（Q1〜Q6） — フェーズ3へ進行可能 / All decisions resolved — ready for Phase 3
> **フェーズ / Phase:** エージェンティックコーディングガイド フェーズ2（ソリューション設計）
> **作成日 / Created:** 2026-06-17
> **担当 / Owner:** Yu (Front-end Developer, LogN Pacific)
> **オーナー / Site Owner:** Josh Madakor (CEO)

---

## 0. このドキュメントについて / About This Document

このドキュメントは joshmadakor.tech を WordPress/Elementor から Astro 静的サイト（SSG）へ移行するための**設計の単一の真実の源（source of truth）**です。コードはまだ書きません。先行する lognpacific.com の Astro 移行（`lognpacific-astro`）と同じ技術スタック・規約を踏襲します。

*This is the source of truth for migrating joshmadakor.tech from WordPress/Elementor to an Astro static site. No code yet. It mirrors the stack and conventions already proven on the lognpacific.com migration.*

---

## 1. 問題定義 / Problem Statement

**何を解決するか / What problem are we solving?**

joshmadakor.tech は現在 WordPress + Elementor + HostGator で運用されており、以下の課題があります。

- **コスト / Cost:** HostGard + WordPress の継続課金（フェーズ4で解約予定）
- **パフォーマンス / Performance:** Elementor 由来の重い DOM・CSS で表示速度が落ちやすい
- **保守性 / Maintainability:** プラグイン依存・更新リスク・セキュリティパッチ運用が負担
- **一貫性 / Consistency:** lognpacific.com を Astro 化済みのため、2サイトの技術スタックを統一したい

**ゴール / Goal:** lognpacific-astro と同一構成で、高速・低コスト・保守容易な静的サイトへ移行する。Lighthouse は lognpacific.com 同等（90+/全項目）を目標。

---

## 2. 要件 / Requirements

### 2.1 機能要件 / Functional Requirements

| # | 要件 / Requirement | 備考 / Notes |
|---|---|---|
| F1 | ホームページ（ヒーロー + 4カードナビ + CONTACT） | Elementor版を再現・最適化 |
| F2 | Cyberコース LP（`/cyber`） | 長尺1ページ。統計（200+/3,500+/8,800+）・FAQ・テスティモニアルは手動コピー（固定値） |
| F3 | ブログ（`/blog/` + 個別記事 全61件） | ✅ Content Collections 完全移行・ID形式URL維持（§6） |
| F4 | Exams 入口 | ✅ 当面は外部リンク（lognpacific.com practice tests）。新ページ完成後に内部URLへ差替（§5） |
| F5 | IT Training は外部リンク | coursecareers.com/joshmadakor へ（移行不要） |
| F6 | お問い合わせ機能 | Web3Forms（lognpacific.com と同方式） |
| F7 | SNSリンク | LinkedIn / YouTube / X / Instagram |
| F8 | 検索機能 | ❌ 省略（実装しない）→ さらに軽量化（§9 Q4） |
| F9 | レスポンシブ対応 | モバイルメニュー（React island）含む |

### 2.2 非機能要件 / Non-Functional Requirements

- **パフォーマンス:** Lighthouse 90+（Performance / Accessibility / Best Practices / SEO）
- **SEO:** 既存URL・メタ情報を可能な限り維持。リダイレクト整備（§4.2）
- **アクセシビリティ:** WCAG AA を目安
- **コスト:** Cloudflare Pages 無料プラン内で完結
- **保守性:** lognpacific-astro と同じディレクトリ規約・コンポーネント命名

---

## 3. アーキテクチャ決定 / Architecture Decisions

lognpacific.com で実証済みの構成をそのまま採用します。

| 領域 / Area | 採用技術 / Choice | 理由 / Rationale |
|---|---|---|
| フレームワーク | Astro（SSG mode） | 既に習熟・実績あり。静的出力で高速 |
| スタイリング | Tailwind CSS | lognpacific-astro と統一 |
| インタラクティブ | React（Islands Architecture） | メニュー・フォーム等のみ。JS最小化 |
| デプロイ | Cloudflare Pages（無料） | 既存運用と同じ |
| CI/CD | Cloudflare Pages の Git連携（push で自動ビルド・デプロイ） | lognpacific-astro と同じ実態に合わせる（GitHub Actions の workflow ファイルは不要） |
| フォーム | Web3Forms | 既存運用と同じ |
| 画像最適化 | Astro Image（`src/assets/images/`） | 既存運用と同じ |
| アナリティクス | GA4（測定ID：`G-FYR95RLQXY`） | joshmadakor.tech 専用プロパティ（lognpacific.com とは別） |

**Islands Architecture の方針:** Astro をメインフレームワークとし、React はインタラクティブ部分（モバイルメニュー、お問い合わせフォーム等）に限定する。

---

## 4. ページ構成・移行マッピング / Site Map & Migration Mapping

### 4.1 ページ対応表 / Page Mapping

| WordPress（現行） | Astro（移行後） | 種別 | 優先度 |
|---|---|---|---|
| `/`（Home） | `src/pages/index.astro` | 静的ページ | 高 |
| `/cyber` | `src/pages/cyber.astro` | 静的ページ（長尺LP） | 高 |
| `/exams`（ナビ）/ ホーム「IT EXAMS」 | **外部リンク** → lognpacific.com practice tests（当面） | リンクのみ | 低（§5） |
| `/blog/`（一覧） | `src/pages/blog/index.astro` | 動的生成 | 高（§6） |
| `/blog/{id}/`（記事 全61件） | Content Collections + `[id].astro`（ID形式URL維持） | 動的生成 | 高（§6） |
| IT Training | （外部リンクのまま） | リンクのみ | — |

### 4.2 リダイレクト方針 / Redirect Strategy

**ブログURL（決定済み）:** 投稿ID形式（例：`/blog/2265/`）を**そのまま維持**する。移行後もURLが変わらないため、ブログ記事については原則リダイレクト不要 → SEOリスクを最小化できる。実装は各記事の frontmatter に `id` を持たせ、`getStaticPaths` で `/blog/{id}/` を生成する（§6）。

**その他のページ:** ホーム・`/cyber` などはURL不変。万一変わる箇所のみ Cloudflare Pages の `_redirects` で対応する。移行直前に全URLの最終棚卸しを行う。

---

## 5. Exams 入口の扱い / Exams Entry Point ✅ 決定済み

**方針:** 当面は Exams を**外部リンク**として扱い、joshmadakor.tech ドメインの新IT Examsページが完成したタイミングで**リンク先を内部URLに差し替える**（2段階アプローチ）。

### フェーズ2〜3（当面）
- ナビ「Exams」とホームの「IT EXAMS」カード → どちらも `https://lognpacific.com/free-certification-practice-tests/` を指す外部リンクにする
- IT Training（coursecareers.com）と同じ「外部リンクのみ」の扱い → **このフェーズでExamsページの作り込みは不要**
- 既存の `it-exams.astro`（lognpacific-astro リポジトリ内）は差替時まで温存

### 新ページ完成後（差替）
- joshmadakor.tech ドメイン上の新IT Examsページ（例：`/exams`）が完成したら、上記リンク先を**内部URLへ変更するだけ**（1〜2箇所）。入れ替えコストはほぼゼロ

**メリット:** Examsページの仕様が固まる前に本体移行を止めずに進められる。リンク差替は局所的で低リスク。

**参考：実アプリの認証フロー / Auth flow (reference):**
1. Cyber Range または Cyber Community に登録
2. `lognpacific.z20.web.core.windows.net/#/reset-credentials` で Microsoft アカウント発行
3. `app.cyber-range.io/practice` にログインして使用

---

## 6. ブログ移行戦略 / Blog Migration Strategy ✅ 決定済み

**決定:** 案A（**Astro Content Collections への完全移行**）。記事数 **61件**、URLは投稿ID形式（`/blog/{id}/`）を**維持**。

### 採用理由
- フェーズ4でWordPress解約が確定 → WP依存を残す案B（Headless）は不可
- 61件は手作業の検品も現実的な規模 → 案C（ハイブリッド）の複雑さは不要

### 移行手順（概要）
1. WordPress から WXR（エクスポートXML）を出力
2. `wordpress-export-to-markdown` 等で 61件を Markdown に変換し `src/content/blog/` へ配置
3. 各記事の frontmatter に **`id`（投稿ID）**・`title`・`pubDate`・`description`・`heroImage` 等を持たせる
4. 画像は WP の `wp-content/uploads` から `src/assets/images/blog/` へ取り込み、Astro Image で最適化
5. `src/pages/blog/[id].astro` の `getStaticPaths` で `id` から `/blog/{id}/` を生成（→ 旧URL完全維持・リダイレクト不要）
6. `src/pages/blog/index.astro` で一覧（ページネーション・新着順）を生成
7. 変換後、61件を目視で検品（フォーマット崩れ・画像リンク・内部リンク）

### 検討事項
- カテゴリ／タグの有無 → エクスポート後に確認し、必要なら一覧フィルタを実装
- 記事中の lognpacific.com / joshmadakor.tech 相互リンクは移行後に総点検（§7）

> 旧の案比較（参考）: A=完全移行（採用） / B=Headless WP（フェーズ4と矛盾のため不採用） / C=ハイブリッド（61件なら不要）

---

## 7. 制約とリスク / Constraints & Risks

| リスク / Risk | 影響 | 対策 / Mitigation |
|---|---|---|
| ブログ記事のフォーマット崩れ | 中 | 変換後に目視チェック、テンプレで正規化 |
| 既存URL消失によるSEO低下 | 低 | ブログはID形式URL維持で原則不変。変わる箇所のみ `_redirects` で対応 |
| Elementor 独自レイアウトの再現コスト | 中 | Tailwind で作り直し、ピクセル完全一致は狙わない |
| 画像点数が多い | 中 | Astro Image で一括最適化 |
| 2サイト（lognpacific / joshmadakor）の相互リンク整合 | 中 | リンク先を移行後に総点検 |
| Cloudflare Pages 無料枠の制限 | 低 | ビルド数・帯域を監視 |

---

## 8. セキュリティ・プライバシー / Security & Privacy

- **認証なし:** 公開コンテンツサイトのためログイン機能なし（Exams のアプリ認証は外部 app.cyber-range.io 側）
- **フォーム:** Web3Forms 経由。スパム対策（honeypot 等）を有効化
- **シークレット管理:** Web3Forms アクセスキー・GA4 ID は環境変数で管理、リポジトリに直書きしない
- **プライバシー:** GA4 利用に伴うプライバシーポリシー記載を維持
- **依存パッケージ:** Dependabot 等で脆弱性監視（任意）

---

## 9. 意思決定ログ / Decision Log ✅ 全件確定

- **Q1（ブログ件数）:** 61件 → 全件移行（案A・§6）
- **Q2（ブログURL）:** 投稿ID形式（`/blog/{id}/`）を維持
- **Q3（Exams）:** 当面は外部リンク（lognpacific.com practice tests）。新ページ完成後に内部URLへ差替（§5）
- **Q4（検索）:** ❌ 省略（実装しない）→ サイトをさらに軽量化
- **Q5（GA4）:** **別プロパティ**。測定ID `G-FYR95RLQXY`（lognpacific.com の `G-1QFCKBJ47H` とは別）
- **Q6（`/cyber` 統計値）:** 手動コピーの固定値。確定値 = **200+** Real Testimonials / **3,500+** Total Paid Students / **8,800+** Community Members

> 未確定事項なし。本ドキュメントはフェーズ3着手の前提が揃った状態。

---

## 10. テスト戦略 / Testing Strategy

- **ビルド検証:** `astro build` がエラーなく完了
- **Lighthouse:** 全ページ 90+ を確認（lognpacific.com 基準）
- **リンク切れチェック:** 内部・外部リンクの 404 検査
- **レスポンシブ確認:** モバイル/タブレット/デスクトップで目視
- **フォーム送信テスト:** Web3Forms の到達確認
- **リダイレクト検証:** 旧URL→新URL が正しく転送されるか
- **視覚確認:** コミット前に Yu が見た目を確認（既存ワークフロー踏襲）

---

## 11. デプロイ・運用 / Deployment & Operations

- **本番:** Cloudflare Pages（無料プラン）
- **CI/CD:** Cloudflare Pages の Git連携 — main ブランチへの push を検知して自動ビルド・デプロイ（lognpacific-astro と同じ。GitHub Actions の workflow ファイルは作らない）
- **プレビュー:** `joshmadakor-astro.pages.dev`（仮）でステージング確認
- **ドメイン切替:** 本番確認後に joshmadakor.tech の DNS を Cloudflare Pages へ向ける（フェーズ3）
- **WP解約:** 全移行・本番安定後にHostGator/WordPress解約（フェーズ4）

---

## 12. 次のステップ / Next Steps

1. ✅ **全決定（Q1〜Q6）確定** — 未確定事項なし
2. 📌 **本ドキュメントを `joshmadakor-astro` リポジトリにコミット**（フェーズ2成果物の確定）
3. ⏭ **フェーズ3：プロジェクトスキャフォールディング**
   - 新リポジトリ初期化（`joshmadakor-astro`）・`.gitignore`・初回コミット
   - `CLAUDE.md`（エージェント挙動設定）作成
   - `PhasedSolutionPlan.md`（フェーズドな実装計画）作成
   - lognpacific-astro の構成・コンポーネント（BaseLayout / Header / Footer / MobileMenu / ContactForm）を流用
4. → フェーズ4：ページ単位で実装・テスト・コミット

---

*移行ロードマップ全体 / Overall Roadmap:*
*フェーズ1: lognpacific.com 本番公開（ほぼ完成）→ フェーズ2: 試運転・joshmadakor.tech Astro制作（← 今ここ）→ フェーズ3: IT Exams移設・本番公開 → フェーズ4: WordPress/HostGator 解約*
