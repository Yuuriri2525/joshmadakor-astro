# DesignSpec.md — joshmadakor.tech 現行デザイン再現仕様

> **目的 / Purpose:** 現行 WordPress/Elementor サイトのデザインを Astro 版で**忠実に再現**するための仕様書。Claude Code がこれを参照して実装する。
> **ステータス / Status:** 🟢 主要フラグ確定・全ページ採取済み（正確なhex/フォントは実装時にClaude Codeが採取）
> **基準 / Source of truth:** 現行ライブサイト https://joshmadakor.tech （+ スクリーンショット）
> **関連 / Related:** SolutionDesign.md（移行設計）、PhasedSolutionPlan.md（実装計画）
> **作成 / Created:** 2026-06-18

---

## 0. スコープと方針 / Scope & Principles

- **全ページ「現行を忠実再現」が基本方針。** トップページは将来リニューアル予定だが、公開を急ぐため現行を再現して公開し、リニューアルは公開後（フェーズ5）に行う。`/cyber`・ブログ・共通部分は現行デザインを長く使う。
- **再現の目的は「現行と見劣りしないこと」。** ピクセル完全一致が必須なのは長く使う `/cyber`・ブログ・共通部分。トップは後でリニューアルするので、本質要素が揃っていれば可。
- **色・フォントの正確値:** 本spec内のhex/フォントはスクショからの**近似値**。実装時に現行サイトの computed CSS（ブラウザの開発者ツール）から正確な値を採取して確定すること。

---

## 1. 重要フラグ（実装前に確認）/ Critical Flags 🚩

現行をそのまま写すと問題になる/判断が要る点。

| # | 項目 | 現行 | 採用方針（確定）|
|---|---|---|---|
| 1 | **統計の数字** | `/cyber` は 100+ / 3,500+ / 8,000+ | ✅ **確定値 200+ / 3,500+ / 8,800+ を使う**（現行の古い値は写さない） |
| 2 | **ブランド表記/ロゴ** | LOG(N) PACIFIC ロゴ・site_name "LogN Pacific" | ✅ **LOG(N) PACIFIC ロゴに統一**（骨格の "Josh Madakor" テキストは差替） |
| 3 | **ヘッダー検索窓** | あり（Search ボックス） | ✅ **出さない**（設計F8で検索省略・バックエンド無し） |
| 4 | **フッター "HOME" リンク** | lognpacific.com を指す | ✅ 現行どおり lognpacific.com のまま（相互リンク維持） |
| 5 | **ホームのお問い合わせ** | CONTACT US は SNSリンクのみ | ✅ **フォーム不要**。SNSリンクのみ（ContactForm.tsx はホームでは使わない） |

---

## 2. グローバル・デザイントークン / Global Design Tokens

> ⚠️ 下記hexはスクショ由来の近似値。実装時にライブCSSで確定すること。

### 2.1 カラー / Colors

| 用途 / Use | 近似hex | メモ |
|---|---|---|
| ページ背景 / Page bg | `#000000` | meta theme-color も `#000000` で確定 |
| 主テキスト / Text primary | `#FFFFFF` | 見出し・本文白 |
| 副テキスト / Text secondary | `~#B8BCC2` | カード説明文などの薄いグレー |
| カード見出し / Card heading | `~#35B6F0`（スカイブルー） | CYBER TRAINING 等の青見出し |
| ヒーロー赤グラデ / Hero red | `~#E60012` → `~#1A1A1A` | 左（赤）から右（ほぼ黒）へ |
| ボタン枠グラデ / Button border | 緑 `~#00E676` → 青 `~#2979FF` | ピル型ボタンの枠線グラデーション |
| ナビ active 下線 / Active underline | `~#00E676`（緑） | 選択中メニューの下線 |
| フッター背景 / Footer bg | `~#9A9A9A`（ミディアムグレー） | 現行フッターはグレー地。骨格は黒だったので要変更 |

### 2.2 タイポグラフィ / Typography

