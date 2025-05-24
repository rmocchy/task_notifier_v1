#!/bin/bash

# 引数チェック
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <source_dir> <output_file.sql> <database_name>"
  echo "Example: $0 migrations local_schema.sql app_db"
  exit 1
fi

SRC_DIR=$1
OUTPUT_FILE=$2

# 出力ファイル初期化
echo "" > "$OUTPUT_FILE"

# 指定ディレクトリ内の全SQLファイルを数字順に結合
for FILE in $(find "$SRC_DIR" -maxdepth 1 -type f -name "*.sql" | sort); do
  echo "Appending $FILE"
  cat "$FILE" >> "$OUTPUT_FILE"
  echo "\n" >> "$OUTPUT_FILE"
done

echo "Generated $OUTPUT_FILE"
