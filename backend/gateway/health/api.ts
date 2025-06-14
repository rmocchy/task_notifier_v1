import { createRoute } from "@hono/zod-openapi";
import {
  HealthCheckRequestSchema,
  HealthCheckResponseSchema,
} from "./schemas";
import { healthCheckHandler } from "./handlers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { APIGenerateFunc, SwaggerConfig } from "../types";
import { ErrResponses } from "../common/error";

const getHealthServiceAPI :APIGenerateFunc = () => {
  const api = new OpenAPIHono();

  api.openapi(healthRoute, healthCheckHandler);

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
    ...ErrResponses,
  },
});
