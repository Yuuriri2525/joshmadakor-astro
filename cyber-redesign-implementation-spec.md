# /cyber ページ改修 実装指示書（Claude Code 用）

> このドキュメントは claude.ai 上でデザイン・コピーを確定したものを、Claude Code で実装するための指示書です。
> 対象リポジトリ: `joshmadakor-astro` / 対象ページ: `/cyber`
> 既存の `CLAUDE.md` / `DesignSpec.md` の規約（命名・トークン・Lighthouse 100 維持方針）に従って実装してください。

---

## 0. 前提・共通ルール

- **配色トークン**（既存のものに合わせる。下記は今回多用する値）
  - 背景: `#0a0a0a`（セクション）/ `#141414`（カード）
  - 文字: `#ffffff`（主）/ `#a1a1aa`（副）/ `#71717a`（弱）/ `#52525b`（最弱）
  - アクセント緑: `#4ade80`（文字・線）/ `#22c55e`（CTAソリッド）/ `#86efac`（淡）
  - CTA文字色（緑ボタン上）: `#06250f`
- **CTAは全ページ緑に統一**。現行の赤(`#f43f5e`系)ボタンは緑へ置き換える。
- **アニメーションは CSS のみ**。GIF・重い動画ループは使わない（Lighthouse 維持）。
- **数字クレームは確定済みの実数のみ使用**（後述の各値）。勝手に増やさない。
- 既存のコンポーネント名・ファイル構成が下記の想定と違う場合は、**実ファイル名に合わせて読み替え**て適用すること。

---

## 1. セクション順序（重要・並べ替えあり）

`/cyber` の各セクションを以下の順序に並べ替える。**②ライブSOC と ③ロードマップ の前後関係が現行から変わる**点に注意。

1. Hero
2. Live SOC + Tools（旧 "Welcome to The Cyber Range!" セクション）
3. **Your Roadmap to Reality**（← Concerns より前に移動）
4. **Do you have these concerns?**（← Roadmap より後ろに移動）
5. Success Stories & Graduate Voices
6. Real Wins from the Community
7. Skool Games Winner（#1 Community）
8. A Word From Josh（+ "You get Josh" ブロックを新規追加）
9. Pricing（Ready to Start Your New Career?）
10. FAQ（今回は変更なし／別途）

---

## 2. Hero セクション

### コピー（確定）
- Eyebrow（新規・小キャップ・緑 `#4ade80`・letter-spacing 0.18em）:
  `BY JOSH MADAKOR`
- H1（🎯絵文字と "Welcome to..." を撤去。2行・2行目を緑に）:
  ```
  Real cybersecurity experience.
  Before you're hired.
  ```
  （"Before you're hired." を `#4ade80`）
- Subhead（機能羅列を撤去し下記に差し替え）:
  ```
  Train in a live production SOC — under real attack right now — using the same enterprise tools security teams use every day: Tenable, Microsoft Sentinel, and Defender for Endpoint. Everything Josh learned in 15 years, turned into a direct path so you don't have to figure it out yourself.
  ```
- CTA: `Get Started Now`（緑ソリッド・サイズUP・`box-shadow: 0 0 0 4px rgba(34,197,94,0.18)` でグロー）
- CTA下マイクロコピー: `Train at your own pace · Cancel anytime · Cyber internships available`

### レイアウト指示
- 動画サムネイルは現状の実画像を維持しつつ**わずかに縮小**（H1に主役を譲る。max-width 340–380px目安）。
- 統計バー（`200+ Real Testimonials` / `3,500+ Paid Students` / `8,800+ Community Members`）は CTA 直下に維持。数値は現行のまま。
- 中央寄せレイアウト。

---

## 3. Live SOC + Tools セクション（旧 Welcome to The Cyber Range!）

### コピー（確定）
- 見出し（"Welcome to..." 挨拶を撤去。2行・2行目緑）:
  ```
  You won't practice on toy labs.
  You'll defend a live network.
  ```
- サブ見出し:
  ```
  As a member, you work inside a live production SOC built in Microsoft Azure — the same environment a real security team operates in, using the same fully-licensed, enterprise-grade tools they use on the job.
  ```