- 見出し：太字の幾何学サンセリフ（Montserrat / Poppins 系の見た目）。**Elementor のフォント設定で正確なフォント名を確認すること。**
- 本文：ニュートラルなサンセリフ。
- フォールバック例：`font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;`（正確なフォント確定後に置換）
- 見出しは大きく・太く（ヒーロー H1 は特大）。

### 2.3 レイアウト / Layout

- 中央寄せコンテナ（max-width ~1280px / `max-w-7xl` 相当）、左右パディングあり。
- セクション間に十分な余白（縦方向ゆったり）。
- ヘッダーは上部固定（sticky）、背景透過〜スクロールで変化。

### 2.4 ボタン / Buttons

- **ピル型**（角丸フル）。
- 枠線グラデ（緑→青）＋暗い塗り。テキスト白。
- ヒーローの「LEARN MORE」は白枠のピル（塗りなし）。

---

## 3. 共通コンポーネント / Global Components

### 3.1 ヘッダー / Header（全ページ共通）

- 左：**LOG(N) PACIFIC ロゴ**（白系、ダーク背景用）。クリックでトップへ。
- 中央：ナビ — `Home` / `IT Training`（外部 coursecareers.com/joshmadakor）/ `Cyber Training`（/cyber）/ `Exams`（外部 lognpacific.com practice tests）/ `Blog`（/blog/）。
- active メニューは緑の下線。
- 右：検索窓は**出さない**（フラグ#3確定）。ナビ右端は空ける、またはSNSアイコンを置く（現行はヘッダー上部にSNSアイコン列あり → 任意で踏襲可）。
- モバイル：ハンバーガー → MobileMenu（React island、骨格済み）。

### 3.2 フッター / Footer（全ページ共通）

- 背景：ミディアムグレー（現行準拠、フラグ）。
- 左：LOG(N) PACIFIC ロゴ。
- リンク列：`HOME`（→フラグ#4）/ `CYBER COURSE`（/cyber）/ `IT EXAMS`（lognpacific practice tests）/ `BLOG`。
- 右：CONTACT US ＋ SNSアイコン。
  - LinkedIn: https://www.linkedin.com/in/joshmadakor/
  - YouTube: https://www.youtube.com/@JoshMadakor
  - X: https://x.com/joshmadakor
  - Instagram: https://www.instagram.com/joshmadakor/

---

## 4. ページ：ホーム / Page: Home（`/`）

> トップは将来リニューアル予定。現行を再現して公開する。

セクション構成（上から）:

1. **ヒーロー見出し:** 「Take control of your future!」白・特大・中央。
2. **メインバナー:** 赤→暗グラデの横長ブロック。左に Josh の写真、右に「THE CYBER RANGE」（白・特大）＋「The Best Hands-On Cyber Security Training」＋「LEARN MORE」白枠ピルボタン（→ /cyber）。
3. **4カードナビ（横並び）:** 各カード = 青見出し＋説明＋ピルボタン。
   - CYBER TRAINING / 「Gain skills and experience. Launch your career.」/ View Course Details → `/cyber`
   - IT TRAINING / 「Learn cutting-edge technologies. Become a digital age professional.」/ View Course Details → `https://coursecareers.com/joshmadakor`
   - IT EXAMS / 「Test your skills for free. Prepare for certification success.」/ Take Exam Now → `https://lognpacific.com/free-certification-practice-tests/`
   - BLOG / 「Latest IT trends and expert insights. Deepen your knowledge.」/ Read Articles → `/blog/`
4. **CONTACT US:** SNSリンクのみ（フッターと同じ4つ）。**お問い合わせフォームは置かない**（フラグ#5確定。ContactForm.tsx はホームでは未使用）。
5. 右下に「↑ back to top」ボタン。

---

## 5. ページ：Cyber / Page: `/cyber`（長尺LP・忠実再現）

> 長く使うページ。**忠実に作り込む。**

セクション構成（上から、現行準拠）:

