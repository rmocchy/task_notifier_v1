import { OpenAPIHono } from "@hono/zod-openapi";

export type SwaggerConfig = {
  version: string;
  title: string;
  description?: string;
  relativeFilePath: string;
}

export type APIGenrateFunc = () => {honoAPI: OpenAPIHono, config: SwaggerConfig};