- インターンバッジ（見出し直下・緑枠の pill）:
  ```
  ✓ Resume-backed cyber internships included — with verifiable work experience
  ```
  （`background: rgba(34,197,94,0.12)` / `border: 0.5px solid rgba(34,197,94,0.35)` / 文字 `#86efac`）

### ツールカード（2×2 グリッド）
各カード: アイコン枠（緑）+ ツール名（白）+ カテゴリ（緑・小キャップ）+ 説明1行（副色）。

| ツール名 | カテゴリ | 説明1行 |
|---|---|---|
| Tenable | VULNERABILITY MANAGEMENT | Find and prioritize real vulnerabilities |
| Microsoft Sentinel | SIEM | Investigate security alerts at scale |
| Defender for Endpoint | EDR | Hunt threats on real endpoints |
| Microsoft Azure | YOUR ENTERPRISE ENVIRONMENT | Where the whole live SOC actually runs |

> アイコンは既存のアイコンセットに合わせる。緑のグロー背景などは付けない（AI感回避）。

---

## 4. Your Roadmap to Reality セクション（位置移動 + ネオン波線追加）

### 変更点
1. セクションを Concerns より**前**に移動（順序は §1 参照）。
2. カード（01/02/03）の中身・コピーは**現行を維持**してよい。
3. **背景にネオン波線（NeonWave.astro）を追加**。

### NeonWave コンポーネントの組み込み（別ファイル `NeonWave.astro` を `src/components/` に配置）
3ステップ:
1. セクションを `position: relative; overflow: hidden;` にする（`overflow: hidden` は波線の横はみ出しによる横スクロール防止。必須）。
2. セクション先頭で `<NeonWave />` を呼ぶ（z-index:0・背面）。
3. 見出し+カード群のコンテナを `position: relative; z-index: 1;` で前面に出す。

```astro
---
import NeonWave from "../components/NeonWave.astro";
---
<section class="roadmap">
  <NeonWave />
  <div class="roadmap__inner"><!-- 見出し + カード3枚 --></div>
</section>

<style>
  .roadmap { position: relative; overflow: hidden; background: #0a0a0a; padding: 80px 0; }
  .roadmap__inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 24px; text-align: center; }
</style>
```

> NeonWave の仕様: 太め(本体 stroke 9 / グロー下地 16)・浅いS字が一度うねる形・グラデ(`#bef264`→`#4ade80`→`#bef264`)・glowフィルタ。filter id はランダム化済みで複数箇所利用OK。モバイルは height 自動縮小。

---

## 5. Do you have these concerns? セクション（位置移動 + コピー全面リライト）

### 変更点
1. Roadmap より**後ろ**に移動（§1 参照）。
2. 見出し・各設問を「訪問者の一人称（心の声）」にリライト。"concerns" の語は使わない。
3. アコーディオン形式なら **1つ目をデフォルト開**にする。
4. 3つの回答末尾の内部リンクは**すべて `See real success stories`** に統一（Roadmapが直前にあるため、旧 "↓ roadmap" 誘導は不要）。

### コピー（確定）
- セクション見出し（2行）:
  ```
  The questions you're probably
  asking yourself
  ```

- **設問1**（デフォルト開）
  - 質問: `Can I really do this with zero experience?`
  - 回答: `Yes — and the numbers back it up. 58% of Cyber Range graduates land cybersecurity roles directly. The other 42% start in adjacent IT roles that lead straight into security. You get hands-on labs, resume and interview prep, and support the whole way.`
  - 注記（小・最弱色）: `Based on 2025 member outcomes`
  - リンク: `See real success stories`

- **設問2**
  - 質問: `Will I actually know what to do — or just get handed a pile of videos?`
  - 回答: `No pile of videos. You follow a clear, structured roadmap — you always know exactly what to learn, in what order, and why. Instead of guessing, you build skills on a real network that reflect what the job actually requires.`
  - リンク: `See real success stories`

- **設問3**
  - 質問: `Will this still matter in five years?`
  - 回答: `Security only grows as AI and automation expand — someone still has to investigate incidents and defend systems. The Cyber Range gives you hands-on, job-ready skills, not theory that expires. That's what keeps you valuable as the field changes.`
  - リンク: `See real success stories`

---

## 6. Success Stories & Graduate Voices（チケット型カードに変更）