1. **ヒーロー:** 「🎯 Welcome to the Cyber Range」＋「Live-Fire Cyber Range with a Hands-On Cyber Course for Each Security Operations Topic!」
2. **統計3カウンタ:** **200+ Real Testimonials（"below" へアンカー #real-wins）/ 3,500+ Total Paid Students / 8,800+ Community Members**（※確定値・フラグ#1）。
3. **CTA:** 「Get Started Now」→ `https://www.skool.com/cyber-range/about`
4. **Welcome 説明:** 「Welcome to The Cyber Range! (Cyber Internships Available)」本文＋ツール一覧（Tenable / Microsoft Sentinel / Microsoft Defender for Endpoint / Microsoft Azure）。
5. **FAQ「Do you have these concerns?」:** Q&Aアコーディオン/ブロック。現行のQ&A（例：未経験で就職できるか／ゼロから採用までのロードマップ／将来性）を再現。コピーは現行から移植。
6. **テスティモニアル群（#real-wins）:** 100件超の実績。これは**デザインパターン（カード/グリッドの見た目）を再現**し、中身は現行サイト/WordPressエクスポートから移植する（コンテンツ移行タスク）。
7. **料金/最終CTA等:** 現行ページ下部に追加セクションがある可能性 → 実装時にライブ最下部まで確認して再現。

> 補足：本specでは上部〜FAQまでをライブから採取済み。テスティモニアル以降の正確な順序・コピーは実装着手時にライブの最下部まで再確認すること。

---

## 6. ページ：ブログ / Page: Blog（一覧＋記事・現行デザイン）

> 現行ブログのデザインで作り込む（長く使う）。スクショから採取済み。

### 6.1 一覧ページ `/blog/`

- **ヘッダー帯:** パンくず（Home > IT / Cyber Security Blog）＋「BLOG」特大白見出し＋サブコピー「Cyber Security and IT career tips, success stories, and insights from YouTuber Josh Madakor.」
- **記事グリッド:** PC **2列**。各カード:
  - 上部にサムネイル画像（16:9前後）、右上に**カテゴリバッジ**（例：UNCATEGORIZED / CYBERSECURITY / CAREER。黒地・白文字の角丸ピル）
  - サムネ左下に丸アバター
  - タイトル（白・太字）
  - 抜粋（薄グレー、数行で切る）
  - 「READ MORE »」リンク
  - カード下部に区切り線＋**日付**（例：April 17, 2026）＋コメント数（例：No Comments）
- **サイドバー（右・PCのみ）:** 「Cyber Range」縦長CTAバナー（Hands-on Cybersecurity Training / LIVE SOC / Internships Available）。スティッキー可。
- **ページネーション = 「Load More」ボタン方式** ⚠️ 重要。ページ番号送りではなく、下部の「Load More」で続きを追加読み込み。
  - 静的サイトでの実装方針：初期N件をビルド時生成し、「Load More」で追加分を表示（全61件を隠し持って JS で出す／または追加HTMLを段階表示）。**骨格の `[page].astro` 番号ページネーションから方式変更**。実装詳細は PhasedSolutionPlan で詰める。
- 右下に「↑ back to top」ボタン。

### 6.2 記事ページ `/blog/{id}/`

セクション構成（上から）:

1. パンくず（Home > IT / Cyber Security Blog > 記事タイトル）
2. **タイトル**（白・特大）
3. 「Share the Post」＋ SNS共有アイコン
4. **埋め込みYouTube動画**（記事によりアイキャッチ動画。無い記事は heroImage 画像）
5. **Table of Contents（目次）** ⚠️ — 見出しから自動生成、折りたたみ可能なボックス。番号付きで階層表示。
6. **本文（prose）:** H2/H3見出し＋段落＋箇条書き＋画像＋強調。`@tailwindcss/typography` で整形（骨格では未導入 → 導入タスク化）。
7. **サイドバー（右）:** Cyber Range CTA ＋「Top 5 Reads」関連記事リスト（サムネ＋タイトル）。

