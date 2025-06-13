import { createRoute } from "@hono/zod-openapi";
import {
  HealthCheckRequestSchema,
  HealthCheckResponseSchema,
  IntegratedHealthCheckRequestSchema,
  IntegratedHealthCheckResponseSchema,
} from "./schemas";
import { healthCheckHandler, healthCheckIntegrateHandler } from "./handlers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { APIGenerateFunc, SwaggerConfig } from "../types";

const getHealthServiceAPI :APIGenerateFunc = () => {
  const api = new OpenAPIHono();

  api.openapi(healthRoute, healthCheckHandler);
  api.openapi(healthIntegrateRoute, healthCheckIntegrateHandler);

  return  { honoAPI: api, config};
};

export default getHealthServiceAPI;

const config : SwaggerConfig = {
  version: "1.0.0",
  title: "health",
  relativeFilePath: "health.json",
};

// 基本的なヘルスチェックエンドポイント
const healthRoute = createRoute({
  method: "get",
  path: "/health",
  operationId: "healthCheck",
  request: {
    query: HealthCheckRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HealthCheckResponseSchema,
        },
      },
      description: "Basic health check status",
    },
  },
});

// 統合ヘルスチェックエンドポイント（DBを含む）
const healthIntegrateRoute = createRoute({
  method: "get",
  path: "/health_integrate",
  operationId: "integratedHealthCheck",
  request: {
    query: IntegratedHealthCheckRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: IntegratedHealthCheckResponseSchema,
        },
      },
      description: "Integrated health check status including database",
    },
  },
});
