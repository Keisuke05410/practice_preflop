# Preflop Practice

ポーカーのプリフロップ表を暗記するための練習アプリ。

## 技術スタック

- React 19 + Vite
- Tailwind CSS v4
- shadcn/ui (Button, Switch, Popover)
- lucide-react (アイコン)

## プロジェクト構成

```
src/
├── main.jsx              # エントリポイント
├── index.css             # Tailwind CSS + テーマ変数 + アニメーション
├── App.jsx               # メインコンポーネント（状態管理、キーボード操作）
├── components/
│   ├── Card.jsx          # 個別カード表示
│   ├── CardPair.jsx      # カードペア（2枚同期アニメーション）
│   └── ui/               # shadcn/ui
│       ├── button.jsx
│       ├── popover.jsx
│       └── switch.jsx
├── lib/
│   └── utils.js          # cn関数
└── utils/
    └── cards.js          # デッキ生成、シャッフル、ポジション定義
```

## 主要機能

| 機能 | 説明 |
|------|------|
| カード表示 | 52枚デッキからランダムに2枚抽出 |
| ポジション | UTG, HJ, CO, BTN, SB, BB からランダム選択 |
| 操作 | 「次のハンド」ボタン or スペースキー |
| 設定 | 歯車アイコンからPopoverで開く |

### 設定項目
- アニメーション: スケール / スライド / フェード / 回転
- ポジション表示: ON/OFF
- ダークモード: ON/OFF

## 開発コマンド

```bash
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run preview  # ビルドプレビュー
```

## 開発ルール

1. **デザイン変更時**: skillsを確認すること
2. **実装完了後**: ブラウザで動作確認してから終了
3. **コミット前**: CLAUDE.mdを最新に更新
4. **Sub agent**: 積極的に使い、適切に仕事を振る

### Plan mode ワークフロー

実装タスクでは以下の手順を踏む：

1. **複数案の検討**: Plan subagentを並列で立てて異なるアプローチを出す
2. **最善案の選定**: 各agentの提案を比較検討
3. **ユーザー承認**: 選定した案を提示し、承認を得てから実装
