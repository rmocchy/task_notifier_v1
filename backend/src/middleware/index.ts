import { Hono } from "hono";
import { logger } from "hono/logger";
import timeoutMiddleware from "./timeout";

const registerMiddleware = (app: Hono) => {
    // 詳細な標準ロガー設定
    app.use("*", logger());
    
    // HTTPリクエスト/レスポンスの詳細をログ出力するミドルウェア
    app.use("*", async (c, next) => {
        const start = Date.now();
        const method = c.req.method;
        const path = c.req.path;
        
        console.log(`[${new Date().toISOString()}] Request: ${method} ${path}`);
        
        await next();
        
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] Response: ${method} ${path} - ${c.res.status} (${duration}ms)`);
    });
    
    app.use("*", timeoutMiddleware(5000));
    return app; // アプリケーションインスタンスを返す
}

export default registerMiddleware;