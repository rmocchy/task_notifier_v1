import { createRoute } from "@hono/zod-openapi";
import { UserCountResponseSchema } from "./schemas";
import { z } from "zod";
import { OpenAPIHono } from "@hono/zod-openapi";
import { APIGenerateFunc, SwaggerConfig } from "../types";
import { userCountHandler } from "./handlers";

const getUserServiceAPI: APIGenerateFunc = () => {
  const api = new OpenAPIHono();

  api.openapi(userCountRoute, userCountHandler);

  return { honoAPI: api, config };
};

export default getUserServiceAPI;

const config: SwaggerConfig = {
  version: "1.0.0",
  title: "user",
  relativeFilePath: "user.json",
};

// ユーザー数カウントエンドポイント
const userCountRoute = createRoute({
  method: "get",
  path: "/users/count",
  operationId: "userCount",
  request: {
    query: z.object({}),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserCountResponseSchema,
        },
      },
      description: "ユーザー数を取得",
    },
  },
});