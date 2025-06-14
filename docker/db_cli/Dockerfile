FROM debian:bullseye-slim

# 環境を非対話モードに設定（APTでのプロンプト回避）
ENV DEBIAN_FRONTEND=noninteractive

# postgresql-client のみを最小限でインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ（任意）
WORKDIR /app

# デフォルトでシェルを起動
CMD ["bash"]
