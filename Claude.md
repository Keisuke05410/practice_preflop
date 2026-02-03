# Preflop Practice

ポーカーのプリフロップ表を暗記するための練習アプリ。

## 技術スタック

- React 19
- Vite
- Tailwind CSS v4
- shadcn/ui (Button, Switch)

## プロジェクト構成

```
src/
├── main.jsx              # エントリポイント
├── index.css             # Tailwind CSS + shadcn/ui テーマ変数 + カードアニメーション
├── App.jsx               # メインコンポーネント（状態管理、キーボード操作）
├── components/
│   ├── Card.jsx          # カード表示コンポーネント（3Dフリップ対応）
│   └── ui/               # shadcn/uiコンポーネント
│       ├── button.jsx
│       └── switch.jsx
├── lib/
│   └── utils.js          # shadcn/ui ユーティリティ (cn関数)
└── utils/
    └── cards.js          # カードデッキ生成、シャッフル、ポジション定義
```

## 主要機能

- **カード表示**: 52枚デッキからランダムに2枚を抽出
- **ポジション**: UTG, HJ, CO, BTN, SB, BB からランダム選択
- **操作**: 「次のハンド」ボタン または スペースキー
- **トグル**: ポジション表示のON/OFF切り替え
- **3Dフリップ**: カード切り替え時のアニメーション

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run preview  # ビルドプレビュー
```

## デザイン

- shadcn/uiベースのシンプルでモダンなUI
- ライト/ダークモード対応（システム設定に従う）
- レスポンシブ対応（モバイル/デスクトップ）

## 開発ルール

- デザインを変更するときは skills を確認すること
- 変更後は自分で確認してから終了すること
- commitする前に、Claude.mdを最新に更新すること
- sub agent を積極的に使い、適切に仕事を振ること