### 変更点
1. サブ見出しを追加: `Real people. Real career changes.`
2. 各動画カードの下に **Before → After のキャリア変化**を「チケット型」で表示:
   - フッター左に緑の縦アクセント（`border-left: 3px solid #4ade80`）
   - Before（前職）: 弱色 + **取り消し線**（`text-decoration: line-through; text-decoration-color: #3f3f46`）
   - After（現職）: 緑(`#4ade80`)・太字
3. カードの並びを**落差インパクト順**に変更（下表の上から順）。

### データ（確定・全6枚）
| 並び順 | Before（取り消し線・弱色） | After（緑・太字） |
|---|---|---|
| 1 | Pro Chess Player | Cyber Defense Analyst |
| 2 | Mechanical Engineer | Assurance Analyst (DoD) |
| 3 | Electrical Engineer | SOC Analyst |
| 4 | Sales at Verizon | Risk Management Specialist |
| 5 | Wireless Industry Sales | Remote Cybersecurity Role |
| 6 | IT Help Desk | IT Technician |

> 動画サムネは現行の実画像をそのまま使用。`After` は省スペースのため "Cybersecurity Assurance Analyst (DoD)" → "Assurance Analyst (DoD)" に短縮済み。

---

## 7. Real Wins from the Community（カルーセル改善）

### 変更点（スクショ画像はそのまま・無加工で使用）
1. 見出しを変更: `Real Wins. Posted by Real Members.`
2. サブ見出し（150を主役に・緑強調）:
   ```
   150+ job offers shared by members since 2024 — and counting.
   ```
   （`150+ job offers` を `#4ade80` 太字）
3. 現行の横長カルーセル（1枚表示＋左右送り）を維持しつつ:
   - 左右の送りボタンを**大きく明確に**（丸背景 42px・影付き）。
   - **ドットインジケーター**を追加（全6枚、現在地を緑バーで表示）。
   - カウンター `6 / 6`（弱色・控えめ）。
   - （任意）両隣スライドの端を少しチラ見せ（peek）。実装が重ければ省略可。
4. セクション下部のCTA `Start Your Journey` を**緑**に変更（現行は赤）。

### 使用画像
`success-01.webp` 〜 `success-06.webp`（既にアップロード済み・ダークテーマ統一・無加工で `<img>` 配置）。

> 数値の根拠: 有料コミュニティ累計の内定報告 = 150件（2024年12月運営開始）。実数確認済み。

---

## 8. Skool Games Winner セクション（見出し整理 + ホバーアニメ）

### 変更点
1. 渋滞していた見出しを整理。`This isn't just a dream. It's a reality.`（Real Wins とカブるため）を**撤去**。
2. 緑の優勝バッジ（pill・🏆）を追加: `#1 Community in the Skool Games`
3. 見出し: `Ranked #1 out of thousands of communities.`
4. 動画サムネは**現行の明るい優勝写真を維持**。GIF化はしない。
5. 代わりに **CSS ホバーアニメ**を追加:
   - ホバー時にサムネが `transform: scale(1.03)`（`transition: .4s`）
   - 再生ボタンが `scale(1.12)` + 背景不透明化（`transition: .3s`）
6. サムネ内の赤帯テキスト `Watch the Winner's Interview / Hear from Josh about the journey and the community's success` は構造維持。色のみページに調和させる。

```css
.winner-thumb { transition: transform .4s ease; }
.winner-wrap:hover .winner-thumb { transform: scale(1.03); }
.winner-play { transition: transform .3s ease, background .3s ease; }
.winner-wrap:hover .winner-play { transform: scale(1.12); background: rgba(255,255,255,1); }
.winner-wrap { cursor: pointer; }
```

---

## 9. A Word From Josh セクション（コピー差し替え + You get Josh ブロック追加）

### 9-1. 引用（維持）
緑の縦ライン付きで現行のまま:
```
"For 15 years, I was obsessed with one thing: skill stacking. I got really good at understanding what employers want. This course is everything I learned, condensed into a direct path, so you don't have to spend 15 years figuring it out yourself."
```

