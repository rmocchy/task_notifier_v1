## 動作確認用
## start_* は指定のサービスをローカル起動する
## start_*_docker は指定のサービスをDockerコンテナで起動する
.PHONY: start_frontend
start_frontend:
	pnpm frontend build && pnpm frontend start

.PHONY: start_backend
start_backend:
	pnpm backend build && pnpm backend start

.PHONY: start_backend-dev
start_backend-dev:
	pnpm backend dev

## 開発用
.PHONY: setup_env
setup_env:
	scripts/setup_env.sh

# migrate_backend_v2 はマイグレーションを行う
# 以下の環境変数が必要
# - DB_URL: データベースのURL
# - DB_NAME: データベース名
.PHONY: migrate_backend_v2
migrate_backend_v2:
	make db_schema_build_backend && \
	make db_prepare_atlas_migrate && \
	make db_migrate_backend

.PHONY: sync_api_schema
sync_api_schema:
	pnpm -F backend generate:openapi &&\
	pnpm -F frontend gen:api-all

.PHONY: gen_db_method_backend
gen_db_method_backend:
	pnpm -F backend pgtyped
	
## サブコマンド
## よく使うコマンドは基本的にはdockerコンテナで実行するが、その実態処理はいかに記載する
.PHONY: db_schema_build_backend
db_schema_build_backend:
	sh scripts/db_schema_build.sh backend/db_schema tmp/db/backend.sql

.PHONY: db_prepare_atlas_migrate
db_prepare_atlas_migrate:
	docker build -t db_cli -f docker/db_cli/Dockerfile . && \
	docker run --rm \
		--network task_notifier_v1_default \
		-v $(PWD):/app \
		-e DB_URL=$(DB_URL) \
		-e DB_NAME=$(DB_NAME) \
		db_cli \
		bash scripts/db_prepare_migrate.sh "$$DB_URL" "$$DB_NAME"

.PHONY: db_migrate_backend
db_migrate_backend:
	docker run --rm \
		-v $(PWD):/app \
		arigaio/atlas schema apply \
		--url "$$DB_URL/$$DB_NAME?sslmode=disable" \
		--to "file://app/tmp/db/backend.sql" \
		--dev-url "$$DB_URL/tmp?sslmode=disable" \
		--auto-approve
