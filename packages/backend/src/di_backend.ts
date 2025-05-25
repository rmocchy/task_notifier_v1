import "reflect-metadata";
import { container } from "tsyringe";
import { DatabaseClient, DatabaseConfig } from "./infra/db/types";
import { PostgresClient } from "./infra/db/PostgresClient";

// DIコンテナの初期化
function InitBackendDI(dbConfig: DatabaseConfig) {
  // データベースの設定を登録
  container.register("DatabaseConfig", {
    useValue: dbConfig,
  });

  // データベースクライアントを登録
  container.register<DatabaseClient>("DatabaseClient", {
    useClass: PostgresClient,
  });
}

export default InitBackendDI;
