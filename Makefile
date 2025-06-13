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
## migrate_* は指定のサービスのマイグレーションを実行する
## migrate_*-docker は指定のサービスのマイグレーションをDockerコンテナで実行する
.PHONY: setup_env
setup_env:
	scripts/setup_env.sh

.PHONY: migrate_be_local-docker
migrate_be_local-docker:
	docker build -t migrate-local -f docker/migration/Dockerfile . && \
	docker run --rm -v $(PWD):/app migrate-local make migrate_be_local -e DB_URL=${DB_URL_DOCKER} DB_USER=${DB_USER} DB_PASSWORD=${DB_PASS}

.PHONY: sync_schema
sync_api_schema:
	pnpm -F backend generate:openapi &&\
	pnpm -F frontend gen:api-all
	
## サブコマンド
## よく使うコマンドは基本的にはdockerコンテナで実行するが、その実態処理はいかに記載する
.PHONY: migrate_be_local
migrate_be_local:
	echo "Migrating local database be_local..." && \
	sh scripts/db_schema_build.sh db_schema/db_backend db_schema/tmp/backend.sql && \
	sh scripts/db_migrate.sh ${DB_URL} be_local db_schema/tmp/backend.sql
