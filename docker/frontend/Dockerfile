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

# commonパッケージをコピー
COPY packages/common ./packages/common

# フロントエンドのpackage.jsonをコピー
COPY packages/frontend/package.json ./packages/frontend/

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm install

# フロントエンドのソースコードをコピー
COPY packages/frontend ./packages/frontend

# 作業ディレクトリをフロントエンドに移動
WORKDIR /app

# 開発サーバーのポートを公開
EXPOSE 5173

# 開発サーバーを起動
CMD ["make", "start_frontend"]
