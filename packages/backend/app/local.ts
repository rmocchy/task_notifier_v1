import { Hono, Env } from "hono";
import { HealthCheckUseCase } from "../src/usecase/healthCheck";
import { container } from "tsyringe";
import { logger } from "hono/logger";
import { UserUseCase } from "../src/usecase/user_usecase";
import timeoutMiddleware from "../src/middleware/timeout";

const NewApp = (): Hono<Env, {}, "/"> => {
  const app = new Hono();

  app.use("*", logger());
  app.use("*", timeoutMiddleware(5000)); // タイムアウトミドルウェアを追加

  // 基本的なサーバー疎通確認エンドポイント
  app.get("/health", (c) => {
    return c.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
  });

  // 統合ヘルスチェックエンドポイント（DBを含む）
  app.get("/health_integrate", async (c) => {
    const healthCheckUseCase = container.resolve(HealthCheckUseCase);
    const health = await healthCheckUseCase.execute();
    return c.json(health, health.status === "healthy" ? 200 : 503);
  });

  // users
  app.get("/users/count", async (c) => {
    const userUseCase = container.resolve(UserUseCase);
    const now: Date = new Date()
    const cnt = await userUseCase.countUsersByCreatedAt(now);
    return c.json(cnt);
  });

  return app;
};

export default NewApp;
