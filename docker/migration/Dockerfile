FROM debian:bullseye

# 必要なツールをインストール
RUN apt-get update && apt-get install -y \
    postgresql-client \
    make \
    curl \
    unzip \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root
# Atlas CLI をインストール
RUN curl -sSf https://atlasgo.sh | sh

# PATHにatlasを追加（~/.atlas/bin）
ENV PATH="/root/.atlas/bin:${PATH}"

# 作業ディレクトリ
WORKDIR /app

# デフォルトのコマンド（シェル起動）
CMD ["bash"]
