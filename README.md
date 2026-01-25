# Syncro

<div align="center">

**日程調整をもっとスマートに、もっとシンプルに**

複数人での日程調整を効率的に行うためのWebアプリケーション

[デモを見る](https://chosei-kun.netlify.app/) | [仕様書](./documents/application-specifications.md) | [UI設計](./documents/ui-design-requirements.md)

</div>

---

## 📖 概要

Syncroは、サークル活動やグループイベントなど、複数人で1〜2ヶ月先までの長期的な日程調整を行う際に最適化されたWebアプリケーションです。

### 🎯 解決する課題

既存の日程調整ツール（調整さん、LINE日程調整、Googleスプレッドシート等）では以下の課題がありました：

- ❌ 「午前中だけ参加できる」といった部分参加の情報をテキストで入力する必要がある
- ❌ モバイルでの操作性が悪い
- ❌ 参加可能な時間帯の情報が散在し、集計が困難

Syncroは、これらの課題を解決し、**時間指定を含む詳細な日程調整**を**直感的に行える**UIを提供します。

## ✨ 主な機能

### 🎪 イベント作成

- ホストユーザーが日程調整イベントを作成
- イベントタイトル、説明、候補日時を設定
- 生成されたURLを共有するだけで参加者を招待

### ⏰ 柔軟な参加可否入力

参加者は以下の4種類で回答可能：

- **◎ (OK)**: 1日参加できる
- **◯ (Partially)**: 特定の時間のみ参加できる（時間帯を指定）
- **△ (未定)**: わからない
- **☓ (NG)**: 参加できない

### 🎯 候補日のサジェスト

- 参加人数の多い日程を自動的に提案
- 参加可能な時間帯を視覚的に表示
- サジェスト結果をテキストでコピー可能

### 📱 モバイルファースト設計

- スマートフォンでの操作性を重視したUI/UX
- レスポンシブデザイン対応

### 📝 過去閲覧イベント表示

- LocalStorageを利用して閲覧履歴を管理
- トップページから過去のイベントに素早くアクセス

## 🚀 技術スタック

### フロントエンド

- **フレームワーク**: React 18.2 + TypeScript 5.2
- **UIライブラリ**: Material-UI (MUI) 5.15
- **ルーティング**: React Router DOM 6.22
- **状態管理**: SWR 2.2
- **日時処理**: Day.js 1.11
- **ビルドツール**: Vite 6.3

### バックエンド

- **サーバーレス**: Netlify Functions
- **データベース**: Supabase (PostgreSQL)
- **API**: Express.js + serverless-http

### デプロイ・インフラ

- **ホスティング**: Netlify
- **データベース**: Supabase

## 🛠️ セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン

```bash
git clone git@github.com:mitchi-0719/chosei-kun.git
cd Syncro
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定

`.env`ファイルを作成し、以下の環境変数を設定：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 開発サーバーの起動

```bash
# フロントエンド開発サーバー
npm run dev

# Netlify Functions（バックエンド）のローカル実行
npm run serve
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 📁 プロジェクト構成

```
Syncro/
├── src/
│   ├── api/              # API呼び出し関数
│   ├── components/       # Reactコンポーネント
│   │   ├── common/       # 共通コンポーネント
│   │   ├── event/        # イベント関連コンポーネント
│   │   ├── eventBoard/   # イベントボード関連
│   │   ├── suggest/      # サジェスト機能
│   │   └── Top/          # トップページ関連
│   ├── feature/          # ビジネスロジック
│   ├── function/         # ユーティリティ関数
│   │   ├── dateTime/     # 日時処理
│   │   └── localStorage/ # LocalStorage操作
│   ├── hooks/            # カスタムフック
│   ├── pages/            # ページコンポーネント
│   ├── provider/         # Contextプロバイダー
│   ├── styles/           # スタイル設定
│   ├── types/            # TypeScript型定義
│   └── util/             # ユーティリティ
├── netlify/
│   └── functions/        # Netlify Functions
│       ├── events/       # イベント関連API
│       ├── schedules/    # スケジュール関連API
│       ├── types/        # 型定義
│       └── util/         # ユーティリティ
├── documents/            # ドキュメント
└── supabase/             # Supabase設定
```

## 🌐 API エンドポイント

### Event API (`/.netlify/functions/events`)

| メソッド | エンドポイント                    | 説明                                       |
| -------- | --------------------------------- | ------------------------------------------ |
| GET      | `/created-events?creatorId[]=xxx` | 作成IDリストをもとにイベント一覧を取得     |
| GET      | `/:eventId`                       | イベントの概要情報を取得                   |
| GET      | `/:eventId/detail`                | イベントの詳細情報（全参加者の回答）を取得 |
| POST     | `/`                               | 新規イベントを作成                         |

### Schedule API (`/.netlify/functions/schedules`)

| メソッド | エンドポイント | 説明                           |
| -------- | -------------- | ------------------------------ |
| POST     | `/`            | スケジュール（参加可否）を登録 |

## 📊 データベース設計

主要テーブル：

- **event**: イベントの基本情報
- **date**: イベントの候補日
- **user**: ユーザー情報
- **schedule**: ユーザーの日程回答
- **schedule_time**: 部分参加の時間帯

詳細は[アプリケーション仕様書](./documents/application-specifications.md)を参照してください。

## 🎨 UI/UXデザイン

デザインファイル: [Figma](https://www.figma.com/file/fV7iiSpsxnIDwUjsJT3v5h/)

詳細な設計は[UI設計要件](./documents/ui-design-requirements.md)を参照してください。

## 🔄 開発フロー

### ブランチ戦略

| ブランチ名  | 用途                            |
| ----------- | ------------------------------- |
| `main`      | 本番環境（Netlify自動デプロイ） |
| `develop`   | 開発統合ブランチ                |
| `feature/*` | 機能開発ブランチ                |

### コミットメッセージ

基本形式: `refs #issue番号 内容`

## 🚧 今後の展開

- [ ] **ログイン機能**: Firebase Authenticationによるユーザー認証
- [ ] **ユーザープロフィール**: 過去の参加履歴、よく使う設定の保存
- [ ] **通知機能**: イベント更新時の通知
- [ ] **CSV出力**: 集計結果のエクスポート機能
- [ ] **カレンダー連携**: GoogleカレンダーやiCalへの連携

## 📚 参考資料

- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [MUI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [SWR Documentation](https://swr.vercel.app/)

---
