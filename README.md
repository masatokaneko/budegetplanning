# 費用予算策定・実績把握システム

## 概要
このシステムは、企業の費用予算の策定から実績の把握、分析までを一貫して管理するためのWebアプリケーションです。

## 主な機能
- 予算策定
- 実績データ管理
- 予実対比分析
- マスタ管理
- レポート出力

## 技術スタック
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## セットアップ手順
1. リポジトリのクローン
```bash
git clone [repository-url]
cd budget-management-system
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. データベースのセットアップ
```bash
npm run db:migrate
```

5. 開発サーバーの起動
```bash
npm run dev
```

## 開発ガイドライン
- コンポーネントは`src/components`に配置
- ページは`src/app`に配置
- 型定義は`src/types`に配置
- ビジネスロジックは`src/services`に配置

## テスト
```bash
npm run test
```

## ビルド
```bash
npm run build
```

## ライセンス
MIT
