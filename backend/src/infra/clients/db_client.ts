import { injectable, inject, Container } from "inversify";
import { Pool } from "pg";
import {DBConfigToken, Config} from "../../../configs/database";

export interface IDBClient {
  getPool(): Pool;
  isHealthy(): Promise<boolean>;
  disconnect(): Promise<void>;
}
export const DBClientToken = Symbol("DBClientToken");
export const registerDBClient = (container: Container) => {
  container.bind<IDBClient>(DBClientToken).to(DBClient).inSingletonScope();
};


@injectable()
class DBClient {
  private pool: Pool;

  constructor(@inject(DBConfigToken) config: Config) {
    this.pool = new Pool({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
      ssl: config.ssl ? { rejectUnauthorized: true } : false,
    });
  }

  // getPool: RepositoryやUseCaseがDB操作に使うためにPoolを提供
  getPool(): Pool {
    return this.pool;
  }

  // 接続確認用
  async isHealthy(): Promise<boolean> {
    try {
      const result = await this.pool.query("SELECT 1");
      return result.rowCount === 1;
    } catch (error) {
      console.error("Database health check failed:", error);
      return false;
    }
  }

  // 明示的に全接続を終了（シャットダウン時など）
  async disconnect(): Promise<void> {
    await this.pool.end();
  }
}
