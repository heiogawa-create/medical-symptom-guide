# medical-symptom-guide / 受診目安ナビ

症状を整理して、関連する疾患知識と受診の目安を確認する教育用ヘルスケアアプリです。

## 重要な方針

このアプリは診断・治療・処方を行いません。表示される情報は、一般的な医学知識と受診目安を学ぶための参考情報です。症状が続く場合、強い症状がある場合、不安がある場合は、必ず医師などの医療専門職に相談してください。

## 主な機能

- 症状入力フォーム
- 赤旗症状のチェック
- 受診目安の表示
- おすすめ相談先の表示
- 関連する疾患の例の表示
- 医師に伝えるメモの生成とコピー
- JSON 管理の疾患データ
- 疾患一覧、検索、疾患詳細ページ
- プライバシーポリシー、利用規約、アプリ説明ページ

## イメージキャラクター

妖精ドクターのイメージキャラクターを `components/Mascot.tsx` で SVG として実装しています。ホーム、症状入力、受診目安、疾患一覧、概要、免責表示の各所に配置しています。

- ポーズは `pose` プロパティで切り替えます(`memo`=メモ / `cheer`=チェック完了 / `guide`=案内)
- サイズは `className`(例:`w-24`)で指定します
- 元イラストの画像ファイル(PNG など)に差し替える場合は、`public/` に画像を置き、`Mascot` の利用箇所を `next/image` などに置き換えてください

## 技術構成

- Next.js App Router
- TypeScript
- Tailwind CSS
- ローカル JSON 疾患データ
- OpenNext for Cloudflare
- Wrangler

## 開発コマンド

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Cloudflare / OpenNext デプロイ

Cloudflare の Deploy command は、`npx wrangler deploy` ではなく以下を使用してください。

```bash
npm run deploy
```

`npm run deploy` は OpenNext for Cloudflare の build と deploy を実行します。

```bash
opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Cloudflare の非対話環境では `CLOUDFLARE_API_TOKEN` を設定してください。

## データ追加

疾患データは `data/diseases.json` に追加します。`lib/types.ts` の `Disease` 型に沿って追加すると、疾患一覧・検索・詳細ページに反映されます。