### 6.3 ブログ実装メモ

- URL：`/blog/{id}/`（投稿ID維持・骨格で実証済み）。
- カテゴリ：frontmatter に `category`（または `tags`）を持たせ、カードのバッジに表示。
- 目次：本文の見出しを抽出して生成（remark プラグイン等）。
- 「Top 5 Reads」：各記事の frontmatter で**おすすめ記事ID（最大5件）を手動指定**。Yu が記事ごとにコントロール。
  - フォールバック：指定が無い記事は**新着5件を自動表示**（全61件に手動指定する負担を避けるため）。純粋に手動のみにも変更可。
- ダークテーマ（黒地・白文字）はサイト全体と共通。
- **運用モデル:** テンプレート（一覧・記事レイアウト・目次・URL生成）は Claude Code が1回作成。既存61件は WordPress エクスポート（WXR）→ `wordpress-export-to-markdown` で一括変換（LLM/トークン不使用のスクリプト処理）。**以降の記事追加・更新は Yu 自身が `src/content/blog/` に `.md` を置いて push するだけ。**
- **将来オプション（今は実装しない）:** GUIで執筆したくなった場合は、Astro本体を変えずに Decap CMS / TinaCMS 等の Git連携CMSを後付け可能。データ（Markdown）も置き場所（Gitリポジトリ）も現状のままで、別プラットフォームへの移行は不要。

---

## 7. 画像アセット / Image Assets

> 実ファイルは **Yu が所持**。下記の置き場所に配置し、Astro Image で最適化。

| アセット | 用途 | 配置先（案） |
|---|---|---|
| LOG(N) PACIFIC ロゴ（白系） | ヘッダー/フッター | `src/assets/images/logo.png`（または .svg） |
| Josh ヒーロー写真（赤背景） | ホーム メインバナー | `src/assets/images/hero-josh.webp` |
| Cyber ヒーロー/OG画像 | /cyber | `src/assets/images/cyber-hero.webp` |
| テスティモニアル画像（複数） | /cyber #real-wins | `src/assets/images/testimonials/` |
| favicon | 全体 | `public/`（骨格でコピー済み想定） |

> 命名・形式は lognpacific-astro の規約に合わせる。元の WordPress 画像URL（参考）: ロゴ `…/2025/09/LOGN-PACIFIC-Logo-e1713191042203.png`、cyber OG `…/2025/08/1.webp`。

---

## 8. 実装の進め方（提案）/ Implementation Order

1. **共通（Header/Footer/トークン）を現行再現** ← 全ページの土台。ロゴ差替・フッターをグレー地に・検索窓の扱い確定。
2. **ホーム** を現行再現（リニューアルまでの暫定）。
3. **/cyber** を現行に忠実再現（テスティモニアル含む）。
4. **ブログ**（要スクショ追記後）＋ 61件移行。
5. 公開（DNS切替）。
6. （後日）フェーズ5：トップのみリニューアル。

---

## 9. 未確定・TODO / Open Items

確定済み（§1フラグ）: 検索窓なし / ブランド=LOG(N) PACIFIC / 統計=200+/3,500+/8,800+ / フッターHOME=lognpacific.com / ホームはフォームなしSNSのみ。

実装時に対応（Claude Code）:
- [ ] 正確なカラーhex・フォント名をライブCSSから採取して §2 を確定（Claude Codeに委任）
- [ ] `/cyber` 最下部（テスティモニアル以降）のセクション順・コピーをライブから確定
- [ ] ブログ一覧「Load More」方式の静的実装方法を確定（PhasedSolutionPlanで詳細化）
- [ ] 記事ページの Table of Contents 自動生成の実装
- [ ] 「Top 5 Reads」：frontmatter手動指定＋新着5件フォールバックの実装
- [ ] `@tailwindcss/typography` 導入（ブログ本文整形）
- [ ] 画像アセットの配置（Yu所持の実ファイル → §7 の配置先へ）
