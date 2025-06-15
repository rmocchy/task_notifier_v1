#!/bin/bash

if [ $# -lt 2 ]; then
  echo "Usage: $0 <input_openapi_file> <output_directory>"
  echo "Example: $0 openapi.yaml ./generated"
  exit 1
fi

# すでに出力ディレクトリが存在する場合は削除
rm -rf "$2"

# dockerで生成させる
# local版だとjavaを入れないんといけないので
docker run --rm -v "$(pwd)":/local openapitools/openapi-generator-cli generate \
    -i /local/$1 \
    -g typescript-axios \
    -o /local/$2