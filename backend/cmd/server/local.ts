import "reflect-metadata"
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {initializeContainer} from "../../di/main"
import getLocalWire from "../../di/local";
import { registerRoutesForServer } from "../../gateway/apis";
import registerMiddleware from "../../src/middleware";

const main = async () => {
  const port = 8787;
  
  // DI
  initializeContainer(getLocalWire());

  // app
  const app = new Hono();
  registerMiddleware(app);
  registerRoutesForServer(app);

  console.log(`Server is starting on port ${port}...`);

  try {
    await serve({
      fetch: app.fetch,
      port,
    });

    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

main();
