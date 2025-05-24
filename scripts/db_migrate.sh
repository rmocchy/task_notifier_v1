#!/bin/bash
if [ $# -lt 3 ]; then
  echo "Usage: $0 <DB_URL> <DB_NAME> <SCHEMA_SQL_PATH>"
  echo "Example: $0 postgres://user:password@host:5432 be_local db_schema/tmp/backend.sql"
  exit 1
fi

MIG_DB_URL="$1"
MIG_DB_NAME="$2"
MIG_SCHEMA_SQL_PATH="$3"
ADMIN_DB="main"
TMP_DB="tmp"

echo "Migrating database: ${MIG_DB_NAME}"

# admin DB に接続して対象DBの存在をチェック
if psql "${MIG_DB_URL}/${ADMIN_DB}" -tc "SELECT 1 FROM pg_database WHERE datname='${MIG_DB_NAME}'" | grep -q 1; then
  echo "Database ${MIG_DB_NAME} already exists."
else
  echo "Creating database ${MIG_DB_NAME}..."
  psql "${MIG_DB_URL}/${ADMIN_DB}" -c "CREATE DATABASE ${MIG_DB_NAME}"
fi

# admin DB に接続して対象DBの存在をチェック
psql "${DB_URL}/${ADMIN_DB}" <<EOF
DROP DATABASE IF EXISTS "${TMP_DB}";
CREATE DATABASE "${TMP_DB}";
EOF

# Atlasマイグレーション実行
echo "Applying migrations via Atlas..."
atlas schema apply \
    --url "${MIG_DB_URL}/${MIG_DB_NAME}?sslmode=disable" \
    --to "file://${MIG_SCHEMA_SQL_PATH}" \
    --dev-url "${MIG_DB_URL}/${TMP_DB}?sslmode=disable"

echo "Migration completed."

