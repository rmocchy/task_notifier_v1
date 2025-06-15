# Node.jsの公式イメージをベースとして使用
FROM node:20-alpine

# 必要なパッケージをインストール
RUN apk add --no-cache make

# 作業ディレクトリを設定
WORKDIR /app

# プロジェクトルートのファイルをコピー
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY Makefile ./

# バックエンドのpackage.jsonをコピー
COPY backend/package.json ./backend/

# バックエンドのソースコードをコピー
COPY backend ./backend

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm i --frozen-lockfile

ENV PATH="/app/node_modules/.bin:/app/backend/node_modules/.bin:${PATH}"

# バックエンドのポートを公開
EXPOSE 8787

# 開発サーバーを起動
CMD ["make", "start_backend"] 