import { Hono, Context } from "hono";
import { HealthCheckUseCase } from "../src/usecase/healthCheck";
import { container } from "tsyringe";
import { logger } from "hono/logger";
import { UserUseCase } from "../src/usecase/user_usecase";
import { SSOLoginUseCase } from "../src/usecase/sso_login_usecase";
import timeoutMiddleware from "../src/middleware/timeout";
import { ErrorCode } from "../domain/errors";

const NewApp = () => {
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

  // SSO Login
  app.get("/auth/google/url", async (c: Context) => {
    const ssoLoginUseCase = container.resolve(SSOLoginUseCase);
    const authUrl = await ssoLoginUseCase.generateAuthUrl();
    return c.json(authUrl);
  });

  // コードからトークンを取得
  app.post("/auth/google/token", async (c: Context) => {
    try {
      const body = await c.req.json();
      const code = body.code;
      if (!code || typeof code !== 'string') {
        return c.json({ error: "Authorization code is required" }, 400);
      }

      const ssoLoginUseCase = container.resolve(SSOLoginUseCase);
      const tokens = await ssoLoginUseCase.exchangeCodeForToken(code);
      return c.json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        const status = error.name === ErrorCode.UNAUTHORIZED ? 401 : 500;
        return c.json({ error: error.message }, status);
      }
      return c.json({ error: "Internal server error" }, 500);
    }
  });

  return app;
};

export default NewApp;
