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

# フロントエンドのソースコードをコピー
COPY frontend ./frontend

# フロントエンドのpackage.jsonをコピー
COPY frontend/package.json ./frontend/

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール（package.jsonに記載された依存関係をすべてインストール）
RUN pnpm install --frozen-lockfile

# バイナリへのパスを追加
ENV PATH="/app/node_modules/.bin:/app/frontend/node_modules/.bin:${PATH}"

# 開発サーバーのポートを公開
EXPOSE 5173

# 開発サーバーを起動
CMD ["make", "start_frontend"]
