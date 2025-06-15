#!/bin/bash

# エラー発生時にスクリプトを即終了させる
set -euo pipefail

# このスクリプトは、Atlasマイグレーションの準備を行う
# atlasでは反映用のDBと差分検知用の一時DBが必要だが、atlas自身がこれを作成することはない
# よってこのスクリプトによって、反映用のDBと差分検知用の一時DBを作成する
# 反映用DBは存在しない場合のみ作成し、差分検知用の一時DBは常に削除してから作成することで空の状態にする
# 引数
# 1. マイグレーション対象のDB接続URL
# 2. マイグレーション対象のDB名

if [ $# -lt 2 ]; then
  echo "Usage: $0 <DB_URL> <DB_NAME>"
  echo "Example: $0 postgres://user:password@host:5432 be_local"
  exit 1
fi

MIG_DB_URL="$1"
MIG_DB_NAME="$2"
ADMIN_DB="main"
TMP_DB="tmp"

echo "🔧 Preparing for Atlas migration..."

# マイグレーション対象DBの存在チェックと作成（存在しない場合のみ）
echo "Checking if database '${MIG_DB_NAME}' exists..."
if psql "${MIG_DB_URL}/${ADMIN_DB}" -tc "SELECT 1 FROM pg_database WHERE datname='${MIG_DB_NAME}'" | grep -q 1; then
  echo "✅ Database '${MIG_DB_NAME}' already exists. Skipping creation."
else
  echo "📦 Database '${MIG_DB_NAME}' does not exist. Creating..."
  psql "${MIG_DB_URL}/${ADMIN_DB}" -c "CREATE DATABASE \"${MIG_DB_NAME}\""
fi

# 差分検知用の一時DBを強制再作成
echo "♻️  Recreating temporary database '${TMP_DB}'..."
psql "${MIG_DB_URL}/${ADMIN_DB}" <<EOF
DROP DATABASE IF EXISTS "${TMP_DB}";
CREATE DATABASE "${TMP_DB}";
EOF

echo "✅ Database preparation completed."
echo ""
echo "🧪 You can now run Atlas using Docker:"
echo ""
echo "  docker run --rm -v \$(pwd):/atlas -w /atlas arigaio/atlas schema apply \\"
echo "    --url '${MIG_DB_URL}/${MIG_DB_NAME}?sslmode=disable' \\"
echo "    --dev-url '${MIG_DB_URL}/${TMP_DB}?sslmode=disable' \\"
echo "    --to 'file://<your-schema-file>.sql' --auto-approve"
echo ""
