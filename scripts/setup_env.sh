#!/bin/bash

# 環境変数ファイルを置いているディレクトリ
ENV_DIR="./env"

# env.*.sample を探す
for sample_file in "$ENV_DIR"/.env.*.sample; do
  # 実ファイルかチェック（存在しないパターンにも対応）
  [ -f "$sample_file" ] || continue

  # 対象のファイル名から `.sample` を除いた出力先を作成
  target_file="${sample_file%.sample}"

  # すでに存在していればスキップ
  if [ -f "$target_file" ]; then
    echo "✅ $target_file は既に存在します。スキップします。"
  else
    cp "$sample_file" "$target_file"
    echo "📝 $target_file を作成しました（元: $(basename "$sample_file")）"
  fi
done