### 9-2. His Journey & Expertise（現行の原文に復帰・ストーリー重視）
```
Josh Madakor started his IT career in 2007 as a help desk technician and has since developed expertise in software development, system engineering, and cybersecurity. He has worked across multiple industries including government, finance, defense, and private sector, notably as a Microsoft contractor where he contributed to the Microsoft Cloud Security Benchmark.

Since 2020, Josh has grown his YouTube channel to over 200,000 subscribers, helping individuals advance their IT and cybersecurity careers through educational content.
```
> **重要**: 末尾の `Welcome to the Josh Madakor Cyber Range!` の一行は**削除**（締めはYouTube文で終える）。

### 9-3. You get Josh ブロック（新規・bio と Pricing の間に配置）
カード型（`#141414`・中央寄せ）。**事実に厳密に合わせた表現**を使用（誇張禁止）:

- 見出し:
  ```
  This is a community, not a course you watch alone.
  ```
- 本文1:
  ```
  Post your progress and Josh himself often jumps in to reply. Every week, he runs live coaching where you can ask him anything and get direct feedback — not a ticket queue, but a real conversation.
  ```
- 本文2:
  ```
  The environment is just as real. Our production SOC runs in Microsoft Azure alongside hundreds of other members — and gets breached by real attackers, by design. When it happens, you go in and threat-hunt it like an analyst would on the job.
  ```

> 事実確認済みの注意点（変更しないこと）:
> - Welcome DM はスタッフが送るため「Josh personally welcomes you」とは書かない。
> - DM 返信は Josh/スタッフ混在のため「Josh が必ず返す」とは書かない。
> - 「投稿に Josh 本人がよく返信する」「Weekly live coaching でJoshに直接質問できる」は事実なので使用可。

---

## 10. Pricing セクション（Ready to Start Your New Career?）

### 変更点
1. サブ見出しを追加（アバウトページ表現を反映）:
   ```
   The fastest, most affordable way to get hands-on cyber experience. Cancel anytime.
   ```
2. 2プランカード（Monthly / Annual）。**Annual を recommended として強調**:
   - Annual: 緑ボーダー(`1.5px solid #4ade80`)+ グロー(`box-shadow: 0 0 0 4px rgba(74,222,128,0.12)`)
   - Annual 上部に pill バッジ: `BEST VALUE · SAVE 20%`（緑ソリッド）

### プラン内容（確定）
**Monthly**
- ラベル: `Monthly`
- 説明: `Get started, no commitment`
- 価格: `$129` `/mo`
- ボタン: `Start Monthly`（アウトライン・白）

**Annual**（強調）
- ラベル: `Annual`
- 説明: `Best for serious career changers`（※ "Most members choose this" は事実と異なるため使用しない）
- 価格: `$1,238` `/yr`
- 取り消し線: `$1,548` billed monthly（$129×12=$1,548。確認済み）
- ボタン: `Start Annual`（緑ソリッド）

### 含まれるもの再確認バー（価格カード下・チェック付き横並び）
アバウトページの公式リストに準拠:
- `Resume-backed internship`
- `Live production SOC access`
- `Weekly live coaching with Josh`
- `Enterprise tools + exam prep`

---

## 11. 実装後チェックリスト

- [ ] セクション順序が §1 の通り（特に Roadmap → Concerns の順）
- [ ] Hero の H1 から 🎯 と "Welcome to" が消えている
- [ ] CTA がすべて緑に統一されている（赤が残っていない）
- [ ] NeonWave がRoadmap背面に表示され、横スクロールが発生しない（`overflow:hidden`確認）
- [ ] Success Stories が6枚すべてチケット型 Before→After になっている
- [ ] Real Wins のスクショが無加工で表示され、サブ見出しに `150+` がある
- [ ] Skool Games サムネにホバーすると scale アニメが動く（GIFでない）
- [ ] A Word From Josh から "Welcome to the Josh Madakor Cyber Range!" が削除されている
- [ ] You get Josh ブロックが bio と Pricing の間にある
- [ ] Annual プランに "Most members choose this" が**使われていない**
- [ ] モバイル表示で各セクションが崩れない（特にカルーセル・2×2ツール・価格2カラム）
- [ ] Lighthouse スコアが維持されている（Performance 100目標）

---

## 付記：未確定 / 別途対応

- **FAQ セクション**: 今回は変更対象外（既存の質問群は充実しているため、別途点検）。
- **deferred 視覚調整**（`cyber-visual-polish-deferred.md`）: home hero の head-crop 等は本指示書の対象外。
