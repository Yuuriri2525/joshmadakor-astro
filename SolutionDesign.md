# SolutionDesign.md
# WordPress → Astro 移行プロジェクト：LogN Pacific

## 1. 問題定義
現在のサイト（lognpacific.com）はWordPress + Elementorで構築されている。
WordPressはサーバー維持費・セキュリティ更新・表示速度の面で課題がある。
AstroによるSSG（静的サイト生成）に移行し、表示速度・SEO・運用コストを改善する。

## 2. 現サイト構成（移行元）
- URL: https://lognpacific.com/
- CMS: WordPress + Elementor
- ページ:
  - / (トップ): Hero, Mission, Josh's Story, What We Offer, Team, Footer
  - /for-employer/: 採用担当者向けLP（長文・画像多数）
  - /free-certification-practice-tests/: 外部リンクページ
  - /cybersecurity-analyst-internship-apply-logn-pacific: インターンページ
- コンテンツ:
  - チームメンバー（名前・役職・写真）×12名
  - プログラム紹介（6種類、外部URLへのリンク）
  - SNSリンク（Twitter/Instagram/LinkedIn/YouTube）
  - お問い合わせフォーム（for-employerページ）

## 3. 移行先技術スタック
- フレームワーク: Astro（SSG mode）
- スタイリング: Tailwind CSS
- コンポーネント: Reactコンポーネント（インタラクティブ部分のみ）
- ホスティング: Cloudflare Pages（無料プラン）
- CI/CD: Cloudflare Pages の Git 連携（GitHub push で自動デプロイ）
- フォーム: Web3Forms（無料・設定簡単）

## 4. 要件

### 機能要件
- [ ] 全ページのコンテンツ・デザインを忠実に再現
- [ ] レスポンシブデザイン（モバイル対応）
- [ ] お問い合わせフォームの動作
- [ ] SNSリンク・外部サービスリンクの維持
- [ ] チームメンバー情報の表示

### 非機能要件
- [ ] Lighthouse スコア 90点以上（Performance）
- [ ] 既存URLと同一パス構造を維持（SEO）
- [ ] 画像最適化（Astro Image コンポーネント使用）
- [ ] メタタグ・OGP タグの完全移行

## 5. SEO対策
- URLパスを完全に維持（/for-employer/ など）
- meta description・og:image を各ページに設定
- sitemap.xml を自動生成（@astrojs/sitemap）
- robots.txt を設定

## 6. アーキテクチャ方針
- Astro の「Islands Architecture」を採用
- 基本はゼロJSの静的HTML
- インタラクティブな部分（ナビゲーションのモバイルメニュー等）のみReactコンポーネント化
- コンテンツはAstroファイル内にハードコード（CMSは使用しない）

## 7. リスクと対策
| リスク | 対策 |
|--------|------|
| フォームが動作しない | Web3Forms または 外部フォームサービスを使用 |
| 画像の読み込み速度 | Astroのimage最適化 + WebP変換 |
| SEOランクの低下 | 同一URL構造 + 301リダイレクト設定 |

## 8. 成功基準
- [ ] 全ページが既存サイトと同等のデザインで表示される
- [ ] Lighthouse Performance スコア 90+
- [ ] フォームが正常に動作する
- [ ] Cloudflare Pages にデプロイ完了
- [ ] 既存URLがすべて正常に動作する
