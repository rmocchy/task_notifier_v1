import { createRoute } from "@hono/zod-openapi";
import {
  GoogleAuthUriRequestSchema,
  GoogleAuthUriResponseSchema,
  TokenExchangeRequestSchema,
  TokenExchangeResponseSchema
} from "./schemas";
import { googleAuthUriHandler, tokenExchangeHandler } from "./handlers";
import { OpenAPIHono } from "@hono/zod-openapi";
import { APIGenrateFunc, SwaggerConfig } from "../types";

const getSsoAuthServiceAPI: APIGenrateFunc = () => {
  const api = new OpenAPIHono();

  api.openapi(googleAuthUrlRoute, googleAuthUriHandler);
  api.openapi(googleTokenRoute, tokenExchangeHandler);

  return { honoAPI: api, config};
};

const config : SwaggerConfig = {
  version: "1.0.0",
  title: "sso-auth",
  relativeFilePath: "sso-auth.json",
};

// Google認証URL生成エンドポイント
const googleAuthUrlRoute = createRoute({
  method: "get",
  path: "/auth/google/url",
  operationId: "googleAuthUri",
  request: {
    query: GoogleAuthUriRequestSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: GoogleAuthUriResponseSchema,
        },
      },
      description: "認証URLを取得",
    },
  },
});

// コードからトークンを取得するエンドポイント
const googleTokenRoute = createRoute({
  method: "post",
  path: "/auth/google/token",
  operationId: "tokenExchange",
  request: {
    body: {
      content: {
        "application/json": {
          schema: TokenExchangeRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TokenExchangeResponseSchema,
        },
      },
      description: "認証コードからトークンを取得",
    },
  },
});

export default getSsoAuthServiceAPI;