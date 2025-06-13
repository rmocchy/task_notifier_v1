import { OpenAPIHono } from "@hono/zod-openapi";

export type SwaggerConfig = {
  version: string;
  title: string;
  description?: string;
  relativeFilePath: string;
}

export type APIGenerateFunc = () => {honoAPI: OpenAPIHono, config: SwaggerConfig};
